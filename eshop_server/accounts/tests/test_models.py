from django.test import TestCase
from ..models import Account
from .data import account


class TestAccountModel(TestCase):
    def setUp(self):
        self.admin = Account.objects.create(**account)

    def test_create_admin(self):
        data = {
            'email': 'future@admin.com',
            'password': 'Pwd1q2w3e'
        }
        admin = Account.objects.create_superuser(**data)
        self.assertTrue(admin.is_admin)

    def test_edit(self):
        data = {
            'email': 'some@email.com',
            'password': 'NewPassword123'
        }
        edit_account = Account.objects.edit(pk=self.admin.id, email=data['email'], password=data['password'])
        self.assertTrue(data['email'], edit_account.email)
