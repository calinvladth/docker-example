from django.test import TestCase

from products.models import Product, Images, Specs
from .data import base_data, images, specs, shop


class TestProducts(TestCase):
    def setUp(self):
        for o in base_data:
            Product.objects.create(**o)

    def test_get_all(self):
        objs = Product.objects.get_all()
        self.assertEqual(len(base_data), objs.count())

    def test_get_single(self):
        obj_to_find = base_data[2]
        obj = Product.objects.get(name=obj_to_find["name"])
        self.assertEqual(obj_to_find["name"], obj.name)

    def test_create(self):
        new_obj = {
            "name": "coffee beans",
            "price": 20,
            "shop": shop
        }
        obj = Product.objects.create(**new_obj)
        self.assertEqual(new_obj["name"], obj.name)

    def test_edit(self):
        obj_to_find = base_data[1]
        obj_to_edit = Product.objects.get(name=obj_to_find["name"])
        data = {"name": "Product edited"}
        obj = Product.objects.edit(pk=obj_to_edit.pk, **data)
        self.assertEqual(data["name"], obj.name)

    def test_delete(self):
        obj_to_find = base_data[1]
        obj_to_delete = Product.objects.get(name=obj_to_find["name"])
        obj = Product.objects.delete(pk=obj_to_delete.pk)
        self.assertEqual(None, obj.pk)


class TestImages(TestCase):
    def setUp(self):
        self.product = Product.objects.create(**base_data[0])
        self.obj = Images.objects.create(product=self.product, path=images[0]['path'])

    def test_images_create(self):
        self.assertTrue(self.obj)

    def test_image_delete(self):
        self.obj.delete()
        self.assertEqual(None, self.obj.id)


class TestSpecs(TestCase):
    def setUp(self):
        self.product = Product.objects.create(**base_data[0])
        self.obj = Specs.objects.create(product=self.product, **specs[0])

    def test_create(self):
        self.assertEqual(self.obj.key, specs[0]['key'])

    def test_edit(self):
        data = {
            'key': 'spec edited',
            'value': 'edited value',
            'extra_field': 'Will this bring an error?'
        }

        obj = Specs.objects.edit(pk=self.obj.id, **data)
        self.assertEqual(data['key'], obj.key)
        self.assertEqual(data['value'], obj.value)

    def test_delete(self):
        remove = self.obj.delete()
        self.assertTrue(remove[0] == 1)
