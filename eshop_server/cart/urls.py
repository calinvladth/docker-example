from django.urls import path

from cart.local_storage.requests import GetCartItemsFromLocalStorageData

urlpatterns = [
    path('render_data/', GetCartItemsFromLocalStorageData.as_view()),
]