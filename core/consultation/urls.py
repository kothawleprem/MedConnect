from django.urls import path
from .views import SlotView, SlotListView, PatienBookSlotView

urlpatterns = [
    path('slot/', SlotView.as_view(), name="slot"),
    path('slot_list/', SlotListView.as_view(), name="slot_list"),
    path('book_slot/', PatienBookSlotView.as_view(), name="Book_Slot"),
]