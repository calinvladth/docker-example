from rest_framework.response import Response
from rest_framework import status as _status


def custom_response(message, status, data=None, **extra):
    return Response({
        'success': _status.is_success(status),
        'message': message,
        'data': data,
        **extra
    }, status=status)
