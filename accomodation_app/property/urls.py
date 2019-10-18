from django.urls import path, include
from django.conf.urls import url
from .api import PropertyAPI, AddPropertyAPI, UpdatePropertyAPI


urlpatterns = [
    path('api/property/add', AddPropertyAPI.as_view()),
    url(r'^api/property/(?P<id>\d+)$', PropertyAPI.as_view(), name='Property'),
    url(r'^api/property/update/(?P<id>\d+)$', UpdatePropertyAPI.as_view())
]