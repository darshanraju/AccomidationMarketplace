from django.urls import path, include
from django.conf.urls import url
from .api import ReviewPropertyAPI, MakeReviewPropertyAPI, UpdateReviewPropertyAPI, ReviewUserAPI, MakeReviewUserAPI, UpdateReviewUserAPI

urlpatterns = [
    path('api/review/property/add', MakeReviewPropertyAPI.as_view()),
    url(r'^api/review/property/(?P<booking_id>\d+)$', ReviewPropertyAPI.as_view()),
    url(r'^api/review/property/update/(?P<booking_id>\d+)$', UpdateReviewPropertyAPI.as_view()),
    path('api/review/user/add', MakeReviewUserAPI.as_view()),
    url(r'^api/review/user/(?P<booking_id>\d+)$', ReviewUserAPI.as_view()),
    url(r'^api/review/user/update/(?P<booking_id>\d+)$', UpdateReviewUserAPI.as_view())
]