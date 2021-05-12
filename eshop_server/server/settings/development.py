from .base import *

DEBUG = True

CORS_ORIGIN_ALLOW_ALL = True
ALLOWED_HOSTS = ['api.localhost', 'eshop.localhost', 'backend']

CORS_ORIGIN_WHITELIST = [
    'http://api.localhost',
    'http://eshop.localhost',
    'http://192.168.1.105:3000',
    'http://192.168.1.105:3001',
    'http://192.168.1.105:8000',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
