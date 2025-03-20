from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.utils.translation import gettext_lazy as _
from django_extensions.db.fields import AutoSlugField
from photologue.models import Gallery  # type: ignore[PGH003]
from photologue.models import Photo  # type: ignore[PGH003]

from lxnkup.activities.models import Bookmarks
from lxnkup.comments.models import Comments
from lxnkup.profiles.models import Profile
from lxnkup.reports.models import Reports


class Photos(Photo):
    """Photo model to extend photologue model for api use"""

    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="user_photos",
    )
    bookmarks = GenericRelation(Bookmarks)
    comments = GenericRelation(Comments)
    reports = GenericRelation(Reports)
    timed = models.BooleanField(default=False)
    duration = models.DurationField()
    # tags = TaggableManager()  # noqa: ERA001

    class Meta:
        verbose_name = _("photo")
        verbose_name_plural = _("photos")

    def __str__(self):
        return self.photoes.title


class Video(models.Model):
    """Video model for api use"""

    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    video_file = models.FileField(upload_to="videos/")
    upload_time = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    thumbnail = models.ImageField(upload_to="images/thumbnails/")
    slug = AutoSlugField(populate_from="user", null=False, blank=False)
    view = models.ManyToManyField(Profile, related_name="video_view", blank=True)
    timed = models.BooleanField(default=False)
    duration = models.DurationField()
    comments = GenericRelation(Comments)
    bookmarks = GenericRelation(Bookmarks)
    reports = GenericRelation(Reports)

    class Meta:
        verbose_name = _("video")
        verbose_name_plural = _("videos")

    def __str__(self):
        return self.title

    def number_of_views(self):
        return self.view.count()


class Galleries(Gallery):
    """Gallery model to extend photologue model for api use"""

    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="profile_gallaries"
    )
    video = models.ForeignKey(
        Video, on_delete=models.CASCADE, related_name="gallery_video"
    )
    comments = GenericRelation(Comments)
    bookmark = GenericRelation(Bookmarks)
    reports = GenericRelation(Reports)
    # tags = TaggableManager()  # noqa: ERA001

    class Meta:
        verbose_name = _("gallery")
        verbose_name_plural = _("galleries")

    def __str__(self):
        return self.gallery.title
