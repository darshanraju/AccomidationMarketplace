from karaoke.models import SongRequest 
from rest_framework import viewsets, permissions
from .serializers import SongRequestSerializer 

# Song Request Viewset
class SongRequestViewSet(viewsets.ModelViewSet):
    queryset = SongRequest.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SongRequestSerializer