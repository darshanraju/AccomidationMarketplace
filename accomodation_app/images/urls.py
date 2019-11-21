from django.urls import path, include
from django.conf.urls import url
from .api import ImagesAPI, AddImageAPI, GetImagesByPropertyAPI

urlpatterns = [
    path('api/images/add', AddImageAPI.as_view()),
    url(r'^api/images/(?P<id>\d+)$', ImagesAPI.as_view()),
    url(r'^api/images/property/(?P<property_id>\d+)$', GetImagesByPropertyAPI.as_view())
]