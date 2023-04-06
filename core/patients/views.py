from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

import random

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from doctors.models import DoctorProfileModel, SpecializationModel
from .models import PatientModel, PatientProfileModel


class EmailView(APIView):

    def post(self, request):

        email = request.data.get("email")
        otp = random.randint(1000, 9999)
        password_ = str(otp)
        isRegistered = User.objects.filter(email=email)
        if not isRegistered:
            user = User.objects.create_user(username=email, email=email, password=password_)
            auth = authenticate(username=email, password=password_)
            print("auth",auth)
            user.save()
            patient = PatientModel.objects.create(user=user)
            PatientProfileModel.objects.create(patient=patient)
        else:
            user = isRegistered[0]
            print("updating password", user)
            user.set_password(password_)
            user.save()
        print("otp", password_)
        response = {
            "message": "OTP Sent Successfully"
        }
        return Response(response, status=status.HTTP_200_OK)

class VerifyEmailView(APIView):

    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")
        user = User.objects.get(email=email)
        print(user)
        patient = PatientModel.objects.get(user=user)
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
        }
        return Response(response, status=status.HTTP_200_OK)

class DoctorSearchView(APIView):

    def get(self, request):
        query = request.GET["query"]
        queryset = DoctorProfileModel.objects.filter(name__icontains=query)
        response = []
        if(queryset):
            for q in queryset:
                print(q.name, q.photo, q.city, q.specialization, q.qualification)
                res = {
                    "doctor_id": q.doctor.id,
                    "name": q.name,
                    "photo": q.photo,
                    "city": q.city,
                    "specialization": q.specialization,
                    "qualification": q.qualification
                }
                response.append(res)
            return Response(response, status=status.HTTP_200_OK)
        else:
            return Response("No Result", status=status.HTTP_200_OK)

class DoctorsBySpecializationView(APIView):

    def get(self, request):
        specialization_name = request.GET["specialization"]
        specialization = SpecializationModel.objects.get(name=specialization_name)
        all_doctors = DoctorProfileModel.objects.filter(specialization=specialization)
        response = []
        if (all_doctors):
            for q in all_doctors:
                print(q.name, q.photo, q.city, q.specialization, q.qualification)
                res = {
                    "doctor_id": q.doctor.id,
                    "name": q.name,
                    "photo": q.photo,
                    "city": q.city,
                    "specialization": q.specialization.name,
                    "qualification": q.qualification
                }
                response.append(res)
            return Response(response, status=status.HTTP_200_OK)
        else:
            return Response("No Result", status=status.HTTP_200_OK)