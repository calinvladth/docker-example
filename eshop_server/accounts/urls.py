from django.urls import path
from .requests import Login, RegisterAdmin, CheckAccount

urlpatterns = [
    path('login/', Login.as_view()),
    path('register/', RegisterAdmin.as_view()),
    path('check/', CheckAccount.as_view()),
]
