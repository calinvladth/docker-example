from django.urls import path
from .requests import GetOrEdit, GetForStore

urlpatterns = [
    path('', GetOrEdit.as_view()),
    path('store/', GetForStore.as_view())
]
