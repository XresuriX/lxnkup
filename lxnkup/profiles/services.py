from datetime import date
from typing import Any
from typing import Optional

from ninja_extra import ModelService  # type: ignore[PGH003]

from lxnkup.profiles.models import Profile


class ProfileModelService(ModelService):
    model = Profile

    def get_by_slug(self, slug: str) -> Profile:
        try:
            return Profile.objects.get(slug=slug)
        except Profile.DoesNotExist:
            return None

    def delete(self, instance: Profile, **kwargs: Any) -> Any:
        # Delete the event
        return super().delete(instance, **kwargs)


class AdminProfileServce(ProfileModelService):
    def get_admin_all(
        self,
        slug: int,
        status: Optional[str] = None,  # noqa: UP007
        date: Optional[date] = None,  # noqa: UP007
        **kwargs,
    ):
        queryset = self.model.objects.filter(slug=slug)
        if status:
            queryset = queryset.filter(status=status)
        if date:
            queryset = queryset.filter(start_date=date)
        return queryset
