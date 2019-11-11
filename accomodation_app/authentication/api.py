import json
from rest_framework import generics, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.status import HTTP_400_BAD_REQUEST
from knox.models import AuthToken
from .serializers import UserSerializer, RegistrationSerializer, LoginSerializer, UsernameSerializer, EmailSerializer

# User API
# Get user from a token
class UserAPI(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_object(self):
        return self.request.user

# Registration API
class RegistrationAPI(generics.GenericAPIView):
    serializer_class = RegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response ({
            "user": UserSerializer(user, context=self.get_serializer_context()).data
        })

# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response ({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class CheckUsernameAPI(generics.GenericAPIView):
    serializer_class = UsernameSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            user = User.objects.filter(username=data['username'])
            if user.count() == 0:
                return Response ({"username": True})
            else:
                return Response ({"username": False})
        else:
            return Response (serializer.errors, HTTP_400_BAD_REQUEST)

class CheckEmailAPI(generics.GenericAPIView):
    serializer_class = EmailSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            user = User.objects.filter(email=data['email'])
            if user.count() == 0:
                return Response ({"email": True})
            else:
                return Response ({"email": False})
        else:
            return Response (serializer.errors, HTTP_400_BAD_REQUEST)