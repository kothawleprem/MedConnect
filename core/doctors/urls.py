from django.urls import path

from .views import EmailView, VerifyEmailView, DoctorProfileView, DoctorRequestVerificationView, DoctorSetAvailabilityView, DoctorVPAView, DoctorReceivedPaymentsView, DoctorIndividualPayoutListView, InstantFees

urlpatterns = [
    path('email/', EmailView.as_view(), name="email"),
    path('verify_email/', VerifyEmailView.as_view(), name="verify_email"),
    path('profile/', DoctorProfileView.as_view(), name="profile"),
    path('request_verification/', DoctorRequestVerificationView.as_view(), name="request_verification"),
    path('availability/', DoctorSetAvailabilityView.as_view(), name="availability"),
    path('vpa/', DoctorVPAView.as_view(), name="vpa"),
    path('received_payments/', DoctorReceivedPaymentsView.as_view(), name="received_payments"),
    path("doctor_payouts_list/", DoctorIndividualPayoutListView.as_view(), name="doctor_payouts"),
    path("instantFees/", InstantFees.as_view(), name="instantFees")
]