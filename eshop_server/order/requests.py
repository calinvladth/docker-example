from rest_framework import status
from rest_framework.views import APIView

from globals.decorators import check_shop
from globals.pagination import pagination
from globals.response import custom_response
from order.models import Order
from order.serializer import OrderSerializer


class GetOrCreateOrder(APIView):
    def get(self, request):
        try:
            # Check for shop
            shop = request.GET.get('shop')
            check_shop(shop)

            model = Order.objects.filter(shop=shop).order_by('-created')
            objs, pagination_data = pagination(
                model=model,
                page=request.GET.get('page') or 1,
                admin=request.GET.get('admin') or True
            )
            return custom_response(
                message="orders fetched",
                status=status.HTTP_200_OK,
                data=OrderSerializer(objs, many=True).data,
                pagination=pagination_data,
                filters={}
            )
        except Exception as error:
            return custom_response(
                message=str(error),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def post(self, request):
        try:
            product = Order.objects.create(**request.data)

            return custom_response(
                message='Product created',
                data=OrderSerializer(product).data,
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class GetEditOrRemove(APIView):
    def get(self, request, **kwargs):
        try:
            obj = Order.objects.get(pk=kwargs['pk'])

            return custom_response(
                message='Order fetched',
                data=OrderSerializer(obj).data,
                status=status.HTTP_200_OK
            )

        except Exception as error:
            return custom_response(
                message=str(error),
                status=status.HTTP_400_BAD_REQUEST
            )

    def put(self, request, **kwargs):
        try:
            print(request.data.get('id'))
            obj = Order.objects.edit(pk=request.data['id'], **request.data)

            return custom_response(
                message='Order edited',
                status=status.HTTP_200_OK,
                data=OrderSerializer(obj).data
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_400_BAD_REQUEST
            )

    def delete(self, request, **kwargs):
        try:
            obj = Order.objects.delete(pk=kwargs['pk'])

            return custom_response(
                message='Product edited successfully',
                status=status.HTTP_204_NO_CONTENT,
                data=OrderSerializer(obj).data
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_400_BAD_REQUEST
            )


class ProcessOrder(APIView):
    def post(self, request, **kwargs):
        try:
            obj = Order.objects.get(pk=kwargs['pk'])
            obj.processed = not obj.processed
            obj.save()

            return custom_response(
                message=f'Order {"processed" if obj.processed else "unprocessed"}',
                status=status.HTTP_202_ACCEPTED,
                data=OrderSerializer(obj).data
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_400_BAD_REQUEST
            )


class CancelOrder(APIView):
    def post(self, request, **kwargs):
        try:
            obj = Order.objects.get(pk=kwargs['pk'])
            obj.canceled = not obj.canceled
            obj.save()

            return custom_response(
                message=f'Order {"canceled" if obj.canceled else "uncanceled"}',
                status=status.HTTP_202_ACCEPTED,
                data=OrderSerializer(obj).data
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_400_BAD_REQUEST
            )
