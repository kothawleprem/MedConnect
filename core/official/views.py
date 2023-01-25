from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from doctors.models import DoctorAdminVerificationModel, DoctorModel, DoctorProfileModel

class AdminDoctorVerificationListView(APIView):

    def get(self, request):
        # TODO ADMIN VERIFICATION
        requests = DoctorAdminVerificationModel.objects.all()
        print(requests)
        return Response("OK", status=status.HTTP_200_OK)

class AdminDoctorVerificationView(APIView):

    def get(self, request):
        # TODO ADMIN VERIFICATION
        id = request.GET["id"]
        doctor = DoctorModel.objects.get(id=id)
        requests = DoctorAdminVerificationModel.objects.get(doctor=doctor)
        print(requests)
        # TODO SERIALIZED OUTPUT
        return Response("OK", status=status.HTTP_200_OK)

