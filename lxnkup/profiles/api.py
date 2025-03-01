from django.shortcuts import get_object_or_404
from ninja_extra import ModelControllerBase  # type: ignore[PGH003]
from ninja_extra import api_controller  # type: ignore[PGH003]
from ninja_extra import permissions  # type: ignore[PGH003]
from ninja_extra import route  # type: ignore[PGH003]

from lxnkup.profiles.models import Profile
from lxnkup.profiles.schemas import ProfileDetailSchema
from lxnkup.profiles.schemas import ProfileOutSchema
from lxnkup.profiles.services import ProfileModelService


@api_controller(
    "/Profiles",
    tags=["Profile"],
    permissions=[permissions.IsAuthenticatedOrReadOnly],
)
class ProfileModelController(ModelControllerBase):
    """profile api controller, it uses the built in ninja functions to make
    list update patch and delete end points"""

    service = ProfileModelService(model=Profile)

    @route.get("all/", response=list[ProfileOutSchema])
    def get_profiles(self):
        return Profile.objects.all()

    @route.get("/{slug}/", response=ProfileOutSchema)
    def get_profile(self, slug: str):
        return get_object_or_404(Profile, slug=slug)

    @route.post("/update/{slug}/profile/", response=ProfileDetailSchema)
    def update_profile(self, slug, data: ProfileOutSchema):
        profile = Profile.objects.get(slug=slug)
        for attribute, value in data.dict().items():
            setattr(profile, attribute, value)
        profile.save()
        return profile

    @route.delete("/delete/{rep_id}", response={200: None})
    def delete_reprort(self, rep_id: int):
        reprort = Profile.objects.get(pk=rep_id)
        reprort.delete()
        return 200
