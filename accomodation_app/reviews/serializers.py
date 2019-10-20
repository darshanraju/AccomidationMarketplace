from rest_framework import serializers
from rest_framework import serializers
from .models import Review_property, Review_user

# somthing to serialize the returning of a review 
class ReviewPropertySerializer(serializers.ModelSerializer):
	class Meta:
		model = Review_property
		fields = '__all__'
		lookup_field = 'booking_id'

	# Method For updating the Review Properties serialiser, onlay can update 2 feilds 
	def update(self, instance, validate_data):
		instance.description = validate_data.get('description', instance.description)
		instance.rating = validate_data.get('rating', instance.rating)
		instance.save()
		return instance

class ReviewUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = Review_user
		fields = '__all__'
		lookup_field = 'booking_id'

	# Method For updating the Review Properties serialiser, onlay can update 2 feilds 
	def update(self, instance, validate_data):
		instance.description = validate_data.get('description', instance.description)
		instance.rating = validate_data.get('rating', instance.rating)
		instance.save()
		return instance
