from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView

from accounts.models import Account
from accounts.serializers import AccountSerializer
from globals.response import custom_response


class CheckAccount(APIView):
    def get(self, request):
        try:
            if request.user.is_anonymous:
                raise ValueError('No account found')
            return custom_response(
                data=AccountSerializer(request.user).data,
                message=f'Account checked',
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_400_BAD_REQUEST
            )


class RegisterAdmin(APIView):
    def post(self, request, **kwargs):
        try:
            account = Account.objects.create_superuser(**request.data)
            token, _ = Token.objects.get_or_create(user=account)
            data = AccountSerializer(account).data
            data['token'] = token.key

            return custom_response(
                data=data,
                message=f'Account was created',
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_400_BAD_REQUEST
            )


class Login(APIView):
    def post(self, request):
        try:
            Account.objects.get(email=request.data.get('email'))
            account = authenticate(**request.data)

            if not account:
                raise ValueError('Invalid credentials')

            login(request, account)

            token, _ = Token.objects.get_or_create(user=account)
            data = AccountSerializer(account).data
            data['token'] = token.key
            return custom_response(
                data=data,
                message=f'Welcome {account.email}',
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return custom_response(
                message=str(e),
                status=status.HTTP_400_BAD_REQUEST
            )

# class Forgot(APIView):
#     def post(self, request):
#         return Response({
#             'success': True,
#             'message': 'Forgot'
#         })
#
#
# class Reset(APIView):
#     def post(self, request):
#         return Response({
#             'success': True,
#             'message': 'Reset'
#         })
