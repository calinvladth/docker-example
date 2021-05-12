import json

from rest_framework import status
from rest_framework.views import APIView

from cart.local_storage.logic import check_cart, calculate_totals
from globals.response import custom_response


class GetCartItemsFromLocalStorageData(APIView):
    def post(self, request):
        products = check_cart(request.data)

        file = open('config/file.json')
        obj = json.load(file)
        shipping = obj['taxes']['shipping']
        free_shipping_over = obj['taxes']['free_shipping_over']

        total_products_price, total_quantity = calculate_totals(products)

        if total_products_price >= free_shipping_over:
            shipping = 0

        total_price = shipping + total_products_price

        data = {
            "products": products,
            "total_products_price": round(total_products_price, 2),
            "shipping": shipping,
            "total_price": round(total_price, 2),
            "total_quantity": total_quantity
        }

        return custom_response(
            message="cart items fetched",
            status=status.HTTP_200_OK,
            data=data
        )
