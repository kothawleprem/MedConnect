from django.urls import path
from .views import SlotView

urlpatterns = [
    path('slot/', SlotView.as_view(), name="slot"),
]