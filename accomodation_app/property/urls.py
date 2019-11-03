from django.urls import path, include, re_path
from django.conf.urls import url
from .api import PropertyAPI, AddPropertyAPI, UpdatePropertyAPI, GetOwnerPropertyAPI, GetSearchResultsAPI


urlpatterns = [
    path('api/property/add', AddPropertyAPI.as_view()),
    url(r'^api/property/(?P<id>\d+)$', PropertyAPI.as_view(), name='Property'),
    url(r'^api/property/update/(?P<id>\d+)$', UpdatePropertyAPI.as_view()),
    url(r'^api/property/owner/(?P<owner_id>\d+)$', GetOwnerPropertyAPI.as_view()),
    re_path(r'^api/property/search/$', GetSearchResultsAPI.as_view())
    #re_path(r'^api/property/search/(?P<no_beds>\d+)$/(?P<no_guests>\d+)$/(?P<no_bathrooms>\d+)$', GetSearchResultsAPI.as_view())
    #re_path

    #       ( '^        (?P<first_name>[a-zA-Z]+)/(?P<last_name>[a-zA-Z]+)(?:/(?P<title>[a-zA-Z]+))?/$','some_method'),
    #       ( '^    (?:/(?P<title>[a-zA-Z]+))?/$','some_method'),
    #re_path(r'^view(?:/(?P<dummy>[a-zA-Z]+))?(?:/(?P<dummy2>[a-zA-Z]+))?(?:/(?P<dummy3>[a-zA-Z]+))?/$', views.MyView.as_view(), name='myname'),
]