# Generated by Django 2.2.5 on 2019-10-16 08:51

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import property.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('house_no', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('street_name', models.CharField(max_length=150)),
                ('suburb', models.CharField(max_length=50)),
                ('postcode', models.IntegerField(validators=[property.models.valid_postcode])),
                ('price', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('no_guests', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('no_beds', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('no_bathrooms', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('owner_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('house_no', 'street_name', 'suburb')},
            },
        ),
    ]
