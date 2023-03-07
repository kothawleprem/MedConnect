from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class PatientModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

class PatientProfileModel(models.Model):
    patient = models.ForeignKey(PatientModel, models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)

