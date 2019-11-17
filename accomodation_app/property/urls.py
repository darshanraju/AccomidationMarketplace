from django.urls import path, include, re_path
from django.conf.urls import url
from .api import PropertyAPI, AddPropertyAPI, UpdatePropertyAPI, GetOwnerPropertyAPI, GetSearchResultsAPI, GetPropertyFeatureAPI, AddPropertyFeatureAPI, GetRecordedFeatureAPI
from .api import GetPropertyBookedDatesByMonth

urlpatterns = [
    path('api/property/add', AddPropertyAPI.as_view()),
    url(r'^api/property/(?P<id>\d+)$', PropertyAPI.as_view(), name='Property'),
    url(r'^api/property/update/(?P<id>\d+)$', UpdatePropertyAPI.as_view()),
    url(r'^api/property/owner/(?P<owner_id>\d+)$', GetOwnerPropertyAPI.as_view()),
    re_path(r'^api/property/search/$', GetSearchResultsAPI.as_view()),
    url(r'^api/feature/add', AddPropertyFeatureAPI.as_view()),
    url(r'^api/feature/(?P<property_id>\d+)$', GetPropertyFeatureAPI.as_view()),
    url(r'^api/feature/all/$', GetRecordedFeatureAPI.as_view()),
    url(r'^api/booked_dates/(?P<property_id>\d+)/(?P<date>\d{4}-\d{2}-\d{2})$', GetPropertyBookedDatesByMonth.as_view())
]