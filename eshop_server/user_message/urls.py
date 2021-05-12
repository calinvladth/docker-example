from django.urls import path
from .requests import GetOrCreate, GetByPkOrDelete
urlpatterns = [
    path('', GetOrCreate.as_view()),
    path('<int:pk>/', GetByPkOrDelete.as_view())
]