import uuid

from django.db import models

from globals.time_stamp import TimeStamp
from .managers import OrderManager


class Order(TimeStamp):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    products = models.JSONField()
    billing_address = models.JSONField()
    payment = models.JSONField()
    shipping_price = models.PositiveIntegerField(default=0)
    total_products_price = models.PositiveIntegerField(default=0)
    total_price = models.PositiveIntegerField(default=0)
    currency = models.CharField(max_length=10, blank=True, null=True)
    processed = models.BooleanField(default=False)
    canceled = models.BooleanField(default=False)

    shop = models.CharField(max_length=100, blank=True, null=True)

    objects = OrderManager()
