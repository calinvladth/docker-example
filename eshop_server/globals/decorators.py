import json

from accounts.models import Account


def account_is_admin(pk):
    account = Account.objects.get(id=pk)
    if not account.is_staff:
        raise PermissionError('You can\'t perform this action')

    return account


def check_shop(shop):
    shops = get_shops()
    shop_in_shops = shops.count(shop)

    if shop_in_shops == 0:
        raise ValueError('Please select a shop')

    return True


def get_shops():
    file = open('config/file.json')
    obj = json.load(file)
    return obj['shops']
