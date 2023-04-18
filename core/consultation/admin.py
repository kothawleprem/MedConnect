from django.contrib import admin
from .models import SlotModel, ConsultationModel, PrescriptionModel, PaymentModel
# Register your models here.
admin.site.register(SlotModel)
admin.site.register(ConsultationModel)
admin.site.register(PrescriptionModel)
admin.site.register(PaymentModel)