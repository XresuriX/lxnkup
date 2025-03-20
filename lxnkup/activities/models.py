from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.utils.translation import gettext_lazy as _

from lxnkup.core.models import CoreModel
from lxnkup.profiles.models import Profile


class Likes(CoreModel):
    profile = models.OneToOneField(
        Profile,
        on_delete=models.CASCADE,
    )
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_pk = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_pk")

    class Meta:
        verbose_name = _("like")
        verbose_name_plural = _("likes")

        db_table_comment = "Likes model for LxnkUp"

    def __str__(self):
        return f"user{self.profile}liked{self.content_object} following"


class Lists(CoreModel):
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_pk = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_pk")
    is_public = models.BooleanField(default=False)

    class Meta:
        verbose_name = _("list")
        verbose_name_plural = _("lists")

        db_table_comment = "Likes model for LxnkUp"

    def __str__(self):
        return f"user{self.owner}added{self.content_object} to this list"


class Bookmarks(CoreModel):
    owner = models.OneToOneField(
        Profile,
        on_delete=models.CASCADE,
    )
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_pk = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_pk")

    class Meta:
        verbose_name = _("bookmark")
        verbose_name_plural = _("Bookmarks")

        db_table_comment = "Bookmark model for LxnkUp"

    def __str__(self):
        return f"You {self.profile} have just bookmarked {self.content_object}"
