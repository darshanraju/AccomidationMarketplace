from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from .models import Property

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'

class AddPropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        exclude = ['id']
        validators = [
            UniqueTogetherValidator(
                queryset=Property.objects.all(),
                fields=['address', 'suburb'],
                message='Address has already been listed.'
            )
        ]

    def create(self, validated_data):
        prop = Property.objects.create(owner_id=validated_data['owner_id'],
                                           address=validated_data['address'],
                                           suburb=validated_data['suburb'],
                                           postcode=validated_data['postcode'],
                                           price=validated_data['price'],
                                           no_guests=validated_data['no_guests'],
                                           no_beds=validated_data['no_beds'],
                                           no_bathrooms=validated_data['no_bathrooms'])
        return prop