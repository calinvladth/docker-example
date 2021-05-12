from rest_framework import serializers

from product_categories.models import Category, ProductCategory


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category()
        fields = '__all__'


class ProductCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = ProductCategory
        fields = '__all__'
