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
        exclude = ['id', 'user_id']

    def validate_date(self, value):
        checkin = self.get_initial().get("checkin")
        checkout = self.get_initial().get("checkout")

        print('Printing ------')
        print(checkin)
        print(checkout)
        if checkout < checkin:
            raise serializers.ValidationError("Check-in date must be on or before check-out")

class UpdateBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        exclude = ['id', 'user_id', 'property_id']