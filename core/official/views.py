import json
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from doctors.models import DoctorAdminVerificationModel, DoctorModel, DoctorProfileModel

class AdminDoctorVerificationListView(APIView):

    def get(self, request):
        # TODO ADMIN VERIFICATION
        requests = DoctorAdminVerificationModel.objects.all().values()
        response = []
        for r in requests:
            res = {
                "request_id": r['id'],
                "doctor_id": r['doctor_id']
            }
            response.append(res)
        return Response(response, status=status.HTTP_200_OK)

class AdminDoctorVerificationView(APIView):

    def get(self, request):
        # TODO ADMIN VERIFICATION
        doctor_id = request.GET["doctor_id"]
        doctor = DoctorModel.objects.get(id=doctor_id)
        doctor_profile = DoctorProfileModel.objects.get(doctor=doctor)
        req = DoctorAdminVerificationModel.objects.get(doctor__id=doctor_id)
        response = {
            "request_id": req.id,
            "doctor_id": doctor_id,
            "verification_status": doctor.verified,
            'email': doctor.email,
            'first_name': doctor_profile.first_name,
            'last_name': doctor_profile.last_name,
            'description': doctor_profile.description,
            'city': doctor_profile.city,
            'link': doctor_profile.link
        }
        # TODO SERIALIZED OUTPUT
        return Response(response, status=status.HTTP_200_OK)

    def post(self, request):
        #update verification status
        # TODO ADMIN VERIFICATION
        doctor_id = request.data.get("doctor_id")
        remarks = request.data.get("remarks")
        verified = request.data.get("verified")
        doctor = DoctorModel.objects.get(id=doctor_id)
        doctor.verified = verified
        doctor.save()
        doctor_verifcation = DoctorAdminVerificationModel.objects.get(doctor=doctor)
        doctor_verifcation.remarks = remarks
        doctor_verifcation.save()
        response = {
            "message": "Updated Doctor Verocification Status"
        }
        return Response(response, status=status.HTTP_201_CREATED)



