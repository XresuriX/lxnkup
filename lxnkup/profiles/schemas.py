from ninja import ModelSchema  # type: ignore[PGH003]
from ninja import Schema  # type: ignore[PGH003]

from lxnkup.profiles.models import Profile
from lxnkup.profiles.models import User


class UserSchema(ModelSchema):
    """Simple user schema for helping profile schema"""

    id: int
    name: str
    email: str

    class Meta:
        model = User
        fields = ("id", "name", "email")


class ProfileOutSchema(ModelSchema):
    """Simple profile schema"""

    user: UserSchema
    slug: str | None
    avatar: str | None
    about: str | None

    class Meta:
        model = Profile
        fields = (
            "user",
            "avatar",
            "about",
            "slug",
        )


class ProfileDetailSchema(Schema):
    """Simple profile schema"""

    user: UserSchema
    slug: str | None
    avatar: str | None
    about: str | None
    location: str
    is_visible: bool
    dob_visible: bool

    class Meta:
        model = Profile
        fields = (
            "user",
            "avatar",
            "about",
            "slug",
            "location",
            "is_visible",
            "dob_visible",
            "is_nsfw",
        )


class Error(Schema):
    message: str
