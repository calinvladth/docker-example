# Generated by Django 3.1.6 on 2021-03-04 19:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Newsletter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.FloatField(default=1614887493.8553889)),
                ('modified', models.FloatField(blank=True, null=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('shop', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]