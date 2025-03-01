from django.db import models
from django.utils.translation import gettext_lazy as _
from notifications.base.models import AbstractNotification  # type: ignore[PGH003]

from lxnkup.profiles.models import Profile


class Notification(AbstractNotification):
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="notifications"
    )

    class Meta:
        app_label = "notifications"
        ordering = ["-timestamp"]
        verbose_name = _("Notification")
        verbose_name_plural = _("Notification")

        db_table_comment = (
            "Lxnkup comment model which inherits from django-Notification-hq"
        )

    def __str__(self):
        return f"User {self.profile.username} message {self.profile}"
