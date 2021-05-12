import os
import uuid

from django.db import models

from globals.image import RenameImage
from globals.time_stamp import TimeStamp
from products.managers import ProductManager, ImageManager, SpecManager

rename_image = RenameImage("images")


class Product(TimeStamp):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150)
    price = models.FloatField(default=1)
    description_short = models.CharField(max_length=200, null=True, blank=True)
    description_long = models.TextField(null=True, blank=True)
    active = models.BooleanField(default=False)
    shop = models.CharField(max_length=100, blank=True, null=True)

    objects = ProductManager()

    def __str__(self):
        return self.name


class Images(models.Model):
    path = models.ImageField(upload_to=rename_image)
    index = models.PositiveIntegerField(default=100)
    # Relations
    product = models.ForeignKey('products.product', related_name='images', on_delete=models.CASCADE)
    # Managers
    objects = ImageManager()

    def delete(self, check=True, *args, **kwargs):
        # Remove image file then remove image from db

        if os.path.isfile(path=f'media/{str(self.path)}'):
            os.remove(path=f'media/{str(self.path)}')

        return super(Images, self).delete(*args, **kwargs)


class Specs(models.Model):
    key = models.CharField(max_length=75)
    value = models.TextField()
    index = models.IntegerField(default=-1)
    # Relations
    product = models.ForeignKey('products.product', related_name='specs', on_delete=models.CASCADE)
    # Managers
    objects = SpecManager()

    def delete(self, check=True, *args, **kwargs):
        return super(Specs, self).delete(*args, **kwargs)
