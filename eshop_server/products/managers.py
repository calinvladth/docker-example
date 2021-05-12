import os
import time
from io import BytesIO
from pathlib import Path

from PIL import Image
from django.core.files import File
from django.db import models

from globals.decorators import check_shop


class ProductManager(models.Manager):
    def get_all(self, **kwargs):
        obj = self.filter(**kwargs).order_by('-created')
        return obj

    def get(self, **kwargs):
        obj = self.filter(**kwargs).first()
        if not obj:
            raise ValueError('Product does not exist')
        return obj

    def create(self, **kwargs):
        if 'name' not in kwargs or not kwargs['name']:
            raise ValueError('Product name is required')

        if 'shop' not in kwargs or not kwargs['shop']:
            raise ValueError('Shop is required')

        check_shop(kwargs['shop'])

        obj = self.model(**kwargs)
        obj.save()
        return obj

    def edit(self, pk, **kwargs):
        obj = self.model.objects.get(pk=pk)
        for (key, value) in kwargs.items():
            setattr(obj, key, value)
        obj.modified = time.time()
        obj.save()
        return obj

    def delete(self, pk):
        obj = self.model.objects.get(pk=pk)
        obj.delete()
        return obj


class ImageManager(models.Manager):

    def get(self, pk):
        obj = self.filter(id=pk).first()
        if not obj:
            raise ValueError('Image not found')
        return obj

    def create(self, **kwargs):
        data = kwargs
        self.model.objects.check_extension(image=data['path'])
        # Compress Images
        data['path'] = self.model.objects.compress(image=data['path'])
        print('KW: ', kwargs)
        obj = self.model(**kwargs)
        obj.save()
        return obj

    def bulk_edit_index(self, **kwargs):
        for o in kwargs['images']:
            obj = self.model.objects.get(pk=o['id'])
            obj.index = o['index']
            obj.save()

        objs = self.model.objects.filter(product=kwargs['product'])

        return objs

    @staticmethod
    def check_extension(image):
        obj = str(image).lower()
        approved_extensions = ['.jpeg', '.jpg', '.png']
        match = False
        extension = ''

        for o in approved_extensions:
            if obj.endswith(o):
                match = True
                extension = o
                break

        if not match:
            raise ValueError('File format is invalid')

        return extension

    @staticmethod
    def compress(image):
        image_type = 'webp'
        quality = 75
        im = Image.open(image)
        im = im.convert('RGB')
        # create a BytesIO object
        im_io = BytesIO()

        # save image to BytesIO object
        im.save(im_io, image_type, quality=quality, optimize=True)

        image_name = image.name
        ext = image_name.split('.')[-1]
        # set filename as random string
        image_name = '{}.{}'.format(image_name + ext, image_type)

        new_image = File(im_io, name=image_name)
        return new_image


class SpecManager(models.Manager):

    def get(self, pk):
        obj = self.filter(id=pk).first()
        if not obj:
            raise ValueError('Spec not found')
        return obj

    def create(self, **kwargs):
        obj = self.model(**kwargs)
        obj.save()
        return obj

    def edit(self, pk, **kwargs):
        obj = self.model.objects.get(pk=pk)

        for (key, value) in kwargs.items():
            setattr(obj, key, value)

        obj.save()
        return obj

    def bulk_edit_index(self, **kwargs):
        for o in kwargs['specs']:
            obj = self.model.objects.get(pk=o['id'])
            obj.index = o['index']
            obj.save()

        objs = self.model.objects.filter(product=kwargs['product'])

        return objs
