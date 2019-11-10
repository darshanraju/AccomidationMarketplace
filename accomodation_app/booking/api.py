from rest_framework import generics, permissions, mixins
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from .models import Booking, Property
from .serializers import BookingSerializer, MakeBookingSerializer, UpdateBookingSerializer
from property.serializers import PropertySerializer

class BookingAPI(generics.RetrieveAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    lookup_field = 'id'

    # Does not currently authenticate user for delete
    def delete(self, request, id):
        Booking.objects.filter(id=id).delete()

        return Response ({
            "test": "hello"
        })   

class MakeBookingAPI(generics.GenericAPIView):
    """
    @description: Requires token of user making the booking
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MakeBookingSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = MakeBookingSerializer(data=data)
        prop = Property.objects.get(id=data['property_id'])
        if serializer.is_valid():
            new_booking = Booking.objects.create(user_id=request.user,
                                                 property_id=prop,
                                                 checkin=data['checkin'],
                                                 checkout=data['checkout'],
                                                 no_guests=data['no_guests'])
            new_booking.save()
            return Response(serializer.data, HTTP_200_OK)
        return Response(serializer.errors, HTTP_400_BAD_REQUEST)

class UpdateBookingAPI(generics.GenericAPIView, mixins.UpdateModelMixin):
    """
    @description: Requires token of the user with booking
    """
    permission_classes = [permissions.IsAuthenticated]

    queryset = Booking.objects.all()
    serializer_class = UpdateBookingSerializer
    lookup_field = 'id'

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
        
class GetBookingsByPropertyAPI(generics.GenericAPIView):
    """
    @description: Requires token of the property owner
    """
    permission_classes = [permissions.IsAuthenticated]

    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def get(self, request, property_id):
        bookings = Booking.objects.filter(property_id = property_id)
        resp = []
        for booking in bookings:
            resp.append(BookingSerializer(booking, context=self.get_serializer_context()).data)
        return Response(resp)

class GetBookingsByGuestAPI(generics.GenericAPIView):
    """
    @description: Requires token of the user(guest)
    """
    permission_classes = [permissions.IsAuthenticated]

    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def get(self, request, guest_id):
        bookings = Booking.objects.filter(user_id = guest_id)
        resp = []
        for booking in bookings:
            #resp.append(BookingSerializer(booking, context=self.get_serializer_context()).data)
            #print(booking.property_id)

            trip = {
                "booking": BookingSerializer(booking, context=self.get_serializer_context()).data,
                "property": PropertySerializer(booking.property_id, context=self.get_serializer_context()).data
            }
            resp.append(trip)
        return Response(resp)        
