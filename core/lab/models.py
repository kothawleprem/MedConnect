from django.db import models
from django.contrib.auth.models import User

class LabModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    verified = models.BooleanField(default=False)

class LabProfileModel(models.Model):
    lab = models.ForeignKey(LabModel, models.CASCADE)

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
