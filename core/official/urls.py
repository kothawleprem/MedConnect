from django.urls import path

from .views import AdminDoctorVerificationListView, AdminDoctorVerificationView

urlpatterns = [
    path('list_requests/', AdminDoctorVerificationListView.as_view(), name="list_requests"),
    path('doctor_request/', AdminDoctorVerificationView.as_view(), name="doctor_request"),
]