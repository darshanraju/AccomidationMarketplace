from rest_framework import generics, permissions, mixins
from rest_framework.response import Response
from .models import Booking
from .serializers import BookingSerializer, MakeBookingSerializer

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
    serializer_class = MakeBookingSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = MakeBookingSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        booking = serializer.save()
        return Response ({
            "booking": MakeBookingSerializer(booking, context=self.get_serializer_context()).data
        })

class UpdateBookingAPI(generics.GenericAPIView, mixins.UpdateModelMixin):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    lookup_field = 'id'

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
        
class GetAllBookingsAPI(generics.GenericAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def get(self, request, property_id):
        bookings = Booking.objects.filter(property_id = property_id)
        resp = {}
        i = 1
        for booking in bookings:
            resp[str(i)] = BookingSerializer(booking, context=self.get_serializer_context()).data
            i += 1
        return Response(resp)
