from django.urls import path, include
from .api import AddPropertyAPI

urlpatterns = [
    path('api/property/add', AddPropertyAPI.as_view())
]