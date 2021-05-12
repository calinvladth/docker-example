from django.test import TestCase
from .data import categories, products, shop
from product_categories.models import Category, ProductCategory
from products.models import Product


class TestCategoriesModels(TestCase):
    def setUp(self):
        for o in categories:
            Category.objects.create(**o)

    def test_get_all_and_create(self):
        objs = Category.objects.get_all(shop=shop)
        self.assertEqual(len(categories), objs.count())

    def test_edit(self):
        name = 'edited_name'
        obj = Category.objects.get(name=categories[0]['name'])
        obj_edit = Category.objects.edit(pk=obj.id, name=name)
        self.assertEqual(name, obj_edit.name)

    def test_delete(self):
        obj = Category.objects.get(name=categories[1]['name'])
        obj_delete = Category.objects.delete(pk=obj.id)

        self.assertEqual(None, obj_delete.id)


class TestProductCategory(TestCase):
    def setUp(self):
        for o in products:
            Product.objects.create(**o)

        for o in categories:
            Category.objects.create(**o)

    def test_create(self):
        obj_c = Category.objects.get(name=categories[1]['name'])
        obj_p = Product.objects.get(name=products[1]['name'])
        obj = ProductCategory.objects.create(category=obj_c, product=obj_p)
        self.assertTrue(obj.product)
