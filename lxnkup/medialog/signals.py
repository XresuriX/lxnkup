from actstream import action  # type: ignore[PGH003]
from django.db.models.signals import post_save
from django.dispatch import receiver

from lxnkup.medialog.models import Galleries
from lxnkup.medialog.models import Photoes


@receiver(post_save, sender=Galleries)
def new_gallery(sender, instance, created, **kwargs):
    if created:
        action.send(
            instance,
            verb="published a new gallery",
            target=instance.profile,
            action_object=instance.title,
        )


@receiver(post_save, sender=Photoes)
def new_photoes(sender, instance, created, **kwargs):
    """Signal for notifying a user they posted a new photo"""
    if created:
        action.send(
            instance,
            verb="posted a new photo",
            target=instance.profile,
            action_object=instance.title,
        )
