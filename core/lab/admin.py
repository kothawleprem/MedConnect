from django.contrib import admin

from .models import LabModel, LabProfileModel, LabVerificationModel, PackageModel, AppointmentModel

# Register your models here.
admin.site.register(LabModel)
admin.site.register(LabProfileModel)
admin.site.register(LabVerificationModel)
admin.site.register(PackageModel)
admin.site.register(AppointmentModel)