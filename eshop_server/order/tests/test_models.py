from django.test import TestCase
from order.models import Order

from .data import data


class TestOrderModel(TestCase):
    def setUp(self):
        self.order = Order.objects.create(**data)

    def test_get_all(self):
        obj = Order.objects.get_all()
        self.assertEqual(1, obj.count())

    def test_get_by_key(self):
        obj = Order.objects.get(pk=self.order.id)
        self.assertFalse(obj.payment['card'])

    def test_update(self):
        new_obj = self.order
        new_obj.payment['card'] = True
        new_obj.payment['payment_id'] = 'xnenwrlkjncl'

        new_obj.save()

        self.assertTrue(new_obj.payment['card'])

    def test_delete(self):
        obj = Order.objects.delete(self.order.id)
        self.assertEqual(None, obj.id)
