from rest_framework import generics, permissions, mixins
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from .models import Booking, Property
from reviews.models import Review_property
from .serializers import BookingSerializer, MakeBookingSerializer, UpdateBookingSerializer
from property.serializers import PropertySerializer
from authentication.serializers import UserSerializer
from reviews.serializers import ReviewPropertySerializer
import smtplib
import email.message
from datetime import datetime

class BookingAPI(generics.RetrieveAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    lookup_field = 'id'

    # Does not currently authenticate user for delete
    def delete(self, request, id):

        b = Booking.objects.get(id=id)
        email = b.property_id.owner_id.email
        msg = "booking from "+b.checkin.strftime("%Y-%m-%d")+" to "+b.checkout.strftime("%Y-%m-%d")+" for Property "+b.property_id.address+", "+b.property_id.suburb+"has been cancelled"
        EmailBot().send_email(email, "One of Your propertys Booking's has cancelled", msg)

        b.delete()

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

            email = prop.owner_id.email
            msg = "New booking from "+data['checkin']+" to "+data['checkout']+" for Property "+prop.address+", "+prop.suburb
            EmailBot().send_email(email, "One of Your property's has a Booking", msg)

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

        booking = Booking.objects.get(id=kwargs['id'])
        email = booking.property_id.owner_id.email
        msg = "there is an updated booking for Property "+booking.property_id.address+", "+booking.property_id.suburb+".\n please check the web portal for more details."
        EmailBot().send_email(email, "One of Your property's Booking's has Been updated", msg)

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
            trip = {
                "booking": BookingSerializer(booking, context=self.get_serializer_context()).data,
                "guest": UserSerializer(booking.user_id, context=self.get_serializer_context()).data
            }
            resp.append(trip)
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
            review = Review_property.objects.filter(booking_id = booking.id)
            try:
                property_review = ReviewPropertySerializer(review[0], context=self.get_serializer_context()).data
            except:
                property_review = {}

            trip = {
                "booking": BookingSerializer(booking, context=self.get_serializer_context()).data,
                "property": PropertySerializer(booking.property_id, context=self.get_serializer_context()).data,
                "review": property_review
            }
            resp.append(trip)
        return Response(resp)   

class EmailBot():
    emailAddr = 'AccomodationAppEmailBot@gmail.com' 
    emailPass = 'fG3wVWcZZXQwZAm'

    def send_email(self, recipient, subject, body):

        mailServer = smtplib.SMTP('smtp.gmail.com', 587)
        mailServer.set_debuglevel(1)
        mailServer.starttls()
        mailServer.login(self.emailAddr, self.emailPass)

        message = email.message.Message()
        message['From'] = self.emailAddr
        message['To'] = recipient
        message['Subject'] = subject
        message.set_payload(body)

        mailServer.sendmail(self.emailAddr, recipient, message.as_string())

        print("sent email")
        mailServer.quit()
