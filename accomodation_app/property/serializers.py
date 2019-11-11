from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from .models import Property, Feature

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'
        lookup_field = 'id'

class AddPropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        exclude = ['id', 'owner_id']
        validators = [
            UniqueTogetherValidator(
                queryset=Property.objects.all(),
                fields=['address', 'suburb'],
                message='Address has already been listed.'
            )
        ]

class UpdatePropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        exclude = ['id', 'owner_id']

class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        exclude = ['id']