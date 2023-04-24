from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

import random

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

import os
import stripe

from patients.models import PatientModel
from .models import LabModel, LabProfileModel, LabVerificationModel, PackageModel, AppointmentModel

from core.emails import sendOTP


class EmailView(APIView):

    def post(self, request):
        email = request.data.get("email")
        otp = random.randint(1000, 9999)
        password_ = str(otp)
        isRegistered = User.objects.filter(email=email)
        print(isRegistered)
        if not isRegistered:
            user = User.objects.create_user(username=email, email=email, password=password_)
            auth = authenticate(username=email, password=password_)
            print("auth", auth)
            user.save()
            lab = LabModel.objects.create(user=user)
            LabProfileModel.objects.create(lab=lab)
        else:
            user = isRegistered[0]
            print("updating password", user)
            user.set_password(password_)
            user.save()
        print("otp", password_)
        # sendOTP(email, otp)
        response = {
            "message": "OTP Sent Successfully",

        }
        return Response(response, status=status.HTTP_200_OK)


class VerifyEmailView(APIView):

    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")
        user = User.objects.get(email=email)
        print(user)
        lab = LabModel.objects.get(user=user)
        try:
            lab_verificaion = LabVerificationModel.objects.get(lab=lab)
            hasReq = lab_verificaion.id
        except:
            hasReq = 0
        user_ = authenticate(request, username=email, password=str(otp))
        if not user_:
            response = {
                "message": "Incorrect OTP"
            }
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)

        old_token = Token.objects.filter(user=user)

        if not old_token:
            token = Token.objects.create(user=user)
        else:
            old_token.delete()
            token = Token.objects.create(user=user)

        response = {
            "email": email,
            "token": token.key,
            "verified": lab.verified,
            "hasReq": hasReq
        }
        return Response(response, status=status.HTTP_200_OK)


class LabProfileView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):

        # verify if user is legit

        try:
            user = request.user
            print(user)
            lab = LabModel.objects.get(user=user)
        except:
            return Response("Lab Not Found", status=status.HTTP_404_NOT_FOUND)
        # if(Lab.token != token):
        #     return Response("Invalid Lab Token", status=status.HTTP_404_NOT_FOUND)

        profile = LabProfileModel.objects.get(lab=lab)
        if request.data.get("name") is not None:
            name = request.data.get("name")
            profile.name = name
        if request.data.get("description") is not None:
            description = request.data.get("description")
            profile.description = description
        if request.data.get("reg_no") is not None:
            reg_no = request.data.get("reg_no")
            profile.reg_no = reg_no
        if request.data.get("city") is not None:
            city = request.data.get("city")
            profile.city = city
        if request.data.get("state") is not None:
            state = request.data.get("state")
            profile.state = state
        if request.data.get("files") is not None:
            files = request.data.get("files")
            profile.files = files
        if request.data.get("phone") is not None:
            phone = request.data.get("phone")
            profile.phone = phone
        if request.data.get("address") is not None:
            address = request.data.get("address")
            profile.address = address
        if request.data.get("pincode") is not None:
            pincode = request.data.get("pincode")
            profile.pincode = pincode
        profile.save()
        try:
            isCreated = LabVerificationModel.objects.get(lab=lab)
        except:
            request_verification = LabVerificationModel.objects.create(lab=lab)
        return Response("Created Profile", status=status.HTTP_201_CREATED)

    def get(self, request):
        # verify if user is legit
        try:
            user = request.user
            lab = LabModel.objects.get(user=user)
            lab_profile = LabModel.objects.get(lab=lab)
        except:
            return Response("Lab Not Found", status=status.HTTP_404_NOT_FOUND)

        response = {
            'name': lab_profile.name,
            'description': lab_profile.description,
            'city': lab_profile.city,
            'reg_no': lab_profile.reg_no,
            'state': lab_profile.state,
            'files': lab_profile.files,
            'phone': lab_profile.phone,
            'address': lab_profile.address,
            'pincode': lab_profile.pincode,
        }
        # TODO SERIALIZED OUTPUT
        return Response(response, status=status.HTTP_200_OK)

    def get(self, request):
        # verify if user is legit
        try:
            user = request.user
            lab = LabModel.objects.get(user=user)
            lab_profile = LabProfileModel.objects.get(lab=lab)
        except:
            return Response("Loctor Not Found", status=status.HTTP_404_NOT_FOUND)

        response = {
            'name': lab_profile.name,
            'description': lab_profile.description,
            'city': lab_profile.city,
            'reg_no': lab_profile.reg_no,
            'state': lab_profile.state,
            'files': lab_profile.files,
            'phone': lab_profile.phone,
            'address': lab_profile.address,
            'pincode': lab_profile.pincode,
        }
        # TODO SERIALIZED OUTPUT
        return Response(response, status=status.HTTP_200_OK)


class LabRequestVerificationView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # verify if user is legit
        try:
            user = request.user
            lab = LabModel.objects.get(user=user)
        except:
            return Response("Lab Not Found", status=status.HTTP_404_NOT_FOUND)

        # check if already requested
        try:
            LabVerificationModel.objects.get(lab=lab)
            return Response("Already requested", status=status.HTTP_400_BAD_REQUEST)
        except:
            pass

        # create request for verification
        request_verification = LabVerificationModel.objects.create(lab=lab, status="PENDING")

        return Response("Requested for Verification", status=status.HTTP_200_OK)

    def get(self, request):
        # lab will see the remarks of verification.

        # verify if user is legit
        try:
            user = request.user
            lab = LabModel.objects.get(user=user)
        except:
            return Response("Lab Not Found", status=status.HTTP_404_NOT_FOUND)

        # check if already requested
        try:
            request_verification = LabVerificationModel.objects.get(lab=lab)
        except:
            return Response("No Request", status=status.HTTP_400_BAD_REQUEST)
        status_ = request_verification.status
        remarks = request_verification.remarks

        response = {
            "remarks": remarks,
            "status": status_
        }

        return Response(response, status=status.HTTP_200_OK)


class PackageView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        lab = LabModel.objects.get(user=user)
        name = request.data.get("name")
        description = request.data.get("description")
        price = request.data.get("price")
        no_tests = request.data.get("no_tests")
        package = PackageModel.objects.create(lab=lab, name=name, description=description, price=price,
                                              no_tests=no_tests)
        return Response(package.id, status=status.HTTP_201_CREATED)

    def get(self, request):
        user = request.user
        lab = LabModel.objects.get(user=user)
        packages = PackageModel.objects.filter(lab=lab)
        response = []
        for package in packages:
            res = {
                "name": package.name,
                "description": package.description,
                "price": package.price,
                "no_tests": package.no_tests
            }
            response.append(res)
        return Response(response, status=status.HTTP_200_OK)


class LabsView(APIView):

    def get(self, request):
        labs = LabModel.objects.all()
        response = []
        for lab in labs:
            lab_profile = LabProfileModel.objects.get(lab=lab)
            res = {
                "id": lab.id,
                "name":lab_profile.name,
                "description": lab_profile.description,
                "city": lab_profile.city
            }
            response.append(res)
        return Response(response, status=status.HTTP_200_OK)

class LabsPackageView(APIView):

    def get(self, request):
        labid = request.GET["labid"]
        print(labid)
        lab = LabModel.objects.get(id=labid)
        packages = PackageModel.objects.filter(lab=lab)
        response = []
        for package in packages:
            res = {
                "id": package.id,
                "name":package.name,
                "description":package.description,
                "price":package.price,
                "no_tests":package.no_tests
            }
            response.append(res)
        return Response(response, status=status.HTTP_200_OK)

class LabPaymentView(APIView):

    def post(self, request):
        try:
            amount = request.data.get("amount")
            print(amount)
            # Create a PaymentIntent with the order amount and currency
            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency='inr',
                automatic_payment_methods={
                    'enabled': True,
                },
            )
            print("payment completed", intent)
            return Response({
                'clientSecret': intent['client_secret']
            })
        except Exception as e:
            return Response("error")

class LabConfirmPaymentView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    #for patient
    def post(self,request):
        user = request.user
        patient = PatientModel.objects.get(user=user)
        package_id = request.data.get("package_id")
        package = PackageModel.objects.get(id=package_id)
        stripe_id = request.data.get("stripe_id")
        if(not AppointmentModel.objects.filter(stripe_id=stripe_id).exists()):
            appointment = AppointmentModel.objects.create(stripe_id=stripe_id, patient=patient, package=package,payment_completed=True)
            return Response(appointment.id, status=status.HTTP_200_OK)
        return Response("NOT OK", status=status.HTTP_404_NOT_FOUND)

class LabAppointmentsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        lab = LabModel.objects.get(user=user)
        appointments = AppointmentModel.objects.filter(package__lab=lab)
        response = []
        for appointment in appointments:
            res = {
                "id": appointment.id,
                "package_id": appointment.package.id,
                "package_name": appointment.package.name,
                "patient_email": appointment.patient.user.email,
                "date": "25-04-2023",
            }
            response.append(res)
        return Response(response, status=status.HTTP_200_OK)

class LabDashPayments(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        consultation = AppointmentModel.objects.filter(package__lab__user=user, completed=True)
        response = []
        for con in consultation:
            res = {
                "appointment_id": con.id,
                "date": "23-05-2023",
                "package_id": con.package.id,
                "fees": con.package.price,
            }
            response.append(res)
        return Response(response, status=status.HTTP_200_OK)

class AppointmentView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request):
        appointment_id = request.GET["appointment_id"]
        appointment = AppointmentModel.objects.get(id=appointment_id)
        res = {
            "id": appointment.id,
            "package_id": appointment.package.id,
            "package_name": appointment.package.name,
            "patient_email": appointment.patient.user.email,
            "report": appointment.report,
            "status": appointment.status,
            "date": "25-04-2023",
        }
        return Response(res, status=status.HTTP_200_OK)

    def patch(self, request):
        appointment_id = request.data.get("appointment_id")
        report = request.data.get("report")
        status_ = request.data.get("status")
        print(report, status_)
        appointment = AppointmentModel.objects.get(id=appointment_id)
        appointment.report = report
        appointment.status = status_
        appointment.save()
        return Response("ok", status=status.HTTP_202_ACCEPTED)
