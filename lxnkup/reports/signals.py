from django.db.models.signals import post_save
from notifications.signals import notify  # type: ignore PGH003

from lxnkup.reports.models import Reports


def report_saved(sender, instance, **kwargs):
    """notification signal to let reporter know the report was recieved"""
    notify.send(instance.user, recipient=instance.user, verb="Your Report was recieved")


post_save.connect(report_saved, sender=Reports)


def report_updated(sender, instance, **kwargs):
    if instance.status != "INITIATED":
        notify.send(
            instance.Reports.Profile,
            recipient=instance.Reports.Profile,
            verb="Your account has been reported",
        )


post_save.connect(report_updated, sender=Reports)
