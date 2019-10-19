from rest_framework import serializers
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        lookup_field = 'id'

class MakeBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        exclude = ['id']
    
    def create(self, validated_data):
        booking = Booking.objects.create(user_id=validated_data['user_id'],
                                         property_id=validated_data['property_id'],
                                         checkin=validated_data['checkin'],
                                         checkout=validated_data['checkout'])
        return booking