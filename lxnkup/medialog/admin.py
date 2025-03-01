from django.contrib import admin

from .models import Galleries
from .models import Photos

admin.site.register(Photos)
admin.site.register(Galleries)
