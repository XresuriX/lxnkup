from django.contrib import admin

from .models import Posts
from .models import Reposts

admin.site.register(Posts)
admin.site.register(Reposts)
