from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from products.models import Product


class TestRequests(TestCase):
    def setUp(self):
        self.client = APIClient()

        new_products = [
            {"name": "product 1", "price": 10},
            {"name": "product 2", "price": 15},
            {"name": "product 7", "price": 21}
        ]

        for o in new_products:
            Product.objects.create(**o)

        products = Product.objects.all()

        self.data = []

        for o in products:
            self.data.append({"product": o.id, "quantity": 2})

    def test_render_cart_from_local_storage(self):
        response = self.client.post('/cart/render_data/', data=self.data, format="json")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
