from django.db import models

class SongRequest(models.Model):
    song = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)