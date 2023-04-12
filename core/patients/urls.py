from django.urls import path
from .views import EmailView, VerifyEmailView, DoctorSearchView, DoctorsBySpecializationView, DoctorProfileView, DoctorSlotView

urlpatterns = [
    path('email/', EmailView.as_view(), name="email"),
    path('verify_email/', VerifyEmailView.as_view(), name="verify_email"),
    path('search/', DoctorSearchView.as_view(), name="doctor_search"),
    path('by_specialization', DoctorsBySpecializationView.as_view(), name="by_specialization"),
    path('doctor_profile', DoctorProfileView.as_view(), name="doctor_profile"),
]