from django.contrib import admin

# Register your models here.
from .models import DoctorModel, DoctorProfileModel
admin.site.register(DoctorModel)
admin.site.register(DoctorProfileModel)