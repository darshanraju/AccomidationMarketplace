from rest_framework import generics, permissions, mixins
from rest_framework.response import Response
from .models import Review_property, Review_user
from .serializers import ReviewPropertySerializer, ReviewUserSerializer

class ReviewPropertyAPI(generics.RetrieveAPIView):
    queryset = Review_property.objects.all()
    serializer_class = ReviewPropertySerializer
    lookup_field = 'booking_id'

    def delete(self, request, booking_id):
        Review_property.objects.filter(booking_id=booking_id).delete()

        return Response ({
            "test": "hello"
        })   

class MakeReviewPropertyAPI(generics.GenericAPIView):
    serializer_class = ReviewPropertySerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = ReviewPropertySerializer(data=data)
        serializer.is_valid(raise_exception=True)
        review_property = serializer.save()
        return Response ({
            "Added": ReviewPropertySerializer(review_property, context=self.get_serializer_context()).data
        })

class UpdateReviewPropertyAPI(generics.GenericAPIView, mixins.UpdateModelMixin):
    queryset = Review_property.objects.all()
    serializer_class = ReviewPropertySerializer
    lookup_field = 'booking_id'

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class ReviewUserAPI(generics.RetrieveAPIView):
    queryset = Review_user.objects.all()
    serializer_class = ReviewUserSerializer
    lookup_field = 'booking_id'

    def delete(self, request, booking_id):
        review = Review_user.objects.filter(booking_id=booking_id)
        review.delete()

        return Response ({
            "test": "hello"
        })   

class MakeReviewUserAPI(generics.GenericAPIView):
    serializer_class = ReviewUserSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = ReviewUserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        review_user = serializer.save()
        return Response ({
            "Review_user": ReviewUserSerializer(review_user, context=self.get_serializer_context()).data
        })

class UpdateReviewUserAPI(generics.GenericAPIView, mixins.UpdateModelMixin):
    queryset = Review_user.objects.all()
    serializer_class = ReviewUserSerializer
    lookup_field = 'booking_id'

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

