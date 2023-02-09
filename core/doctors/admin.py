from django.contrib import admin

# Register your models here.
from .models import DoctorModel, DoctorProfileModel, DoctorAdminVerificationModel
admin.site.register(DoctorModel)
admin.site.register(DoctorProfileModel)
admin.site.register(DoctorAdminVerificationModel)