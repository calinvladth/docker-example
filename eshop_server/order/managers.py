import time
from django.db import models

from globals.decorators import check_shop


class OrderManager(models.Manager):
    def get_all(self, **kwargs):
        obj = self.filter(**kwargs).order_by('-created')
        return obj

    def get(self, **kwargs):
        obj = self.filter(**kwargs).first()
        if not obj:
            raise ValueError('Order does not exist')
        return obj

    def create(self, **kwargs):
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
