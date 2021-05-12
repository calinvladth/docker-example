from django.test import TestCase, Client

from accounts.models import Account
from .data import account
from rest_framework import status


class TestAccountRequests(TestCase):
    def setUp(self):
        self.client = Client()
        self.superuser = Account.objects.create_superuser(**account)

    def test_register_admin(self):
        response = self.client.post(f'/account/register/', data=account,
                                    content_type='application/json')

        self.assertTrue(status.HTTP_200_OK, response.status_code)

    def test_login(self):
        data = {
            'email': 'office@theoscoding.com',
            'password': 'Pwd1q2w3e',
        }
        Account.objects.create(**data)
        response = self.client.post(f'/account/login/', data=data,
                                    content_type='application/json')

        self.assertTrue(status.HTTP_200_OK, response.status_code)
