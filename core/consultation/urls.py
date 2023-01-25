from django.urls import path


urlpatterns = [
    path('email/', EmailView.as_view(), name="email"),
    path('verify_email/', VerifyEmailView.as_view(), name="verify_email"),
    path('profile/', DoctorProfileView.as_view(), name="profile"),
    path('request_verification/', DoctorRequestVerificationView.as_view(), name="request_verification"),
]