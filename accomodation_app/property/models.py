from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator

# valid postcodes for NSW are between 2000 and 2999
def valid_postcode(value):
    if value < 2000 or value > 2999:
        raise ValidationError('Not a valid NSW postcode, must be between 2000 and 2999')

def unique_error_message(self, Property, unique_check):
    error = super().unique_error_message(Property, unique_check)
    # Intercept the unique_together error
    if len(unique_check) != 1:
        error.message = 'Your custom message'
    return error

# Create your models here.
class Property(models.Model):
    id = models.AutoField(primary_key=True)
    owner_id = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.CharField(max_length = 150)
    suburb = models.CharField(max_length = 50)
    postcode = models.IntegerField(validators=[valid_postcode])
    price = models.IntegerField(validators=[MinValueValidator(1)])
    no_guests = models.IntegerField(validators=[MinValueValidator(1)])
    no_beds = models.IntegerField(validators=[MinValueValidator(1)])
    no_bathrooms = models.IntegerField(validators=[MinValueValidator(1)])  