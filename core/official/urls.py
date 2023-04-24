from django.urls import path

from .views import AdminDoctorVerificationListView, AdminDoctorVerificationView, LoginView, DoctorPayoutListView, \
    DoctorFormView

urlpatterns = [
    path('list_requests/', AdminDoctorVerificationListView.as_view(), name="list_requests"),
    path('doctor_request/', AdminDoctorVerificationView.as_view(), name="doctor_request"),
    path('login/', LoginView.as_view(), name="Login"),
    path('payout_list/', DoctorPayoutListView.as_view(), name="payout"),
    path('doctorForm/', DoctorFormView.as_view(), name="DoctorFormView")
]