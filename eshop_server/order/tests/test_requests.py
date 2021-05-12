from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

from .data import data
from ..models import Order
from ..serializer import OrderSerializer


class TestOrderRequests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.order = Order.objects.create(**data)

    def test_get_all(self):
        response = self.client.get('/order/')
        self.assertEqual(status.HTTP_200_OK, response.status_code)

    def test_create(self):
        response = self.client.post('/order/', data=data, format='json')
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

    def test_get_single(self):
        response = self.client.get(f'/order/{self.order.id}/')
        self.assertEqual(status.HTTP_200_OK, response.status_code)

    def test_update(self):
        obj = self.order
        obj.payment['card'] = False
        obj.payment['payment_id'] = ''
        obj.shipping_price = 10

        response = self.client.put(f'/order/{obj.id}/', data=OrderSerializer(obj).data, format="json")

        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(obj.payment['card'], response.data['data']['payment']['card'])
        self.assertEqual(obj.payment['payment_id'], response.data['data']['payment']['payment_id'])

    def test_delete(self):
        obj = self.order
        response = self.client.delete(f'/order/{obj.id}/')
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)
        self.assertEqual(None, response.data['data']['id'])
