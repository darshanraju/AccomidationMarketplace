# Generated by Django 2.2.7 on 2019-11-22 05:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('property', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('checkin', models.DateField()),
                ('checkout', models.DateField()),
                ('no_guests', models.IntegerField()),
                ('property_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='property.Property')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
