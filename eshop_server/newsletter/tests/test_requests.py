from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

from ..models import Newsletter

data = {'email': 'calinvladth@icloud.com'}


class TestOrderRequests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.newsletter = Newsletter.objects.create(**data)

    def test_get_all(self):
        response = self.client.get('/newsletter/')
        self.assertEqual(status.HTTP_200_OK, response.status_code)

    def test_create(self):
        response = self.client.post('/newsletter/', data=data, format='json')
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

    def test_delete(self):
        obj = self.newsletter
        response = self.client.delete(f'/newsletter/{obj.id}/')
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)
        self.assertEqual(None, response.data['data']['id'])
