from django.urls import path

from product_categories.requests import GetOrCreateCategories, EditOrDeleteCategory, CreateOrEditProductCategory, \
    GetRelatedProducts

urlpatterns = [
    path('', GetOrCreateCategories.as_view()),
    path('related/', GetRelatedProducts.as_view()),
    path('<int:pk>/', EditOrDeleteCategory.as_view()),
    path('<uuid:product_pk>/<int:category_pk>/', CreateOrEditProductCategory.as_view())
]
