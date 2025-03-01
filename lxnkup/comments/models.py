from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.utils.translation import gettext_lazy as _
from django_comments_xtd.models import XtdComment  # type: ignore PGH003

from lxnkup.profiles.models import Profile
from lxnkup.reports.models import Reports


class Comments(XtdComment):
    title = models.CharField(max_length=200, blank=True, null=True)  # noqa: DJ001
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="profile_comments"
    )
    media = models.ImageField(
        upload_to="comments_media",
        max_length=300,
    )
    link = models.URLField(max_length=500, blank=True, null=True)  # noqa: DJ001
    reports = GenericRelation(Reports)

    class Meta:
        app_label = "comments"
        verbose_name = _("Comment")
        verbose_name_plural = _("Comments")
        db_table_comment = (
            "Xamayca comment model which inherits from django-comments-xtd"
        )
