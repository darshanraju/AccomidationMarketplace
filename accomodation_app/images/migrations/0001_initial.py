# Generated by Django 2.2.7 on 2019-11-21 05:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('property', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Images',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('url', models.CharField(max_length=500)),
                ('property_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='property.Property')),
            ],
            options={
                'unique_together': {('property_id', 'url')},
            },
        ),
    ]
