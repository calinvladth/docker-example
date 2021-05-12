from django.urls import path

from .requests import GetOrCreate, Delete

urlpatterns = [
    path('', GetOrCreate.as_view()),
    path('<int:pk>/', Delete.as_view())
]
