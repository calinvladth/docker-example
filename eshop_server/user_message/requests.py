from rest_framework import status
from rest_framework.views import APIView

from globals.decorators import check_shop
from globals.pagination import pagination
from globals.response import custom_response
from user_message.models import UserMessage
from user_message.serializers import UserMessageSerializer


class GetOrCreate(APIView):
    def get(self, request):
        try:
            # Check for shop
            shop = request.GET.get('shop')
            check_shop(shop)

            model = UserMessage.objects.filter(shop=shop).order_by('-created')
            objs, pagination_data = pagination(
                model=model,
                page=request.GET.get('page') or 1,
                admin=request.GET.get('admin') or True
            )
            return custom_response(
                message="users messages fetched",
                status=status.HTTP_200_OK,
                data=UserMessageSerializer(objs, many=True).data,
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
            obj = UserMessage.objects.create(**requests.data)
            return custom_response(
                message="user message created",
                status=status.HTTP_201_CREATED,
                data=UserMessageSerializer(obj).data
            )
        except Exception as error:
            return custom_response(
                message=str(error),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class GetByPkOrDelete(APIView):
    def get(self, requests, **kwargs):
        try:
            obj = UserMessage.objects.get(pk=kwargs['pk'])
            return custom_response(
                message="user message fetched",
                status=status.HTTP_200_OK,
                data=UserMessageSerializer(obj).data
            )
        except Exception as error:
            return custom_response(
                message=str(error),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def delete(self, requests, **kwargs):
        try:
            obj = UserMessage.objects.delete(pk=kwargs['pk'])
            return custom_response(
                message="user message deleted",
                status=status.HTTP_204_NO_CONTENT,
                data=UserMessageSerializer(obj).data
            )
        except Exception as error:
            return custom_response(
                message=str(error),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
