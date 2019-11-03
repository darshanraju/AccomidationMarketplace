from rest_framework import generics, permissions, mixins
from rest_framework.response import Response
from .models import Property
from booking.models import Booking
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

class GetSearchResultsAPI(generics.GenericAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    #def get_queryset(self):

    def get(self, request):
        results = Property.objects.all()
        suburb = request.GET.get('suburb')
        if suburb != None :
            results = results.filter(suburb = suburb)
        post_code = request.GET.get("post_code")
        if  post_code != None :
            results = results.filter(postcode = post_code)
        price = request.GET.get("price")
        if price != None :
            results = results.filter(price__lte = price)
        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')
        if start_date != None and end_date!= None:
            propertiesNotAvaliable = Booking.objects.filter(checkin__lte = end_date, checkout__gte = start_date).values_list('property_id', flat=True).distinct()
            results = results.exclude(id__in = propertiesNotAvaliable)

        resp = {}
        i = 1
        for prop in results:
            resp[str(i)] = PropertySerializer(prop, context=self.get_serializer_context()).data
            i += 1
        return Response(resp)
