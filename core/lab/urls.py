from django.urls import path

from .views import EmailView, VerifyEmailView, LabProfileView, LabRequestVerificationView, PackageView

urlpatterns = [
    path('email/', EmailView.as_view(), name="email"),
    path("verify/", VerifyEmailView.as_view(), name="verify"),
    path('profile/', LabProfileView.as_view(), name="profile"),
    path('request_verification/', LabRequestVerificationView.as_view(), name="request_verification"),
    path('package/', PackageView.as_view(), name="package")
]