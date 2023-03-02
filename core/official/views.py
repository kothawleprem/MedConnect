import json
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from doctors.models import DoctorVerificationModel, DoctorModel, DoctorProfileModel

class AdminDoctorVerificationListView(APIView):

    def get(self, request):
        # TODO ADMIN VERIFICATION
        requests = DoctorVerificationModel.objects.all().values()
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
        req = DoctorVerificationModel.objects.get(doctor__id=doctor_id)
        response = {
            "request_id": req.id,
            "doctor_id": doctor_id,
            "verification_status": doctor.verified,
            'email': doctor.email,
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

    def post(self, request):
        #update verification status
        # TODO ADMIN VERIFICATION
        doctor_id = request.data.get("doctor_id")
        remarks = request.data.get("remarks")
        status_ = request.data.get("status")
        verified = request.data.get("verified")
        doctor = DoctorModel.objects.get(id=doctor_id)
        doctor.verified = verified
        doctor.save()
        doctor_verifcation = DoctorVerificationModel.objects.get(doctor=doctor)
        doctor_verifcation.remarks = remarks
        doctor_verifcation.status = status_
        doctor_verifcation.save()
        response = {
            "message": "Updated Doctor Vericification Status"
        }
        return Response(response, status=status.HTTP_201_CREATED)



