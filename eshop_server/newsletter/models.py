from django.db import models
from globals.time_stamp import TimeStamp
from newsletter.managers import NewsletterManager


class Newsletter(TimeStamp):
    email = models.EmailField(unique=True)

    shop = models.CharField(max_length=100, blank=True, null=True)

    objects = NewsletterManager()

    def save(self, *args, **kwargs):
        self.email = self.email.lower()
        return super(Newsletter, self).save(*args, **kwargs)
