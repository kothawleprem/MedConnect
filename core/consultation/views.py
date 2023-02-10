from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from datetime import time

from patients.models import PatientModel, PatientProfileModel
from .models import ConsultationModel, SlotModel
from doctors.models import DoctorModel, DoctorProfileModel

from .prescription import generate_prescription
import datetime


class SlotView(APIView):

    def get(self, request):
        slot_id = request.GET["slot_id"]
        slot = SlotModel.objects.get(id=slot_id)
        response = {
            'doctor_id': slot.doctor_id,
            'date': slot.doctor_id,
            'start_time': slot.doctor_id,
            'end_time': slot.end_time,
            'remarks': slot.remarks,
            'status': slot.status
        }
        return Response(response, status=status.HTTP_200_OK)

    def post(self, request):
        doctor_id = request.data.get("doctor_id")
        date = request.data.get("date")
        start_time = request.data.get("start_time")
        end_time = request.data.get("end_time")
        remarks = request.data.get("remarks")

        req_st = time(int(start_time[0:2]), int(start_time[3:5]), int(start_time[6:8]))
        req_et = time(int(end_time[0:2]), int(end_time[3:5]), int(end_time[6:8]))

        if(req_st >= req_et):
            response = {
                "message": "Invalid Time Slot",
            }
            return Response(response, status=status.HTTP_406_NOT_ACCEPTABLE)
        day_slots = SlotModel.objects.filter(doctor__id=doctor_id, date=date).values('start_time', 'end_time').order_by(
            'start_time')
        time_l = []
        for t in day_slots:
            start_time = t['start_time']
            end_time = t['end_time']
            time_l.append([start_time, end_time])
        flag = 0
        if req_et < time_l[0][0]:
            flag = 1
        elif req_st > time_l[len(time_l) - 1][1]:
            flag = 1
        else:
            for i in range(len(time_l)):
                if time_l[i][1] < req_st and time_l[i + 1][0] > req_et:
                    flag = 1
        if flag == 1:
            doctor = DoctorModel.objects.get(id=doctor_id)
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


class SlotListView(APIView):

    # give date and doctor_id to get slots of that doctor
    def get(self, request):
        doctor_id = request.GET["doctor_id"]
        today = datetime.date.today()
        tomorrow = today + datetime.timedelta(days=1)
        today_slots = SlotModel.objects.filter(doctor__id=doctor_id, date=today).values('id', 'start_time',
                                                                                      'end_time').order_by('start_time')
        tomorrow_slots = SlotModel.objects.filter(doctor__id=doctor_id, date=tomorrow).values('id', 'start_time',
                                                                                        'end_time').order_by(
            'start_time')
        response = []
        today_response = []
        tomorrow_response = []
        for t in today_slots:
            res = {
                'slot_id': t['id'],
                'start_time': t['start_time'],
                'end_time': t['end_time']
            }
            today_response.append(res)
        response.append(today_response)
        for t in tomorrow_slots:
            res = {
                'slot_id': t['id'],
                'start_time': t['start_time'],
                'end_time': t['end_time']
            }
            tomorrow_response.append(res)
        response.append(tomorrow_response)
        return Response(response, status=status.HTTP_200_OK)


class PatienBookSlotView(APIView):

    def post(self, request):
        # TODO: PATIENT VERIFICATION
        # TODO: FIRST PAYMENT THEN BOOK
        slot_id = request.data.get("slot_id")
        patient_id = request.data.get("patient_id")
        patient = PatientModel.objects.get(id=patient_id)
        slot = SlotModel.objects.get(id=slot_id)
        slot.status = True
        slot.save()
        consultation = ConsultationModel.objects.create(slot=slot, doctor=slot.doctor, patient=patient)
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
