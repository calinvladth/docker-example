# Generated by Django 3.1.6 on 2021-03-05 15:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_auto_20210305_1131'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='created',
            field=models.FloatField(default=1614959474.8076792),
        ),
    ]