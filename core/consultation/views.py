from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from datetime import time

from patients.models import PatientModel
from .models import ConsultationModel, SlotModel
from doctors.models import DoctorModel


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
        date = request.GET["date"]
        day_slots = SlotModel.objects.filter(doctor__id=doctor_id, date=date).values('id', 'start_time',
                                                                                     'end_time').order_by('start_time')
        response = []
        for t in day_slots:
            res = {
                'slot_id': t['id'],
                'start_time': t['start_time'],
                'end_time': t['end_time']
            }
            response.append(res)
        return Response(response, status=status.HTTP_200_OK)


class PatienBookSlotView(APIView):

    def post(self, request):
        #TODO: PATIENT VERIFICATION
        #TODO: FIRST PAYMENT THEN BOOK
        slot_id = request.data.get("slot_id")
        patient_id = request.data.get("patient_id")
        patient = PatientModel.objects.get(id=patient_id)
        slot = SlotModel.objects.get(id=slot_id)
        slot.status = True
        slot.save()
        consultation = ConsultationModel.objects.create(slot=slot, doctor=slot.doctor, patient=patient)
        consultation.save()
        #TODO: EMAIL CONFIRMATION
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

class Prescription(APIView):

    def post(self, request):
