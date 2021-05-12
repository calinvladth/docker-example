from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from product_categories.models import Category, ProductCategory
from .data import categories, products
from products.models import Product


class TestCategoryRequests(TestCase):
    def setUp(self):
        self.client = APIClient()
        for o in categories:
            Category.objects.create(**o)

    def test_get_all(self):
        response = self.client.get('/product_categories/')
        self.assertEqual(status.HTTP_200_OK, response.status_code)

    def test_create(self):
        data = {'name': 'new category'}
        response = self.client.post('/product_categories/', data=data, format='json')
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

    def test_edit(self):
        data = {'name': 'category edited'}
        obj = Category.objects.get(name=categories[0]['name'])
        response = self.client.put(f'/product_categories/{obj.id}/', data=data, format='json')
        self.assertEqual(status.HTTP_200_OK, response.status_code)

    def test_delete(self):
        obj = Category.objects.get(name=categories[0]['name'])
        response = self.client.delete(f'/product_categories/{obj.id}/')
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)


class TestProductCategory(TestCase):
    def setUp(self):
        self.client = APIClient()

        for o in categories:
            Category.objects.create(**o)

        for o in products:
            Product.objects.create(**o)

    def test_create(self):
        obj_p = Product.objects.get(name=products[0]['name'])
        obj_c = Category.objects.get(name=categories[1]['name'])
        response = self.client.post(f'/product_categories/{obj_p.id}/{obj_c.id}/')
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

    def test_edit(self):
        obj_p = Product.objects.get(name=products[0]['name'])
        obj_c = Category.objects.get(name=categories[1]['name'])
        ProductCategory.objects.create(product=obj_p, category=obj_c)

        obj_c_edit = Category.objects.get(name=categories[0]['name'])
        response = self.client.put(f'/product_categories/{obj_p.id}/{obj_c_edit.id}/')
        self.assertEqual(status.HTTP_200_OK, response.status_code)
