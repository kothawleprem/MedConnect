from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class SpecializationModel(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class DoctorModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    isAvailable = models.BooleanField(default=False)
    instantFees = models.IntegerField(null=True)
    verified = models.BooleanField(default=False)


class DoctorProfileModel(models.Model):
    doctor = models.ForeignKey(DoctorModel, models.CASCADE)
    specialization = models.ForeignKey(SpecializationModel, models.CASCADE, null=True)
    name = models.CharField(max_length=200, default="None")
    description = models.TextField()
    title = models.CharField(max_length=255, default="0")
    reg_no = models.CharField(max_length=255, default="0")
    signature = models.URLField(null=True)
    city = models.CharField(max_length=100, null=True)
    state = models.CharField(max_length=100, null=True)
    files = models.URLField(null=True)
    video = models.URLField(null=True)
    qualification = models.CharField(max_length=255, null=True)
    dob = models.DateField(null=True)
    gender = models.CharField(max_length=255, null=True)
    photo = models.URLField(null=True)
    phone = models.CharField(max_length=15, null=True)
    address = models.CharField(max_length=255, null=True)
    pincode = models.CharField(max_length=20, null=True)


class VerificationStatusModel(models.Model):
    status = models.CharField(max_length=255, default='PENDING')


class DoctorVerificationModel(models.Model):
    doctor = models.ForeignKey(DoctorModel, models.CASCADE)
    status = models.CharField(max_length=255, default='PENDING')
    remarks = models.CharField(max_length=255, default="Your request has not been reviewed yet!")

class DoctorPaymentDetailsModel(models.Model):
    doctor = models.ForeignKey(DoctorModel, models.CASCADE)
    upiId = models.CharField(max_length=255)

class DoctorPayoutModel(models.Model):
    doctor = models.ForeignKey(DoctorModel, models.CASCADE)
    amount = models.IntegerField()
    date_last_accessed = models.DateField(auto_now=True)
    transaction_id = models.CharField(max_length=255, null=True)
    paid = models.BooleanField(default=False)
