from django.test import TestCase
from user_message.models import UserMessage

data = {
    'name': 'vlad',
    'email': 'some email',
    'subject': 'some text',
    'message': 'some message',
    'shop': 'es_v1'
}


class TestUserMessageModel(TestCase):
    def setUp(self):
        self.obj = UserMessage.objects.create(**data)

    def test_get(self):
        obj = UserMessage.objects.get(name=data['name'])
        self.assertEqual(data['name'], obj.name)

    def test_get_all(self):
        obj = UserMessage.objects.all()
        self.assertTrue(obj.count() > 0)

    def test_create(self):
        obj = UserMessage.objects.create(**data)
        self.assertTrue(obj.pk)

    def test_delete(self):
        obj = UserMessage.objects.delete(pk=self.obj.pk)
        self.assertFalse(obj.id)
