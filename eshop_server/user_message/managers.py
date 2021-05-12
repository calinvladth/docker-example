from django.db import models

from globals.decorators import check_shop


class UserMessageManager(models.Manager):
    def get(self, **kwargs):
        obj = self.filter(**kwargs).first()
        if not obj:
            raise ValueError('User message does not exist')
        return obj

    def create(self, **kwargs):
        if 'shop' not in kwargs or not kwargs['shop']:
            raise ValueError('Shop is required')

        check_shop(kwargs['shop'])

        obj = self.model(**kwargs)
        obj.save()
        return obj

    def delete(self, pk):
        obj = self.model.objects.get(pk=pk)
        obj.delete()
        return obj
