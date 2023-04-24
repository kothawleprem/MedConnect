from django.urls import path

from .views import EmailView, VerifyEmailView, LabProfileView, LabRequestVerificationView, PackageView, LabsView, \
    LabsPackageView, LabPaymentView, LabConfirmPaymentView, LabAppointmentsView, LabDashPayments

urlpatterns = [
    path('email/', EmailView.as_view(), name="email"),
    path("verify/", VerifyEmailView.as_view(), name="verify"),
    path('profile/', LabProfileView.as_view(), name="profile"),
    path('request_verification/', LabRequestVerificationView.as_view(), name="request_verification"),
    path('view_labs/', LabsView.as_view(), name="labs_view"),
    path('package/', PackageView.as_view(), name="package"),
    path('labs_package/', LabsPackageView.as_view(),name="lab_package"),
    path('payments/', LabPaymentView.as_view(), name="payments"),
    path('lab_confirm_payment/', LabConfirmPaymentView.as_view(), name="lab_confirm_payment"),
    path('lab_appointments/', LabAppointmentsView.as_view(), name="lab_appointments"),
    path('received_payments/', LabDashPayments.as_view(), name="received_payments"),
]