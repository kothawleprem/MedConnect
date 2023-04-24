# Generated by Django 4.1.5 on 2023-04-23 13:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lab', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='LabVerificationModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(default='PENDING', max_length=255)),
                ('remarks', models.CharField(default='Your request has not been reviewed yet!', max_length=255)),
                ('lab', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lab.labmodel')),
            ],
        ),
        migrations.CreateModel(
            name='LabProfileModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lab', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lab.labmodel')),
            ],
        ),
    ]