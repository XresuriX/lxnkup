from actstream import action  # type: ignore[PGH003]
from django.db.models.signals import post_save
from django.dispatch import receiver
from notifications.signals import notify  # type: ignore[PGH003]

from lxnkup.profiles.models import Profile


@receiver(post_save, sender=Profile)
def welcome(sender, instance, **kwargs):
    """Signal to welcome users after authentication."""
    action.send(
        instance.profile,
        verb="welcome",
        action_object=instance.profile,
        greeting=f"Welcome {instance.slug} to linkup",
    )


@receiver(post_save, sender=Profile)
def status_suspension(sender, instance, **kwargs):
    """Signal to notify user if their profile status is SUSPENDED."""
    if instance.status == "SUSPENDED":
        notify.send(instance.user, verb="Your account has been suspended")
