from rest_framework import generics, permissions, mixins
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from .models import Property
from booking.models import Booking
from .serializers import PropertySerializer, AddPropertySerializer, UpdatePropertySerializer

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
    """
    @description: Requires token
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AddPropertySerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = AddPropertySerializer(data=data)
        if serializer.is_valid():
            new_property = Property.objects.create(owner_id=request.user,
                                  address=data['address'],
                                  suburb=data['suburb'],
                                  postcode=data['postcode'],
                                  price=data['price'],
                                  no_guests=data['no_guests'],
                                  no_beds=data['no_beds'],
                                  no_bathrooms=data['no_bathrooms'])
            new_property.save()
            return Response (serializer.data, HTTP_200_OK)
        return Response (serializer.errors, HTTP_400_BAD_REQUEST)

class UpdatePropertyAPI(generics.GenericAPIView, mixins.UpdateModelMixin):
    """
    @description: Requires token of the owner
    """
    permission_classes = [permissions.IsAuthenticated]

    queryset = Property.objects.all()
    serializer_class = UpdatePropertySerializer
    lookup_field = 'id'

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

class GetOwnerPropertyAPI(generics.GenericAPIView):
    """
    @description: Requires token of the owner
    """
    permission_classes = [permissions.IsAuthenticated]

    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    def get(self, request, owner_id):
        properties = Property.objects.filter(owner_id = owner_id)
        resp = []
        for prop in properties:
            resp.append(PropertySerializer(prop, context=self.get_serializer_context()).data)
        return Response(resp)

class GetSearchResultsAPI(generics.GenericAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    # Get Search Request: url = http://127.0.0.1:8000/api/property/search/?guests=3
    # Filters are passed in through the get request querry string. 
    # The surch functionality suported are:
    # - suburb
    # - post-code
    # - price -- filter by the maxinum price 
    # - check-in 
    # - check-out
    # - guests -- filter by the min number 
    # - beds -- filter by the min number 
    # - bathrooms -- filter by the min number 
    # Note that both check-in and checkout must be present for the result to be filtered on them. 
    # The results will be order by price (accending)
    # Any combination of filteres can be passed in, including None. 
    # NOTE : this will not send an error if you type in a invalid filter name.
    def get(self, request):
        results = Property.objects.all()

        # filter resuts by suburb
        suburb = request.GET.get('suburb')
        if suburb != None :
            results = results.filter(suburb = suburb)

        # filter results by a specific post_code 
        post_code = request.GET.get("post-code")
        if  post_code != None :
            results = results.filter(postcode = post_code)

        # filter results for properties bellow a specified price 
        price = request.GET.get("price")
        if price != None :
            results = results.filter(price__lte = price)

        #filter by at least #guests 
        no_guests = request.GET.get("guests")
        if no_guests != None :
            results = results.filter(no_guests__gte = no_guests)

        #filter by at least #rooms
        no_beds = request.GET.get("beds")
        if no_beds != None :
            results = results.filter(no_beds__gte = no_beds)

        #filter by #bathrooms
        no_bathrooms = request.GET.get("bathrooms")
        if no_bathrooms != None :
            results = results.filter(no_bathrooms__gte = no_bathrooms)

        #TODO filter by additional features as they are added. 

        # filter results by propeties avaliable from check-in and check-out dates. 
        start_date = request.GET.get('check-in')
        end_date = request.GET.get('check-out')
        if start_date != None and end_date!= None:
            propertiesNotAvaliable = Booking.objects.filter(property_id__in = results.values_list('id', flat=True), checkin__lte = end_date, checkout__gte = start_date).values_list('property_id', flat=True).distinct()
            results = results.exclude(id__in = propertiesNotAvaliable);

        # format resposnce and sort by price 
        resp = []
        for prop in results.order_by('price'):
            resp.append(PropertySerializer(prop, context=self.get_serializer_context()).data)
        return Response(resp)
