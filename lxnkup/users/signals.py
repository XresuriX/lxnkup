from allauth.account.signals import user_signed_up
from django.dispatch import receiver

from lxnkup.profiles.models import Profile


@receiver(user_signed_up)
def create_user_profile(request, user, **kwargs):
    """Signal for creating profile for authenticated user"""
    Profile.objects.create(user=user)
