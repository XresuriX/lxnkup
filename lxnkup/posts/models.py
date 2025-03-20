from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from lxnkup.comments.models import Comments
from lxnkup.core.models import CoreModel
from lxnkup.profiles.models import Profile
from lxnkup.reports.models import Reports


class Posts(CoreModel):
    class STATUS(models.TextChoices):
        DRAFT = "DRAFT"
        PUBLIC = "PUBLIC"
        ARCHIVED = "ARCHIVED"

    title = models.CharField(max_length=200, null=True, blank=True)  # noqa: DJ001
    body = models.TextField(max_length=500, blank=False, null=False)
    date_posted = models.DateTimeField(default=timezone.now)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    comments = models.ForeignKey(
        Comments,
        null=True,
        blank=True,
        related_name="post_comment",
        on_delete=models.CASCADE,
    )
    allow_reposts = models.BooleanField(default=True)
    allow_comments = models.BooleanField(default=True)
    link = models.URLField(max_length=500, blank=True)
    media = models.FileField(upload_to="post-media", blank=True, null=True)
    status = models.CharField(
        choices=STATUS.choices, default=STATUS.PUBLIC, max_length=10
    )
    reports = GenericRelation(Reports)
    # tags = TaggableManager()  # noqa: ERA001

    class Meta:
        verbose_name = _("Post")
        verbose_name_plural = _("Posts")
        db_table_comment = "Lxnkup post model"

    def __str__(self):
        return self.post.title


class Reposts(Posts):
    class Meta:
        verbose_name = _("Repost")
        verbose_name_plural = _("Reposts")
        db_table = "Lxnkup_reposts"
        db_table_comment = "Lxnkup repost model"

    def __str__(self):
        return self.repost.title
