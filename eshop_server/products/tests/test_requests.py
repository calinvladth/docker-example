from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from products.models import Product, Images, Specs
from .data import base_data, images, specs


class TestProductRequests(TestCase):
    def setUp(self):
        self.client = APIClient()
        for o in base_data:
            Product.objects.create(**o)

    def test_get_all(self):
        response = self.client.get(path='/products/')
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(len(base_data), len(response.data['data']))

    def test_get_single(self):
        obj = Product.objects.get(name=base_data[1]['name'])

        response = self.client.get(path=f'/products/{obj.pk}/')
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(obj.name, response.data['data']['name'])

    def test_create(self):
        obj = {
            "name": "newly created product",
            "price": 100,
        }

        response = self.client.post(path='/products/', data=obj, format="json")
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertEqual(obj['name'], response.data['data']['name'])

    def test_edit(self):
        obj = Product.objects.get(name=base_data[1]['name'])
        new_data = {"name": "edited product name"}
        response = self.client.put(path=f'/products/{obj.pk}/', data=new_data, format="json")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(new_data['name'], response.data['data']['name'])

    def test_delete(self):
        obj = Product.objects.get(name=base_data[1]['name'])
        response = self.client.delete(path=f'/products/{obj.pk}/')
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)
        self.assertEqual(None, response.data['data']['id'])


class TestImageRequest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.product = Product.objects.create(**base_data[0])

    def test_create(self):
        response = self.client.post(f'/products/{self.product.id}/images/', data=images[0], format='json')
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

    def test_remove(self):
        obj = Images.objects.create(product=self.product, **images[0])
        response = self.client.delete(f'/products/{self.product.id}/images/{obj.id}/')
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)


class TestSpecRequests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.product = Product.objects.create(**base_data[0])

    def test_create(self):
        response = self.client.post(path='/products/1/specs/', data={}, format="json")
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

    def test_edit(self):
        obj = Specs.objects.create(product=self.product, **specs[0])
        data = {
            'key': 'edited spec name',
            'value': 'edited spec value'
        }

        response = self.client.put(f'/products/{self.product.id}/specs/{obj.id}/', data=data, format='json')
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(data['key'], response.data['data']['key'])
        self.assertEqual(data['value'], response.data['data']['value'])

    def test_delete(self):
        obj = Specs.objects.create(product=self.product, **specs[0])
        response = self.client.delete(f'/products/{self.product.id}/specs/{obj.id}/')
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)
