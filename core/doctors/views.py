from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

import os
import random
from cryptography.fernet import Fernet

from .models import DoctorModel, DoctorProfileModel, DoctorAdminVerificationModel

class EmailView(APIView):

    def get(self, request):
        return Response("API Working", status=status.HTTP_200_OK)

    def post(self, request):
        email = request.data.get("email")
        try:
            isRegistered = DoctorModel.objects.get(email=email)
            print(isRegistered)
            print("is reg")
        except:
            doctor = DoctorModel.objects.create(email=email)
            DoctorProfileModel.objects.create(doctor=doctor)
            print("not reg, just did")
        doctor = DoctorModel.objects.get(email=email)
        otp = random.randint(1000,9999)
        doctor.otp = otp
        print("OTP",otp)
        strKey = "YdgkXWwdxycqNAkJ-_9OfOtLaPCZW2DO0WGTazVKsYs="
        key = strKey.encode()
        fernet = Fernet(key)
        mix = email + str(otp)
        encrypted = fernet.encrypt(mix.encode())
        doctor.token = encrypted.decode()
        doctor.save()
        return Response(f"{email}, {otp}, API Working", status=status.HTTP_200_OK)

class VerifyEmailView(APIView):

    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")
        doctor = DoctorModel.objects.get(email=email)
        if doctor.otp != int(otp):
            return Response("Incorrect OTP", status=status.HTTP_401_UNAUTHORIZED)
        response = {
            "email": email,
            "token": doctor.token
        }
        return Response(response, status=status.HTTP_200_OK)

class DoctorProfileView(APIView):

    def post(self, request):
        email = request.data.get("email")
        token = request.data.get("token")
        # verify if user is legit
        try:
            doctor = DoctorModel.objects.get(email=email)
        except:
            return Response("Doctor Not Found", status=status.HTTP_404_NOT_FOUND)
        if(doctor.token != token):
            return Response("Invalid Doctor", status=status.HTTP_404_NOT_FOUND)
        profile = DoctorProfileModel.objects.get(doctor=doctor)

        if("first_name" in request.data.keys()):
            first_name = request.data.get("first_name")
            profile.first_name = first_name
        if ("last_name" in request.data.keys()):
            last_name = request.data.get("last_name")
            profile.last_name = last_name
        if ("link" in request.data.keys()):
            link = request.data.get("link")
            profile.link = link
        if ("description" in request.data.keys()):
            description = request.data.get("description")
            profile.description = description
        #TODO Files.
        profile.save()
        return Response("Created Profile", status=status.HTTP_200_OK)

class DoctorRequestVerificationView(APIView):

    def post(self, request):
        email = request.data.get("email")
        token = request.data.get("token")
        # verify if user is legit
        try:
            doctor = DoctorModel.objects.get(email=email)
        except:
            return Response("Doctor Not Found", status=status.HTTP_404_NOT_FOUND)
        if (doctor.token != token):
            return Response("Invalid Doctor", status=status.HTTP_404_NOT_FOUND)

        # check if already requested
        try:
            DoctorAdminVerificationModel.objects.get(doctor=doctor)
            return Response("Already requested", status=status.HTTP_400_BAD_REQUEST)
        except:
            pass

        # create request for verification
        request_verification = DoctorAdminVerificationModel.objects.create(doctor=doctor)

        return Response("Requested for Verification", status=status.HTTP_200_OK)

    def get(self, request):
        # doctor will see the remarks of verification.

        email = request.GET["email"]
        token = request.GET["token"]
        # verify if user is legit
        try:
            doctor = DoctorModel.objects.get(email=email)
        except:
            return Response("Doctor Not Found", status=status.HTTP_404_NOT_FOUND)
        if (doctor.token != token):
            return Response("Invalid Doctor", status=status.HTTP_404_NOT_FOUND)

        # check if already requested
        try:
            request_verification = DoctorAdminVerificationModel.objects.get(doctor=doctor)
        except:
            return Response("No Request", status=status.HTTP_400_BAD_REQUEST)

        remarks = request_verification.remarks

        response = {
            "remarks": remarks
        }

        return Response(response, status=status.HTTP_200_OK)



