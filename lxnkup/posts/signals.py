from actstream import action  # type: ignore[PGH003]
from django.db.models.signals import post_save
from django.dispatch import receiver
from notifications.signals import notify  # type: ignore[PGH003]

from lxnkup.posts.models import Post


@receiver(post_save, sender=Post)
def post_created(sender, instance, created, **kwargs):
    if created:
        # Send notification
        notify.send(
            instance.user,
            recipient=instance.profile.followers.all(),
            verb="created a new post",
            target=instance,
        )
        # Activity Stream
    action.send(instance.user, verb="created a post", action_object=instance)
