from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Property
from .serializers import PropertySerializer, AddPropertySerializer

class PropertyAPI(generics.RetrieveAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    lookup_field = 'id'

    # Does not currently authenticate user for delete
    def delete(self, request, id):
        Property.objects.filter(id=id).delete()

        return Response ({
            "test": "hello"
        })   

class AddPropertyAPI(generics.GenericAPIView):
    serializer_class = AddPropertySerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = AddPropertySerializer(data=data)
        serializer.is_valid(raise_exception=True)
        prop = serializer.save()
        return Response ({
            "property": PropertySerializer(prop, context=self.get_serializer_context()).data
        })