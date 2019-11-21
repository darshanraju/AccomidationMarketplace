from rest_framework import generics, permissions, mixins
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.core import exceptions
from .models import Images
from property.models import Property
from .serializers import ImageSerializer, AddImageSerializer

class ImagesAPI(generics.RetrieveAPIView):
    queryset = Images.objects.all()
    serializer_class = ImageSerializer
    lookup_field = 'id'

    def delete(self, request, id, *args, **kwargs):
        try:
            image = Images.objects.get(id=id)
            image.delete()
        except exceptions.ObjectDoesNotExist:
            return Response(HTTP_400_BAD_REQUEST)
        return Response("Image Removed", HTTP_200_OK)

class AddImageAPI(generics.GenericAPIView):
    serializer_class = AddImageSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        prop = Property.objects.get(id=data['property_id'])
        serializer = AddImageSerializer(data=data)
        if serializer.is_valid():
            new_image = Images.objects.create(property_id=prop,
                                             url = data['url'])
            new_image.save()
            return Response(serializer.data, HTTP_200_OK)
        return Response (serializer.errors, HTTP_400_BAD_REQUEST)

class GetImagesByPropertyAPI(generics.GenericAPIView):
    def get(self, request, property_id):
        images = Images.objects.filter(property_id = property_id)
        resp = []
        for image in images:
            img = ImageSerializer(image, context=self.get_serializer_context()).data
            resp.append(img)

        return Response(resp)