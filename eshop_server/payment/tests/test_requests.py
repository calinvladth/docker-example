from django.test import TestCase

from rest_framework.test import APIClient
from rest_framework import status


class TestPayment(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_payment(self):
        data = {
            'amount': 20,
        }
        response = self.client.post('/payment/', data=data, format='json')
        self.assertTrue(status.HTTP_201_CREATED, response.status_code)
