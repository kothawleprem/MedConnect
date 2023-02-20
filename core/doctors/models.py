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
    description = models.TextField()
    title = models.CharField(max_length=255, default="0")
    reg_no = models.CharField(max_length=255, default="0")
    signature = models.URLField(null=True)
    city = models.CharField(max_length=100, null=True)
    state = models.CharField(max_length=100, null=True)
    files = models.URLField(null=True)
    video = models.URLField(null=True)
    specialization = models.CharField(max_length=255, null=True)
    qualification = models.CharField(max_length=255, null=True)
    dob = models.DateField(null=True)
    gender = models.CharField(max_length=255,null=True)
    photo = models.URLField(null=True)
    phone = models.CharField(max_length=15, null=True)
    address = models.CharField(max_length=255,null=True)
    pincode = models.CharField(max_length=20, null=True)


class DoctorAdminVerificationModel(models.Model):
    doctor = models.ForeignKey(DoctorModel, models.CASCADE)
    remarks = models.CharField(max_length=255)





