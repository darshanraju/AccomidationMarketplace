from django.urls import path, include
from django.conf.urls import url
from .api import BookingAPI, MakeBookingAPI, UpdateBookingAPI

urlpatterns = [
    path('api/booking/add', MakeBookingAPI.as_view()),
    url(r'^api/booking/(?P<id>\d+)$', BookingAPI.as_view()),
    url(r'^api/booking/update/(?P<id>\d+)$', UpdateBookingAPI.as_view())
]