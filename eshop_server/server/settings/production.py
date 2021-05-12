from .base import *

from server.settings.base import BASE_DIR

DEBUG = True

ALLOWED_HOSTS = [
    'es-v1.calinvladth.online',
    'es-v2.calinvladth.online',
    'es-v3.calinvladth.online',
    'es-v4.calinvladth.online',
    'admin.calinvladth.online',
    'server.calinvladth.online',
    'api.localhost'
]

CORS_ORIGIN_ALLOW_ALL = False

CORS_ORIGIN_WHITELIST = [
    'https://es-v1.calinvladth.online',
    'https://es-v2.calinvladth.online',
    'https://es-v3.calinvladth.online',
    'https://es-v4.calinvladth.online',
    'https://admin.calinvladth.online',
    'https://server.calinvladth.online',
    'http://api.localhost'
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'production_db.sqlite3'),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# HTTPS SETTINGS
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = False

# HSTS SETTINGS
SECURE_HSTS_SECONDS = 3153600  # 1 year
SECURE_HSTS_PRELOAD = True
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
