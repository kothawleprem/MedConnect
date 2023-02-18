from django.db import models

# Create your models here.

class DoctorModel(models.Model):
    email = models.EmailField()
    otp = models.IntegerField(null=True)
    token = models.CharField(max_length=255, null=True)
    verified = models.BooleanField(default=False)

class DoctorProfileModel(models.Model):
    doctor = models.ForeignKey(DoctorModel, models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    title = models.CharField(max_length=255, default="0")
    reg_no = models.CharField(max_length=255, default="0")
    signature = models.FileField(null=True)
    city = models.CharField(max_length=100)
    files = models.FileField(null=True)
    link = models.URLField(null=True)

class DoctorAdminVerificationModel(models.Model):
    doctor = models.ForeignKey(DoctorModel, models.CASCADE)
    remarks = models.CharField(max_length=255)





