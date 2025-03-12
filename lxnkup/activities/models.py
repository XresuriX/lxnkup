from django.db import models
from django.utils.translation import gettext_lazy as _

from lxnkup.core.models import CoreModel
from lxnkup.profiles.models import Profile


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
