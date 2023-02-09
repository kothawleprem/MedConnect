from django.db import models
from doctors.models import DoctorModel
from patients.models import PatientModel
# Create your models here.

class SlotModel(models.Model):
    doctor = models.ForeignKey(DoctorModel, models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    status = models.BooleanField(default=False)
    remarks = models.TextField()

class ConsultationModel(models.Model):
    slot = models.ForeignKey(SlotModel, models.CASCADE)
    doctor = models.ForeignKey(DoctorModel, models.CASCADE)
    patient = models.ForeignKey(PatientModel, models.CASCADE)
    patient_file = models.FileField(null=True)
    room_id = models.CharField(max_length=255, null=True)
    remarks = models.TextField(null=True)

class PrescriptionModel(models.Model):
    consultation = models.ForeignKey(ConsultationModel, models.CASCADE)
    prescription_file = models.FileField(null=True)

class MedicineModel(models.Model):
    prescription = models.ForeignKey(PrescriptionModel, models.CASCADE)
    type = models.CharField(max_length=10)
    medicine = models.CharField(max_length=15)
    power = models.CharField(max_length=11)
    frequency = models.CharField(max_length=9)
    remarks = models.CharField(max_length=19)








