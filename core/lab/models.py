from django.db import models
from django.contrib.auth.models import User
from patients.models import PatientModel

class LabModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    verified = models.BooleanField(default=False)

class LabVerificationModel(models.Model):
    lab = models.ForeignKey(LabModel, models.CASCADE)
    status = models.CharField(max_length=255, default='PENDING')
    remarks = models.CharField(max_length=255, default="Your request has not been reviewed yet!")

class LabProfileModel(models.Model):
    lab = models.ForeignKey(LabModel, models.CASCADE)
    name = models.CharField(max_length=200, default="None")
    description = models.TextField(null=True)
    reg_no = models.CharField(max_length=255, default="0")
    city = models.CharField(max_length=100, null=True)
    state = models.CharField(max_length=100, null=True)
    files = models.URLField(null=True)
    phone = models.CharField(max_length=15, null=True)
    address = models.CharField(max_length=255, null=True)
    pincode = models.CharField(max_length=20, null=True)

class PackageModel(models.Model):
    lab = models.ForeignKey(LabModel, models.CASCADE)
    name = models.CharField(max_length=200, default="None")
    description = models.TextField(null=True)
    price = models.IntegerField()
    no_tests = models.IntegerField(default=1)
    isAvailable = models.BooleanField(default=True)

class AppointmentModel(models.Model):
    stripe_id = models.CharField(max_length=255)
    package = models.ForeignKey(PackageModel, models.CASCADE)
    patient = models.ForeignKey(PatientModel, models.CASCADE)
    report = models.URLField(null=True)
    payment_completed = models.BooleanField(default=False)
    completed = models.BooleanField(default=False)
    canceled = models.BooleanField(default=False)

class LabPayoutModel(models.Model):
    lab = models.ForeignKey(LabModel, models.CASCADE)
    amount = models.IntegerField(default=0)
    date_last_accessed = models.DateField(auto_now=True)
    transaction_id = models.CharField(max_length=255, null=True)
    paid = models.BooleanField(default=False)