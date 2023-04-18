from django.urls import path
from .views import SlotView, SlotListView, PatienBookSlotView, RoomView, PrescriptionView, PaymentView, ManagePaymentView,DoctorPatientView, ConsultiationView, ConsultationRemarksView, ConfirmPaymentView

urlpatterns = [
    path('slot/', SlotView.as_view(), name="slot"),
    path('slot_list/', SlotListView.as_view(), name="slot_list"),
    path('book_slot/', PatienBookSlotView.as_view(), name="Book_Slot"),
    path('room/', RoomView.as_view(), name="room"),
    path('prescription/', PrescriptionView.as_view(), name="prescription"),
    path('payments/', PaymentView.as_view(), name="payments"),
    path('managePayments/', ManagePaymentView.as_view(), name="managePayments"),
    path('patients/', DoctorPatientView.as_view(), name="patients"),
    path('view/', ConsultiationView.as_view(), name="view"),
    path('consultation_remarks/', ConsultationRemarksView.as_view(), name="consultation_remarks"),
    path('confirm_payment/', ConfirmPaymentView.as_view(), name="confirm_payment")
]