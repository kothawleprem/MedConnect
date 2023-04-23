from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

import random

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import LabModel, LabProfileModel, LabVerificationModel, PackageModel

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

