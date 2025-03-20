from ninja import Schema  # type: ignore[PGH003]

from lxnkup.activities.models import Lists
from lxnkup.core.schema import ContentTypeSchema
from lxnkup.profiles.schemas import ProfileDetailSchema


# Schema for creating a report
class ListCreateSchema(Schema):
    name: str
    owner: ProfileDetailSchema
    content_type: ContentTypeSchema
    object_pk: int
    content_object: list[int, str] | None
    is_public: bool

    class Meta:
        model = Lists
        exclude = ["is_deleted"]


# Schema for retrieving a report
class ListOutSchema(ListCreateSchema):
    class Meta:
        model = Lists


# Schema for updating a report
class ListUpdateSchema(ListCreateSchema):
    name: str | None = None

    class Meta:
        model = Lists
