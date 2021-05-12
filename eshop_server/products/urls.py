from django.urls import path
from .requests import GetOrCreate, ActivateOrDeactivateProduct, GetEditOrRemove, CreateOrEditImage, RemoveImage, \
    CreateOrEditSpecs, EditOrRemoveSpecs

urlpatterns = [
    path('', GetOrCreate.as_view()),
    path('<uuid:pk>/', GetEditOrRemove.as_view()),
    path('<uuid:pk>/activate/', ActivateOrDeactivateProduct.as_view()),
    path('<uuid:pk>/specs/', CreateOrEditSpecs.as_view()),
    path('<uuid:pk>/specs/<int:spec_pk>/', EditOrRemoveSpecs.as_view()),
    path('<uuid:pk>/images/', CreateOrEditImage.as_view()),
    path('<uuid:pk>/images/<int:image_pk>/', RemoveImage.as_view()),
]
