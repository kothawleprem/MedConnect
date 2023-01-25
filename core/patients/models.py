from django.db import models

# Create your models here.
class PatientModel(models.Model):
    email = models.EmailField()
    otp = models.IntegerField(null=True)
    token = models.CharField(max_length=255, null=True)
