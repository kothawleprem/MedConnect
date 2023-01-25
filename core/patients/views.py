from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

import os
import random
from cryptography.fernet import Fernet

from .models import PatientModel

class EmailView(APIView):

    def post(self, request):

        email = request.data.get("email")
        try:
            isRegistered = PatientModel.objects.get(email=email)
            print(isRegistered)
        except:
            patient = PatientModel.objects.create(email=email)
        patient = PatientModel.objects.get(email=email)
        otp = random.randint(1000,9999)
        print(otp)
        patient.otp = otp
        strKey = "YdgkXWwdxycqNAkJ-_9OfOtLaPCZW2DO0WGTazVKsYs="
        key = strKey.encode()
        fernet = Fernet(key)
        mix = email + str(otp)
        encrypted = fernet.encrypt(mix.encode())
        patient.token = encrypted.decode()
        patient.save()
        response = {
            "message": "OTP Sent Successfully"
        }
        return Response(response, status=status.HTTP_200_OK)

class VerifyEmailView(APIView):

    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")
        patient = PatientModel.objects.get(email=email)
        if patient.otp != int(otp):
            response = {
                "message": "Incorrect OTP"
            }
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
        response = {
            "email": email,
            "token": patient.token
        }
        return Response(response, status=status.HTTP_200_OK)