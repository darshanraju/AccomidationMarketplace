from rest_framework import serializers
from karaoke.models import SongRequest

# Song Request Serializer
class SongRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SongRequest
        fields = '__all__'