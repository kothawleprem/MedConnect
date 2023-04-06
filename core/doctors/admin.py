from django.contrib import admin

# Register your models here.
from .models import DoctorModel, DoctorProfileModel, DoctorVerificationModel, SpecializationModel
admin.site.register(DoctorModel)
admin.site.register(DoctorProfileModel)
admin.site.register(DoctorVerificationModel)
admin.site.register(SpecializationModel)