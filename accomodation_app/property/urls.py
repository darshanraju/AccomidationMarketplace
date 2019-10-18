from django.urls import path, include
from django.conf.urls import url
from .api import PropertyAPI, AddPropertyAPI


urlpatterns = [
    path('api/property/add', AddPropertyAPI.as_view()),
    url(r'^api/property/(?P<id>\d+)$', PropertyAPI.as_view(), name='Property')
]