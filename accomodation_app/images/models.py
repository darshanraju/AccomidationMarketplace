from django.db import models
from property.models import Property

# Create your models here.
class Images(models.Model):
    id = models.AutoField(primary_key=True)
    property_id = models.ForeignKey(Property, on_delete=models.CASCADE)
    url = models.CharField(max_length=500)

    class Meta:
        unique_together = ('property_id', 'url')