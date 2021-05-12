import stripe
from rest_framework.views import APIView
from rest_framework import status

from globals.response import custom_response

import json


class GenerateClientSecret(APIView):
    def post(self, requests):
        file = open('config/file.json')
        obj = json.load(file)

        currency = obj['payment']['currency']
        stripe.api_key = obj['payment']['stripe_secret']

        amount = requests.data['amount']

        secret = stripe.PaymentIntent.create(
            amount=int(amount * 100),
            currency=currency,
            payment_method_types=['card'],
        )
        data = secret['client_secret']
        return custom_response(message="Payment Success", status=status.HTTP_201_CREATED, data=data)
