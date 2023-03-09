from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

import random
from cryptography.fernet import Fernet

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


from .models import DoctorModel, DoctorProfileModel, DoctorVerificationModel

from core.emails import sendOTP


class EmailView(APIView):

    def post(self, request):
        email = request.data.get("email")
        otp = random.randint(1000, 9999)
        password_ = str(otp)
        isRegistered = User.objects.filter(email=email)
        print(isRegistered)
        if not isRegistered:
            user = User.objects.create_user(username=email, email=email, password=otp)
            auth = authenticate(username=email, password=otp)
            print("auth",auth)
            user.save()
            doctor = DoctorModel.objects.create(user=user)
            DoctorProfileModel.objects.create(doctor=doctor)
        else:
            user = isRegistered[0]
            print("updating password", user)
            user.set_password(password_)
            user.save()
        print("otp", password_)
        # sendOTP(email,otp)
        response = {
            "message": "OTP Sent Successfully",

        }
        return Response(response, status=status.HTTP_200_OK)


class VerifyEmailView(APIView):

    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")
        user = User.objects.get(email=email)
        doctor = DoctorModel.objects.get(user=user)
        try:
            doctor_verificaion = DoctorVerificationModel.objects.get(doctor=doctor)
            hasReq = doctor_verificaion.id
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
            "verified": doctor.verified,
            "hasReq": hasReq
        }
        return Response(response, status=status.HTTP_200_OK)


class DoctorProfileView(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


    def post(self, request):

        # verify if user is legit

        try:
            user = request.user
            print(user)
            doctor = DoctorModel.objects.get(user=user)
        except:
            return Response("Doctor Not Found", status=status.HTTP_404_NOT_FOUND)
        # if(doctor.token != token):
        #     return Response("Invalid Doctor Token", status=status.HTTP_404_NOT_FOUND)

        profile = DoctorProfileModel.objects.get(doctor=doctor)
        print("date", request.data.get("dob"))
        if request.data.get("first_name") is not None:
            first_name = request.data.get("first_name")
            profile.first_name = first_name
        if request.data.get("last_name") is not None:
            last_name = request.data.get("last_name")
            profile.last_name = last_name
        if request.data.get("video") is not None:
            video = request.data.get("video")
            profile.video = video
        if request.data.get("description") is not None:
            description = request.data.get("description")
            profile.description = description
        if request.data.get("title") is not None:
            title = request.data.get("title")
            profile.title = title
        if request.data.get("reg_no") is not None:
            reg_no = request.data.get("reg_no")
            profile.reg_no = reg_no
        if request.data.get("signature") is not None:
            signature = request.data.get("signature")
            profile.signature = signature
        if request.data.get("city") is not None:
            city = request.data.get("city")
            profile.city = city
        if request.data.get("state") is not None:
            state = request.data.get("state")
            profile.state = state
        if request.data.get("files") is not None:
            files = request.data.get("files")
            profile.files = files
        if request.data.get("specialization") is not None:
            specialization = request.data.get("specialization")
            profile.specialization = specialization
        if request.data.get("qualification") is not None:
            qualification = request.data.get("qualification")
            profile.qualification = qualification
        if request.data.get("dob") is not None:
            dob = request.data.get("dob")
            profile.dob = dob
        if request.data.get("gender") is not None:
            gender = request.data.get("gender")
            profile.gender = gender
        if request.data.get("photo") is not None:
            photo = request.data.get("photo")
            profile.photo = photo
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
            isCreated = DoctorVerificationModel.objects.get(doctor=doctor)
        except:
            request_verification = DoctorVerificationModel.objects.create(doctor=doctor)
        return Response("Created Profile", status=status.HTTP_201_CREATED)

    def get(self, request):
        # verify if user is legit
        try:
            user = request.user
            doctor = DoctorModel.objects.get(user=user)
            doctor_profile = DoctorProfileModel.objects.get(doctor=doctor)
        except:
            return Response("Doctor Not Found", status=status.HTTP_404_NOT_FOUND)

        response = {
            'first_name': doctor_profile.first_name,
            'last_name': doctor_profile.last_name,
            'description': doctor_profile.description,
            'city': doctor_profile.city,
            'title': doctor_profile.title,
            'reg_no': doctor_profile.reg_no,
            'signature': doctor_profile.signature,
            'state': doctor_profile.state,
            'files': doctor_profile.files,
            'video': doctor_profile.video,
            'specialization': doctor_profile.specialization,
            'qualification': doctor_profile.qualification,
            'dob': doctor_profile.dob,
            'gender': doctor_profile.gender,
            'photo': doctor_profile.photo,
            'phone': doctor_profile.phone,
            'address': doctor_profile.address,
            'pincode': doctor_profile.pincode,
        }
        # TODO SERIALIZED OUTPUT
        return Response(response, status=status.HTTP_200_OK)


class DoctorRequestVerificationView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # verify if user is legit
        try:
            user = request.user
            doctor = DoctorModel.objects.get(user=user)
        except:
            return Response("Doctor Not Found", status=status.HTTP_404_NOT_FOUND)


        # check if already requested
        try:
            DoctorVerificationModel.objects.get(doctor=doctor)
            return Response("Already requested", status=status.HTTP_400_BAD_REQUEST)
        except:
            pass

        # create request for verification
        request_verification = DoctorVerificationModel.objects.create(doctor=doctor)

        return Response("Requested for Verification", status=status.HTTP_200_OK)

    def get(self, request):
        # doctor will see the remarks of verification.

        # verify if user is legit
        try:
            user = request.user
            doctor = DoctorModel.objects.get(user=user)
        except:
            return Response("Doctor Not Found", status=status.HTTP_404_NOT_FOUND)

        # check if already requested
        try:
            request_verification = DoctorVerificationModel.objects.get(doctor=doctor)
        except:
            return Response("No Request", status=status.HTTP_400_BAD_REQUEST)
        status_ = request_verification.status
        remarks = request_verification.remarks

        response = {
            "remarks": remarks,
            "status": status_
        }

        return Response(response, status=status.HTTP_200_OK)
