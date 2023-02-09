from django.db import models

# Create your models here.
class PatientModel(models.Model):
    email = models.EmailField()
    otp = models.IntegerField(null=True)
    token = models.CharField(max_length=255, null=True)

class PatientProfileModel(models.Model):
    patient = models.ForeignKey(PatientModel, models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)

