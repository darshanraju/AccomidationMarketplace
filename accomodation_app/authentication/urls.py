from django.urls import path, include
from .api import RegistrationAPI, LoginAPI, UserAPI, CheckUsernameAPI, CheckEmailAPI
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/register', RegistrationAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/auth/username', CheckUsernameAPI.as_view()),
    path('api/auth/email', CheckEmailAPI.as_view())
]