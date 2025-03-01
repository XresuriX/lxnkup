from ninja import Schema  # type: ignore[PGH003]

from lxnkup.core.schema import ContentTypeSchema
from lxnkup.profiles.schemas import ProfileOutSchema


class CommentsSchema(Schema):
    content_type: ContentTypeSchema
    profile: ProfileOutSchema | None
    title: str
    media: str
    link: str
    likes: int
    dislikes: int
    object_pk: str
    content_object: list[int, str]
