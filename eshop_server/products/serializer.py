from rest_framework import serializers

from product_categories.serializers import ProductCategorySerializer
from products.models import Product, Specs, Images


class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        exclude = ['product']


class SpecsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specs
        exclude = ['product']


class ProductSerializer(serializers.ModelSerializer):
    category = ProductCategorySerializer(many=False)
    specs = SpecsSerializer(many=True)
    images = ImagesSerializer(many=True)

    class Meta:
        model = Product
        fields = '__all__'
