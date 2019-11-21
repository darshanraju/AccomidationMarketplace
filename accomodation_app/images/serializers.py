from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from .models import Images

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = '__all__'
        lookup_field = 'id'

class AddImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        exclude = ['id']
