# Generated by Django 3.1.6 on 2021-03-05 11:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_message', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usermessage',
            name='created',
            field=models.FloatField(default=1614943884.061506),
        ),
    ]
