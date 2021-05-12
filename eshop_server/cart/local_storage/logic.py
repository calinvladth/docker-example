from products.models import Product
from products.serializer import ProductSerializer


def check_cart(products):
    objs = []
    for o in products:
        obj = Product.objects.filter(pk=o['product'], active=True)
        if obj.count() > 0:
            obj_json = ProductSerializer(obj.first()).data
            obj_json['quantity'] = o['quantity'] or 1
            obj_json['total_price'] = obj_json['price'] * obj_json['quantity']
            objs.append(obj_json)

    return objs


def calculate_totals(products):
    total_products_price = 0
    total_quantity = 0
    for o in products:
        total_products_price = total_products_price + o['total_price']
        total_quantity = total_quantity + o["quantity"]

    return total_products_price, total_quantity
