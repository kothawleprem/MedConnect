from django.contrib import admin
from .models import PatientModel, PatientProfileModel

admin.site.register(PatientModel)
admin.site.register(PatientProfileModel)