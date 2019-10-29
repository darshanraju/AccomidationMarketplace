from django.urls import path, include
from django.conf.urls import url
from .api import BookingAPI, MakeBookingAPI, UpdateBookingAPI, GetBookingsByPropertyAPI, GetBookingsByGuestAPI

urlpatterns = [
    path('api/booking/add', MakeBookingAPI.as_view()),
    url(r'^api/booking/(?P<id>\d+)$', BookingAPI.as_view()),
    url(r'^api/booking/update/(?P<id>\d+)$', UpdateBookingAPI.as_view()),
    url(r'^api/booking/property/(?P<property_id>\d+)$', GetBookingsByPropertyAPI.as_view()),
    url(r'^api/booking/guest/(?P<guest_id>\d+)$', GetBookingsByGuestAPI.as_view())
]
