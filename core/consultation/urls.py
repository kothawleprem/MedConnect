from django.urls import path
from .views import SlotView, SlotListView, PatienBookSlotView, RoomView, PrescriptionView, PaymentView

urlpatterns = [
    path('slot/', SlotView.as_view(), name="slot"),
    path('slot_list/', SlotListView.as_view(), name="slot_list"),
    path('book_slot/', PatienBookSlotView.as_view(), name="Book_Slot"),
    path('room/', RoomView.as_view(), name="room"),
    path('prescription/', PrescriptionView.as_view(), name="prescription"),
    path('payments/', PaymentView.as_view(), name="payments"),
    path('managePayments/', PaymentView.as_view(), name="managePayments")
]