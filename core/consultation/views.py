from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from datetime import time

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from patients.models import PatientModel, PatientProfileModel
from .models import ConsultationModel, SlotModel, PaymentModel, PrescriptionModel
from doctors.models import DoctorModel, DoctorProfileModel

from .prescription import generate_prescription
import datetime

import json
import os
import stripe

# This is your test secret API key.
stripe.api_key = os.getenv('STRIPE_KEY')


class SlotView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        slot_id = request.GET["slot_id"]
        slot = SlotModel.objects.get(id=slot_id)
        response = {
            'doctor_id': slot.doctor_id,
            'date': slot.date,
            'start_time': slot.start_time,
            'end_time': slot.end_time,
            'remarks': slot.remarks,
            'status': slot.status
        }
        return Response(response, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        doctor = DoctorModel.objects.get(user=user)
        date = request.data.get("date")
        start_time = request.data.get("start_time")
        end_time = request.data.get("end_time")
        remarks = request.data.get("remarks")
        print(start_time, end_time)
        req_st = time(int(start_time[0:2]), int(start_time[3:5]), 00)
        req_et = time(int(end_time[0:2]), int(end_time[3:5]), 00)
        print(req_st, req_et)
        if (req_st >= req_et):
            response = {
                "message": "Invalid Time Slot",
            }
            return Response(response, status=status.HTTP_406_NOT_ACCEPTABLE)
        print(date)
        day_slots = SlotModel.objects.filter(doctor=doctor, date=date).values('start_time', 'end_time').order_by(
            'start_time')
        print(day_slots)
        time_l = []
        for t in day_slots:
            start_time = t['start_time']
            end_time = t['end_time']
            time_l.append([start_time, end_time])
        flag = 0
        print(time_l)
        if len(day_slots) == 0:
            slot = SlotModel.objects.create(doctor=doctor, date=date, start_time=req_st, end_time=req_et,
                                            remarks=remarks)
            response = {
                "message": "Slot Added!!",
                "slot_id": slot.id
            }
            return Response(response, status=status.HTTP_201_CREATED)
        if req_et < time_l[0][0]:
            flag = 1
        elif req_st > time_l[len(time_l) - 1][1]:
            flag = 1
        else:
            for i in range(len(time_l)):
                if time_l[i][1] < req_st and time_l[i + 1][0] > req_et:
                    flag = 1
        if flag == 1:
            slot = SlotModel.objects.create(doctor=doctor, date=date, start_time=req_st, end_time=req_et,
                                            remarks=remarks)
            response = {
                "message": "Slot Added!!",
                "slot_id": slot.id
            }
            return Response(response, status=status.HTTP_201_CREATED)
        response = {
            "message": "This time slot is already occupied.",
        }
        return Response(response, status=status.HTTP_406_NOT_ACCEPTABLE)

    def patch(self, request):
        user = request.user
        doctor = DoctorModel.objects.get(user=user)
        slot_id = request.data.get("slot_id")
        remarks = request.data.get("remarks")
        try:
            slot = SlotModel.objects.get(id=slot_id)
        except:
            response = {
                "message": "Invalid Slot"
            }
            return Response(response, status=status.HTTP_404_NOT_FOUND)
        if slot.doctor != doctor:
            response = {
                "message": "Invalid Doctor"
            }
            return Response(response, status=status.HTTP_404_NOT_FOUND)
        slot.remarks = remarks
        slot.save()
        response = {
            "message": "Remarks Updated!!",
        }
        return Response(response, status=status.HTTP_202_ACCEPTED)

    def delete(self, request):
        user = request.user
        doctor = DoctorModel.objects.get(user=user)
        slot_id = request.data.get("slot_id")
        try:
            slot = SlotModel.objects.get(id=slot_id)
        except:
            response = {
                "message": "Invalid Slot"
            }
            return Response(response, status=status.HTTP_404_NOT_FOUND)
        if slot.doctor != doctor:
            response = {
                "message": "Invalid Doctor"
            }
            return Response(response, status=status.HTTP_404_NOT_FOUND)
        slot.delete()
        response = {
            "message": "Slot Deleted!!",
        }
        return Response(response, status=status.HTTP_204_NO_CONTENT)


class SlotListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # give date and doctor_id to get slots of that doctor
    def get(self, request):
        user = request.user
        status = request.GET["status"]
        print(request.GET)
        limit = 100
        if "limit" in request.GET:
            limit = int(request.GET["limit"])
        doctor = DoctorModel.objects.get(user=user)
        today = datetime.date.today()
        tomorrow = today + datetime.timedelta(days=1)
        today_slots = SlotModel.objects.filter(doctor=doctor, date=today).values('id', 'start_time',
                                                                                 'end_time', 'status').order_by(
            'start_time')
        tomorrow_slots = SlotModel.objects.filter(doctor=doctor, date=tomorrow).values('id', 'start_time',
                                                                                       'end_time', 'status').order_by(
            'start_time')
        response = []
        today_response = []
        tomorrow_response = []

        print(status)
        if status == "True":
            count_t = 0
            count_to = 0
            print("in true", today_slots)
            for t in today_slots:
                if count_t < limit and t['status'] is True:
                    # slot = SlotModel.objects.get(id=t['id'])
                    # print(t['id'])
                    consultation = ConsultationModel.objects.get(slot__id=t['id'])
                    patient = consultation.patient
                    patient_profile = PatientProfileModel.objects.get(patient=patient)
                    res = {
                        'consultation_id': consultation.id,
                        "patient_name": patient_profile.first_name + " " + patient_profile.last_name,
                        'start_time': str(t['start_time'])[:-3],
                        'end_time': str(t['end_time'])[:-3],
                        'status': t['status']
                    }
                    today_response.append(res)
                    count_t += 1
            response.append(today_response)
            for t in tomorrow_slots:
                if count_to < limit and t['status'] is True:
                    consultation = ConsultationModel.objects.get(slot__id=t['id'])
                    patient = consultation.patient
                    patient_profile = PatientProfileModel.objects.get(patient=patient)
                    res = {
                        'consultation_id': consultation.id,
                        "patient_name": patient_profile.first_name + " " + patient_profile.last_name,
                        'start_time': t['start_time'],
                        'end_time': t['end_time'],
                        'status': t['status']
                    }
                    tomorrow_response.append(res)
                    count_to += 1
            response.append(tomorrow_response)
        elif status == "False":
            limit_f = 9
            for t in today_slots:
                st = str(t['start_time'])
                et = str(t['end_time'])
                if limit_f > 0 and t['status'] is False:
                    res = {
                        'slot_id': t['id'],
                        'start_time': st[:-3],
                        'end_time': et[:-3],
                        'status': t['status']
                    }
                    today_response.append(res)
                    limit_f -= 1
            response.append(today_response)
            for t in tomorrow_slots:
                if limit_f > 0 and t['status'] is False:
                    res = {
                        'slot_id': t['id'],
                        'start_time': t['start_time'],
                        'end_time': t['end_time'],
                        'status': t['status']
                    }
                    tomorrow_response.append(res)
                    limit_f -= 1
            response.append(tomorrow_response)
        else:
            print("in none")
            for t in today_slots:
                res = {
                    'slot_id': t['id'],
                    'start_time': t['start_time'],
                    'end_time': t['end_time'],
                    'status': t['status']
                }
                today_response.append(res)
            response.append(today_response)
            for t in tomorrow_slots:
                res = {
                    'slot_id': t['id'],
                    'start_time': t['start_time'],
                    'end_time': t['end_time'],
                    'status': t['status']
                }
                tomorrow_response.append(res)
            response.append(tomorrow_response)
        return Response(response)


class PatienBookSlotView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user
            patient = PatientModel.objects.get(user=user)
            # patient_profile = PatientProfileModel.objects.get(patient=patient)
        except:
            return Response("Patient Not Found", status=status.HTTP_404_NOT_FOUND)
        slot_id = request.data.get("slot_id")
        slot = SlotModel.objects.get(id=slot_id)
        slot.status = True
        slot.save()
        consultation = ConsultationModel.objects.create(slot=slot, doctor=slot.doctor, patient=patient)
        consultation.amount = slot.amount
        consultation.save()
        # TODO: EMAIL CONFIRMATION
        response = {
            "consultation_id": consultation.id,
        }
        return Response(response, status=status.HTTP_201_CREATED)


class RoomView(APIView):
    def post(self, request):
        room_id = request.data.get("room_id")
        consultation_id = request.data.get("consultation_id")
        consultation = ConsultationModel.objects.get(id=consultation_id)
        consultation.room_id = room_id
        consultation.save()
        response = {
            "message": "Added room id!!"
        }
        return Response(response, status=status.HTTP_201_CREATED)

    def get(self, request):
        consultation_id = request.GET["consultation_id"]
        consultation = ConsultationModel.objects.get(id=consultation_id)
        room_id = consultation.room_id
        if room_id is None:
            response = {
                "message": "Room not created yet!"
            }
            return Response(response, status=status.HTTP_404_NOT_FOUND)
        response = {
            "room_id": room_id
        }
        return Response(response, status=status.HTTP_200_OK)


class PrescriptionView(APIView):

    def post(self, request):
        consultation_id = request.data.get("consultation_id")
        doctor_id = request.data.get("doctor_id")
        patient_id = request.data.get("patient_id")
        patient = PatientModel.objects.get(id=patient_id)
        patient_profile = PatientProfileModel.objects.get(patient=patient)
        patient_name = patient_profile.first_name + " " + patient_profile.last_name
        patient_location = patient_profile.city

        doctor = DoctorModel.objects.get(id=doctor_id)
        doctor_profile = DoctorProfileModel.objects.get(doctor=doctor)
        doctor_email = doctor.email
        doctor_name = doctor_profile.first_name + " " + doctor_profile.last_name
        doctor_signature = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXx8xhe108eJolj8lt38K5qq7L2no-ienLUJgOFvF9ubXhD9SBC2DvcDJjmMWd1KpT6A&usqp=CAU"
        medconnect_id = doctor_id
        reg_no = doctor_profile.reg_no
        doctor_location = doctor_profile.city
        doctor_title = doctor_profile.title
        medicine_list = request.data.get("medicine_list")
        remarks = request.data.get("remarks")
        prescription_no = "123"
        date = "1st Jan 2023"
        logo_path = "https://raw.githubusercontent.com/kothawleprem/MedConnect/main/templates/medconnect_logo.jpg"
        rx_path = "https://raw.githubusercontent.com/kothawleprem/MedConnect/main/templates/rx_logo.jpg"
        generate_prescription(patient_name, doctor_name, medicine_list, logo_path, rx_path, doctor_signature,
                              prescription_no,
                              consultation_id, doctor_email, medconnect_id, reg_no, doctor_location, patient_id,
                              patient_location, date, remarks, doctor_title)
        print(consultation_id, doctor_id, patient_id, medicine_list, remarks)
        response = {
            "message": "Generate Prescription"
        }
        return Response(response, status=status.HTTP_201_CREATED)


class PaymentView(APIView):

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


class ManagePaymentView(APIView):

    def post(self, request):
        stripe_id = request.data.get("stripe_id")
        consultation_id = request.data.get("consultation_id")
        status = request.data.get("status")
        consultation = ConsultationModel.objects.get(id=consultation_id)
        amount = consultation.amount
        payment = PaymentModel.objects.create(consultation=consultation, stripe_id=stripe_id, amount=amount,
                                              status=status)
        return Response("Payment Created with ID: ", payment.id)

class ConfirmPaymentView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        slot_id = request.data.get("slot_id")
        stripe_id = request.data.get("stripe_id")
        consultation = ConsultationModel.objects.get(slot__id=slot_id)
        consultation.payment = True
        consultation.save()
        amount = consultation.amount
        status_ = True
        payment = PaymentModel.objects.create(consultation=consultation, amount=amount, status=status_, stripe_id=stripe_id)
        response = {
            "payment_id": payment.id
        }
        return Response(response, status=status.HTTP_201_CREATED)

class DoctorPatientView(APIView):
    # all patients associated with that doctor
    def get(self, request):
        user = request.user
        limit = int(request.GET["limit"])
        doctor = DoctorModel.objects.get(user=user)
        all_consultations = ConsultationModel.objects.filter(doctor=doctor).order_by("-id")
        response = []
        for consultation in all_consultations:
            if limit > 0 and consultation.completed is True:
                patient = consultation.patient
                patient_profile = PatientProfileModel.objects.get(patient=patient)
                slot = consultation.slot
                res = {
                    "patient_id": patient.id,
                    "patient_name": patient_profile.first_name + " " + patient_profile.last_name,
                    "consultation_id": consultation.id,
                    "date": slot.date,
                    "city": patient_profile.city
                }
                response.append(res)
                limit = limit - 1
            else:
                break
        print(response)
        return Response(response, status=status.HTTP_200_OK)


class ConsultiationView(APIView):

    def get(self, request):
        # access: 1->doctor 2-> patient
        access = request.GET["access"]
        user = request.user
        consultation_id = request.GET["consultation_id"]
        consultation = ConsultationModel.objects.get(id=consultation_id)
        slot = consultation.slot
        patient = consultation.patient
        patient_profile = PatientProfileModel.objects.get(patient=patient)
        specialization = "Temp"
        start_time = slot.start_time
        end_time = slot.end_time
        date = slot.date
        patient_name = patient_profile.first_name + " " + patient_profile.last_name
        patient_city = patient_profile.city
        patient_gender = "Male"
        remarks = consultation.remarks
        amount = consultation.amount

        # past consultation
        previous_consultations = []
        past_consultations = ConsultationModel.objects.filter(patient=patient)
        if (len(past_consultations) > 0):
            for con in past_consultations:
                if con.id == consultation.id:
                    continue
                prescription = PrescriptionModel.objects.filter(consultation=con)
                if(prescription.exists()):
                    res = {
                        "consultation_id": con.id,
                        "date": con.slot.date,
                        "prescription_file": str(prescription.prescription_file),
                        "remarks": con.remarks
                    }
                    previous_consultations.append(res)
        print("past", previous_consultations)

        response = {
            'consultation_id': consultation_id,
            'completed': consultation.completed,
            'specialization': specialization,
            'start_time': start_time,
            'end_time': end_time,
            'date': date,
            'patient_name': patient_name,
            "patient_age": 21,
            'patient_city': patient_city,
            'patient_gender': patient_gender,
            'remarks': remarks,
            'amount': amount,
            'previous_consultations': previous_consultations
        }
        print("res",response)
        return Response(response, status=status.HTTP_200_OK)

class ConsultationRemarksView(APIView):

    def put(self, request):
        consultation_id = request.data.get("consultation_id")
        remarks = request.data.get("remarks")
        try:
            consultation = ConsultationModel.objects.get(id=consultation_id)
        except:
            return Response("Invalid Consultation Id", status=status.HTTP_404_NOT_FOUND)
        consultation.remarks = remarks
        consultation.save()
        response = {
            "message": "Remarks Updated"
        }
        return Response(response, status=status.HTTP_202_ACCEPTED)

# class InstantDoctorView(APIView):
#
#     def