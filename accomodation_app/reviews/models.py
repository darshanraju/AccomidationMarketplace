from django.db import models
from booking.models import Booking
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator

# rating validator to check if rating in in valid range 0-5
def RatingValidator(value):
	if value > 5 or value < 0:
		raise ValidationError('invalid rating, rating should be out of 5')
	return value

# property review class 
# review for properties on a particular booking 
class Review_property(models.Model):
	booking_id = models.OneToOneField(Booking, on_delete=models.CASCADE, primary_key=True)
	description = models.CharField(max_length = 200)
	rating  = models.FloatField(validators=[RatingValidator])

# might want to make the relationship 1 to 1 for review and booking 

# user review class 
# reviews for user bessed on there stay at a particulae nookinf 
class Review_user(models.Model):
	owner_id = models.ForeignKey(User, on_delete = models.CASCADE, verbose_name="owner reviewing their client")
	booking_id = models.OneToOneField(Booking, on_delete=models.CASCADE, primary_key=True)
	description = models.CharField(max_length = 200)
	rating  = models.IntegerField(validators=[RatingValidator])