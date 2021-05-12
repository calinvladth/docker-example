from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

from ..models import UserMessage

data = {
    'name': 'vlad',
    'email': 'some email',
    'subject': 'some text',
    'message': 'some message'
}


class TestOrderRequests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.obj = UserMessage.objects.create(**data)

    def test_get_all(self):
        response = self.client.get('/user_message/')
        self.assertEqual(status.HTTP_200_OK, response.status_code)

    def test_create(self):
        response = self.client.post('/user_message/', data=data, format='json')
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

    def test_get_by_pk(self):
        response = self.client.get(f'/user_message/{self.obj.pk}/')
        self.assertEqual(status.HTTP_200_OK, response.status_code)

    def test_delete(self):
        obj = self.obj
        response = self.client.delete(f'/user_message/{obj.id}/')
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)
        self.assertEqual(None, response.data['data']['id'])
