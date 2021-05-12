from rest_framework.serializers import ModelSerializer
from .models import Account


class AccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        exclude = ['password', 'is_superuser', 'groups', 'user_permissions', 'last_login']
