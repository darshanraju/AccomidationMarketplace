# Generated by Django 2.2.7 on 2019-11-11 23:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('property', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Feature',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=150)),
                ('property_id', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='property.Property')),
            ],
        ),
    ]