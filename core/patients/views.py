import datetime

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

import random

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from consultation.models import SlotModel, ConsultationModel, PrescriptionModel
from doctors.models import DoctorProfileModel, SpecializationModel, DoctorModel
from .models import PatientModel, PatientProfileModel

from core.emails import sendOTP


class EmailView(APIView):

    def post(self, request):

        email = request.data.get("email")
        otp = random.randint(1000, 9999)
        password_ = str(otp)
        isRegistered = User.objects.filter(email=email)
        if not isRegistered:
            user = User.objects.create_user(username=email, email=email, password=password_)
            auth = authenticate(username=email, password=password_)
            print("auth", auth)
            user.save()
            patient = PatientModel.objects.create(user=user)
            PatientProfileModel.objects.create(patient=patient)
        else:
            user = isRegistered[0]
            print("updating password", user)
            user.set_password(password_)
            user.save()
        sendOTP(email, otp)
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
        if (queryset):
            for q in queryset:
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
            return Response(response, status=status.HTTP_200_OK)


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
            return Response(response, status=status.HTTP_200_OK)


class DoctorProfileView(APIView):

    def get(self, request):

        doctor_id = request.GET["doctor_id"]
        try:
            doctor_profile = DoctorProfileModel.objects.get(doctor__id=doctor_id)
        except:
            return Response("Doctor Not found", status=status.HTTP_404_NOT_FOUND)

        today = datetime.date.today()
        tomorrow = today + datetime.timedelta(days=1)
        today_slots = SlotModel.objects.filter(doctor__id=doctor_id, date=today).values('id', 'start_time',
                                                                                        'end_time', 'status').order_by(
            'start_time')
        tomorrow_slots = SlotModel.objects.filter(doctor__id=doctor_id, date=tomorrow).values('id', 'start_time',
                                                                                              'end_time',
                                                                                              'status').order_by(
            'start_time')
        slots = []
        today_response = []
        tomorrow_response = []

        for t in today_slots:
            st = str(t['start_time'])
            et = str(t['end_time'])
            if t['status'] is False:
                res = {
                    'slot_id': t['id'],
                    'start_time': st[:-3],
                    'end_time': et[:-3],
                    'status': t['status']
                }
                today_response.append(res)
        slots.append(today_response)
        for t in tomorrow_slots:
            st = str(t['start_time'])
            et = str(t['end_time'])
            if t['status'] is False:
                res = {
                    'slot_id': t['id'],
                    'start_time': st[:-3],
                    'end_time': et[:-3],
                    'status': t['status']
                }
                tomorrow_response.append(res)
        slots.append(tomorrow_response)

        response = {
            'email': doctor_profile.doctor.user.email,
            'name': doctor_profile.name,
            'description': doctor_profile.description,
            'city': doctor_profile.city,
            'state': doctor_profile.state,
            'video': doctor_profile.video,
            'specialization': doctor_profile.specialization.name,
            'qualification': doctor_profile.qualification,
            'photo': doctor_profile.photo,
            'phone': doctor_profile.phone,
            'slots': slots
        }
        print(doctor_profile)
        return Response(response, status=status.HTTP_200_OK)


class PatientSlotView(APIView):

    #bookSlot
    def get(self, request):
        slot_id = request.GET["slot_id"]
        try:
            slot = SlotModel.objects.get(id=slot_id)
            doctor_profile = DoctorProfileModel.objects.get(doctor__id=slot.doctor.id)
        except:
            return Response("not ok", status=status.HTTP_404_NOT_FOUND)
        response = {
            "date": slot.date,
            "start_time": str(slot.start_time)[:-3],
            "end_time": str(slot.end_time)[:-3],
            "remarks": slot.remarks,
            "name": doctor_profile.name,
            "email": slot.doctor.user.email,
            "specialization": doctor_profile.specialization.name,
            "phone": doctor_profile.phone,
            "city": doctor_profile.city,
            "state": doctor_profile.state,
            "fees": slot.amount
        }
        return Response(response, status=status.HTTP_200_OK)

class ManageConsultationsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        #ui -> date, st and end time, dr name, specialization, payment status, view complete
        user = request.user
        patient = PatientModel.objects.get(user=user)
        consultations = ConsultationModel.objects.filter(patient=patient).order_by('-slot__date')
        response = []
        for consultation in consultations:
            doctor_profile = DoctorProfileModel.objects.get(doctor=consultation.slot.doctor)
            if(consultation.payment_completed and not consultation.completed):
                status_ = "PAYMENT_COMPLETED"
            elif(consultation.completed):
                status_ = "COMPLETED"
            else:
                print("pending")
                status_ = "PAYMENT_PENDING"
            res = {
                "consultation_id": consultation.id,
                "date": consultation.slot.date,
                "start_time": consultation.slot.start_time,
                "end_time": consultation.slot.end_time,
                "doctor_name": doctor_profile.name,
                "specialization": doctor_profile.specialization.name,
                "status": status_
            }
            response.append(res)
        print(response)
        return Response(response, status=status.HTTP_200_OK)

class ConsultationView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        consultation_id = request.GET["consultation_id"]
        consultation = ConsultationModel.objects.get(id=consultation_id)
        slot = consultation.slot
        doctor = consultation.slot.doctor
        doctor_profile = DoctorProfileModel.objects.get(doctor=doctor)
        status_ = "PAYMENT_PENDING"
        if (consultation.completed):
            status_ = "COMPLETED"
        elif (consultation.payment_completed):
            status_ = "PAYMENT_COMPLETED"
        if(consultation.completed):
            presc = PrescriptionModel.objects.get(consultation=consultation)
            prescription = str(presc.prescription_file)
        else:
            prescription = "NOT_GENERATED"
        if(len(str(consultation.patient_file))):
            patient_file = str(consultation.patient_file)
        else:
            patient_file = "NOT_UPLOADED"
        # print(len(str(consultation.patient_file)))
        response = {
            "date": slot.date,
            "start_time": str(slot.start_time)[:-3],
            "end_time": str(slot.end_time)[:-3],
            "doctor_name": doctor_profile.name,
            "email": slot.doctor.user.email,
            "specialization": doctor_profile.specialization.name,
            "phone": doctor_profile.phone,
            "city": doctor_profile.city,
            "state": doctor_profile.state,
            "patient_file": patient_file,
            "room_id": consultation.room_id,
            "dr_consultation_remarks": consultation.remarks,
            "prescription_file": prescription,
            "status": status_
        }
        return Response(response, status=status.HTTP_200_OK)

