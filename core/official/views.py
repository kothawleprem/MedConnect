import json
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView


from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser

from doctors.models import DoctorVerificationModel, DoctorModel, DoctorProfileModel, VerificationStatusModel, \
    DoctorPayoutModel, DoctorPaymentDetailsModel


class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})



class AdminDoctorVerificationListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

    def get(self, request):

        required_status = request.GET["status"]
        requests = DoctorVerificationModel.objects.all().values()
        response = []

        for r in requests:
            status_ = VerificationStatusModel.objects.get(id=r['status_id'])
            doctor_profile = DoctorProfileModel.objects.get(id=r['doctor_id'])
            print(required_status.upper(), status_.status)
            if (required_status.upper() == 'PENDING' and status_.status == 'PENDING'):
                res = {
                    "request_id": r['id'],
                    "doctor_id": r['doctor_id'],
                    "doctor_name": doctor_profile.name,
                    "email": doctor_profile.doctor.user.email,
                    "status": status_.status
                }
                response.append(res)
            if (required_status.upper() == 'ACCEPTED' and status_.status == 'ACCEPTED'):
                res = {
                    "request_id": r['id'],
                    "doctor_id": r['doctor_id'],
                    "doctor_name": doctor_profile.name,
                    "email": doctor_profile.doctor.user.email,
                    "status": status_.status
                }
                response.append(res)
            if (required_status.upper() == 'REJECTED' and status_.status == 'REJECTED'):
                res = {
                    "request_id": r['id'],
                    "doctor_id": r['doctor_id'],
                    "doctor_name": doctor_profile.name,
                    "email": doctor_profile.doctor.user.email,
                    "status": status_.status
                }
                response.append(res)
            if (required_status.upper() == "ALL"):
                res = {
                    "request_id": r['id'],
                    "doctor_id": r['doctor_id'],
                    "doctor_name": doctor_profile.name,
                    "email": doctor_profile.doctor.user.email,
                    "status": status_.status
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
        status__ = VerificationStatusModel.objects.get(status=status_)
        doctor_verifcation.remarks = remarks
        doctor_verifcation.status = status__
        doctor_verifcation.save()
        response = {
            "message": "Updated Doctor Vericification Status"
        }
        return Response(response, status=status.HTTP_201_CREATED)

class DoctorPayoutListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

    def post(self, request):
        payout_id = request.data.get("payout_id")
        transaction_id = request.data.get("transactionid")
        payout = DoctorPayoutModel.objects.get(id=payout_id)
        payout.transaction_id = transaction_id
        payout.paid = True
        payout.save()
        return Response("OK", status=status.HTTP_201_CREATED)

    def get(self, request):
        #not paid payout for doctor,
        if "query" in request.GET:
            query = request.GET["query"]
            queryset = DoctorProfileModel.objects.filter(name__icontains=query)
        else:
            queryset = DoctorProfileModel.objects.all().order_by('id')
        response = []
        for doctor in queryset:
            last_payout = DoctorPayoutModel.objects.filter(doctor=doctor.doctor, paid=False)
            if(last_payout.exists()):
                payment_details = DoctorPaymentDetailsModel.objects.get(doctor=doctor.doctor)
                print(payment_details)
                # print(last_payout)
                res = {
                    "payout_id": last_payout[0].id,
                    "doctor_name": doctor.name,
                    "last_payout_date": last_payout[0].date_last_accessed,
                    "amount": last_payout[0].amount,
                    "payment_details": payment_details.upiId
                }
                response.append(res)
        return Response(response, status=status.HTTP_200_OK)





