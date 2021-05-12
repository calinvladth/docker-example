from django.urls import path

from order.requests import GetOrCreateOrder, GetEditOrRemove, ProcessOrder, CancelOrder

urlpatterns = [
    path('', GetOrCreateOrder.as_view()),
    path('<uuid:pk>/', GetEditOrRemove.as_view()),
    path('<uuid:pk>/process/', ProcessOrder.as_view()),
    path('<uuid:pk>/cancel/', CancelOrder.as_view()),
]
