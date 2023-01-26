from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from datetime import time
from .models import ConsultationModel, SlotModel
from doctors.models import DoctorModel


class SlotView(APIView):

    def get(self, request):
        doctor_id = request.GET["doctor_id"]
        date = request.GET["date"]
        day_slots = SlotModel.objects.filter(doctor__id=doctor_id, date=date).values('id','start_time', 'end_time').order_by('start_time')
        response = []
        for t in day_slots:
            res = {
                'slot_id': t['id'],
                'start_time': t['start_time'],
                'end_time': t['end_time']
            }
            response.append(res)
        return Response(response, status=status.HTTP_200_OK)

    def post(self, request):
        doctor_id = request.data.get("doctor_id")
        date = request.data.get("date")
        start_time = request.data.get("start_time")
        end_time = request.data.get("end_time")
        remarks = request.data.get("remarks")

        req_st = time(int(start_time[0:2]), int(start_time[3:5]), int(start_time[6:8]))
        req_et = time(int(end_time[0:2]), int(end_time[3:5]), int(end_time[6:8]))
        day_slots = SlotModel.objects.filter(doctor__id=doctor_id, date=date).values('start_time', 'end_time').order_by('start_time')
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
