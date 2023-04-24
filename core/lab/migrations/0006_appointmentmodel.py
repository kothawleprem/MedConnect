# Generated by Django 4.1.5 on 2023-04-23 22:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0001_initial'),
        ('lab', '0005_packagemodel_isavailable'),
    ]

    operations = [
        migrations.CreateModel(
            name='AppointmentModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('report', models.URLField(null=True)),
                ('payment_completed', models.BooleanField(default=False)),
                ('completed', models.BooleanField(default=False)),
                ('canceled', models.BooleanField(default=False)),
                ('package', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lab.packagemodel')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='patients.patientmodel')),
            ],
        ),
    ]
