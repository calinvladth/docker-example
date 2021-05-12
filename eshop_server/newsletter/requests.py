from rest_framework.views import APIView
from rest_framework import status

from globals.decorators import check_shop
from globals.pagination import pagination
from globals.response import custom_response
from newsletter.models import Newsletter
from newsletter.serializer import NewsletterSerializer


class GetOrCreate(APIView):
    def get(self, request):
        try:
            # Check for shop
            shop = request.GET.get('shop')
            check_shop(shop)

            model = Newsletter.objects.filter(shop=shop).order_by('-created')
            objs, pagination_data = pagination(
                model=model,
                page=request.GET.get('page') or 1,
                admin=request.GET.get('admin') or True
            )

            return custom_response(
                message="emails fetched",
                status=status.HTTP_200_OK,
                data=NewsletterSerializer(objs, many=True).data,
                pagination=pagination_data,
                filters={}
            )
        except Exception as error:
            return custom_response(
                message=str(error),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def post(self, requests):
        try:
            obj = Newsletter.objects.create(**requests.data)
            return custom_response(
                message="Email sent",
                status=status.HTTP_201_CREATED,
                data=NewsletterSerializer(obj).data
            )
        except Exception as error:
            return custom_response(
                message=str(error),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class Delete(APIView):
    def delete(self, requests, **kwargs):
        try:
            obj = Newsletter.objects.delete(pk=kwargs['pk'])
            return custom_response(
                message="newsletter email unsubscribed",
                status=status.HTTP_204_NO_CONTENT,
                data=NewsletterSerializer(obj).data
            )
        except Exception as error:
            return custom_response(
                message=str(error),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
