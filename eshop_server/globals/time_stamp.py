import time
from django.db import models


class TimeStamp(models.Model):
    created = models.FloatField(default=time.time())
    modified = models.FloatField(null=True, blank=True)

    class Meta:
        abstract = True
