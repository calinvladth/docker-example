import json

from rest_framework.views import APIView
from rest_framework import status

from globals.decorators import check_shop
from globals.response import custom_response
from accounts.models import Account


class CheckServerStatus(APIView):
    def get(self, request):
        return custom_response(
            status=status.HTTP_200_OK,
            message='Server is on'
        )

class CheckShop(APIView):
    def post(self, request):
        shop = request.GET.get('shop')
        try:
            obj = check_shop(shop)
            return custom_response(
                status=status.HTTP_200_OK,
                message='Store OK',
                data=obj
            )
        except Exception as e:
            return custom_response(
                status=status.HTTP_400_BAD_REQUEST,
                message=str(e)
            )


class CheckRegister(APIView):
    def get(self, request):
        obj = Account.objects.filter(is_admin=True)
        allow = obj.count() < 1

        return custom_response(
            status=status.HTTP_200_OK,
            message=f'{"ALLOWED" if allow else "NOT ALLOWED"}',
            data={
                'register': allow
            }
        )
