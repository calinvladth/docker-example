from django.urls import path

from payment.requests import GenerateClientSecret

urlpatterns = [
    path('', GenerateClientSecret.as_view()),
]
