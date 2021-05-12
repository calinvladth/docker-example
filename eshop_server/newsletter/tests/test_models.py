from django.test import TestCase
from newsletter.models import Newsletter

data = {
    "email": "calinvladth@icloud.com",
    "shop": "es_v2"
}


class TestNewsletterModel(TestCase):
    def setUp(self):
        self.obj = Newsletter.objects.create(**data)

    def test_get(self):
        obj = Newsletter.objects.get(**data)
        self.assertEqual(data['email'], obj.email)

    def test_get_all(self):
        obj = Newsletter.objects.all()
        self.assertTrue(obj.count() > 0)

    def test_create(self):
        new_data = data
        new_data['email'] = "calinvladth2@icloud.com"
        obj = Newsletter.objects.create(**new_data)
        self.assertTrue(obj.pk)

    def test_delete(self):
        obj = Newsletter.objects.delete(pk=self.obj.pk)
        self.assertFalse(obj.id)
