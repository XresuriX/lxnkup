from django.contrib import admin

from lxnkup.posts.models import Posts

# from lxnkup.posts.models import Reposts  # noqa: ERA001

admin.site.register(Posts)
# admin.site.register(Reposts)  # noqa: ERA001
