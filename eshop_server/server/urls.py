from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from server.requests import CheckServerStatus, CheckRegister, CheckShop
from server.settings.base import MEDIA_URL, MEDIA_ROOT

urlpatterns = [
    path('check_server/', CheckServerStatus.as_view()),
    path('check_register/', CheckRegister.as_view()),
    path('check_shop/', CheckShop.as_view()),
    path('account/', include('accounts.urls')),
    path('products/', include('products.urls')),
    path('product_categories/', include('product_categories.urls')),
    path('cart/', include('cart.urls')),
    path('payment/', include('payment.urls')),
    path('order/', include('order.urls')),
    path('config/', include('config.urls')),
    path('newsletter/', include('newsletter.urls')),
    path('user_message/', include('user_message.urls')),
]

urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)
