from rest_framework import generics, permissions, mixins
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

class UpdatePropertyAPI(generics.GenericAPIView, mixins.UpdateModelMixin):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    lookup_field = 'id'

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

class GetOwnerPropertyAPI(generics.GenericAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    def get(self, request, owner_id):
        properties = Property.objects.filter(owner_id = owner_id)
        resp = {}
        i = 1
        for prop in properties:
            resp[str(i)] = PropertySerializer(prop, context=self.get_serializer_context()).data
            i += 1
        return Response(resp)