from django.db import models

from globals.time_stamp import TimeStamp
from user_message.managers import UserMessageManager


class UserMessage(TimeStamp):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    subject = models.CharField(max_length=250)
    message = models.TextField()

    shop = models.CharField(max_length=100, blank=True, null=True)

    objects = UserMessageManager()

    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        self.email = self.email.lower()
        self.subject = self.subject.lower()
        return super(UserMessage, self).save(*args, **kwargs)
