from rest_framework import routers
from .api import SongRequestViewSet

router = routers.DefaultRouter()
router.register('api/songrequest', SongRequestViewSet, 'songrequest')

urlpatterns = router.urls