from django.db import models

# Create your models here.
from product_categories.managers import CategoryManager, ProductCategoryManager


class Category(models.Model):
    name = models.CharField(max_length=15)
    shop = models.CharField(max_length=100, blank=True, null=True)

    objects = CategoryManager()

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        return super(Category, self).save(*args, **kwargs)


class ProductCategory(models.Model):
    product = models.OneToOneField('products.Product', related_name='category', on_delete=models.CASCADE,
                                   primary_key=True)
    category = models.ForeignKey('product_categories.Category', on_delete=models.CASCADE)

    objects = ProductCategoryManager()

    def __str__(self):
        return f'{self.product} - {self.category}'
