from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from property.models import Property

# Create your models here.
class Booking(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    property_id = models.ForeignKey(Property, on_delete=models.CASCADE)
    checkin = models.DateField()
    checkout = models.DateField()