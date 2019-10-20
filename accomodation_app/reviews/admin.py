from django.contrib import admin
from .models import Review_property, Review_user

# Register your models here.
admin.site.register(Review_property)
admin.site.register(Review_user)