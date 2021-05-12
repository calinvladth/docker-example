from rest_framework import status
from rest_framework.views import APIView

from globals.decorators import check_shop
from globals.response import custom_response
from product_categories.models import Category, ProductCategory
from product_categories.serializers import CategorySerializer, ProductCategorySerializer
from products.models import Product
from products.serializer import ProductSerializer

import random


class GetOrCreateCategories(APIView):
    def get(self, request):
        try:
            shop = request.GET.get('shop')
            check_shop(shop)

            categories = Category.objects.get_all(shop=shop)

            return custom_response(
                message='Categories fetched',
                data=CategorySerializer(categories, many=True).data,
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        try:
            product = Category.objects.create(**request.data)

            return custom_response(
                message='Category created',
                data=CategorySerializer(product).data,
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class EditOrDeleteCategory(APIView):
    def put(self, request, **kwargs):
        try:
            obj = Category.objects.get(pk=kwargs['pk'])
            category = Category.objects.edit(pk=obj.id, **request.data)

            return custom_response(
                message='Category edited',
                data=CategorySerializer(category).data,
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, **kwargs):
        try:
            obj = Category.objects.delete(pk=kwargs['pk'])

            return custom_response(
                message='Category deleted',
                data=CategorySerializer(obj).data,
                status=status.HTTP_204_NO_CONTENT
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class CreateOrEditProductCategory(APIView):
    def post(self, request, **kwargs):
        try:
            product = Product.objects.get(pk=kwargs['product_pk'])
            category = Category.objects.get(pk=kwargs['category_pk'])
            obj = ProductCategory.objects.create(product=product, category=category)

            return custom_response(
                message='Product category created',
                data=ProductCategorySerializer(obj).data,
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, requests, **kwargs):
        try:
            product = Product.objects.get(pk=kwargs['pk'])
            category = Category.objects.get(pk=kwargs['category_pk'])
            obj = ProductCategory.objects.edit(pk=product, category=category)

            return custom_response(
                message='Product category edited',
                data=ProductCategorySerializer(obj).data,
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class GetRelatedProducts(APIView):
    def post(self, request, **kwargs):
        try:
            product = request.data.get('product')
            category = request.data.get('category')
            limit = request.data.get('limit') or 3

            objs = ProductCategory.objects.filter(product__active=True, category=category).exclude(
                product=product)

            random_limit = objs.count() if objs.count() <= limit else limit
            random_products = random.sample(list(objs), random_limit)

            products = []
            for o in random_products:
                products.append(o.product)

            return custom_response(
                message='Related products',
                data=ProductSerializer(products, many=True).data,
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
