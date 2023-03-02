from django.urls import path

from .views import EmailView, VerifyEmailView, DoctorProfileView, DoctorRequestVerificationView

urlpatterns = [
    path('email/', EmailView.as_view(), name="email"),
    path('verify_email/', VerifyEmailView.as_view(), name="verify_email"),
    path('profile/', DoctorProfileView.as_view(), name="profile"),
    path('request_verification/', DoctorRequestVerificationView.as_view(), name="request_verification"),
    path('request_status/', DoctorRequestVerificationView.as_view(), name="request_verification"),
]