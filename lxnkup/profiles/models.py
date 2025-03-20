import datetime

from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django_extensions.db.fields import AutoSlugField

from lxnkup.core.models import CoreModel  # type: ignore PGH003
from lxnkup.reports.models import Reports
from lxnkup.users.models import User


class Profile(CoreModel):
    class STATUS(models.TextChoices):
        REGULAR = "REGULAR"
        TEEN = "TEEN"
        SUSPENDED = "SUSPENDED"

    STATUS_HELP_TEXT = """
        1. Regular profile
        2. Teen profile
        3. Suspended profile

    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(default="default.jpg", upload_to="profile_pics")
    about = models.TextField(_("about"), max_length=500, blank=True)
    slug = AutoSlugField(populate_from="user", null=False, blank=False)
    location = models.TextField(_("location"), max_length=50, blank=True)
    is_visible = models.BooleanField(default=False)
    dob = models.DateField(null=True)
    dob_visible = models.BooleanField(default=False)
    is_requesting_delete = models.BooleanField(default=False)
    is_nsfw = models.BooleanField(default=False)
    status = models.CharField(
        max_length=10,
        choices=STATUS.choices,
        default=STATUS.REGULAR,
        help_text=STATUS_HELP_TEXT,
        db_index=True,
    )
    reports = GenericRelation(Reports)
    # tags = TaggableManager()  # noqa: ERA001

    class Meta:
        app_label = "profiles"
        verbose_name = _("profile")
        verbose_name_plural = _("profiles")
        ordering = ["-created_at"]
        db_table_comment = "lxnkup profile model"

    def __str__(self):
        return self.slug

    def get_absolute_url(self) -> str:
        """Get URL for user's detail view.

        Returns:
            str: URL for user detail.

        """
        return reverse(
            "user:detail",
            kwargs={"username": self.slug},
        )

    def account_status(self):
        """Property to determine account status dynamically based on the age."""
        age = (datetime.now().date() - self.dob).days // 365
        if age < 18:  # noqa: PLR2004
            return "TEEN"
        return None

    def set_account_status(self):
        """Update the profile status and save it."""
        if self.account_status is None:
            pass
        else:
            self.status = self.account_status
            self.save()


class Interactions(CoreModel):
    profile = models.OneToOneField(
        Profile,
        on_delete=models.CASCADE,
    )
    muted = models.ForeignKey(
        Profile, related_name="muted", on_delete=models.CASCADE, null=True
    )
    blocked = models.ManyToManyField(
        Profile, related_name="blocked_profile", symmetrical=False
    )
    vip = models.ForeignKey(
        Profile, related_name="vips", on_delete=models.CASCADE, null=True
    )

    class Meta:
        verbose_name = _("Interaction")
        verbose_name_plural = _("Interactions")

        db_table_comment = "Interaction model for LxnkUp"

    def __str__(self):
        return f"{self.interactions.profile.username} following"
