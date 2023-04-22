from django.contrib import admin

# Register your models here.
from .models import DoctorModel, DoctorProfileModel, DoctorVerificationModel, SpecializationModel, VerificationStatusModel, DoctorPaymentDetailsModel, DoctorPayoutModel
admin.site.register(DoctorModel)
admin.site.register(DoctorProfileModel)
admin.site.register(DoctorVerificationModel)
admin.site.register(SpecializationModel)
admin.site.register(VerificationStatusModel)
admin.site.register(DoctorPaymentDetailsModel)
admin.site.register(DoctorPayoutModel)