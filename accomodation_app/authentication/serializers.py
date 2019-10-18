from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name'
        ] 

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
            'password',        
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'], 
                                        email=validated_data['email'], 
                                        first_name=validated_data['first_name'], 
                                        last_name=validated_data['last_name'], 
                                        password=validated_data['password'])
        return user

    def validate_email(self, value):
        user = User.objects.filter(email=value)
        if not user:
            return value

        raise serializers.ValidationError("Email is already in use.")

# We don't need to use serializers.modelserializer here because we don't need to create a model
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect username and/or password")