import json

from rest_framework import status
from rest_framework.views import APIView

from globals.response import custom_response


class GetForStore(APIView):
    def get(self, request):
        try:
            file = open('config/file.json')
            obj = json.load(file)

            data = {
                "pagination": {
                    "items_store": obj['pagination']['items_store']
                },
                "payment": {
                    "stripe_public": obj['payment']['stripe_public'],
                    "currency": obj['payment']['currency']
                }
            }

            return custom_response(
                message='Configurations fetched',
                status=status.HTTP_202_ACCEPTED,
                data=data
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_400_BAD_REQUEST
            )


class GetOrEdit(APIView):
    def get(self, request):
        try:
            file = open('config/file.json')
            obj = json.load(file)

            return custom_response(
                message='Configurations fetched',
                status=status.HTTP_202_ACCEPTED,
                data=obj
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_400_BAD_REQUEST
            )

    def put(self, request, **kwargs):
        try:
            file = open('config/file.json')
            obj = json.load(file)

            taxes = request.data.get('taxes')
            payment = request.data.get('payment')
            pagination = request.data.get('pagination')

            if taxes:
                taxes['shipping'] = int(taxes['shipping'])
                taxes['free_shipping_over'] = int(taxes['free_shipping_over'])
                obj['taxes'] = taxes

            if payment:
                obj['payment'] = payment

            if pagination:
                pagination['items_store'] = int(pagination['items_store'])
                pagination['items_admin'] = int(pagination['items_admin'])
                obj['pagination'] = pagination

            with open("config/file.json", "w") as f:
                f.write(json.dumps(obj, indent=4))

            return custom_response(
                message='Configuration edited',
                status=status.HTTP_202_ACCEPTED,
                data=obj
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_400_BAD_REQUEST
            )
