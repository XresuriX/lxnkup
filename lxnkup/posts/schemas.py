from datetime import datetime

from ninja import Schema

from lxnkup.medialog.schemas import PhotosSchema
from lxnkup.posts.models import Posts


class PostsSchema(Schema):
    date_added: datetime
    title: str
    slug: str
    description: str | None
    is_public: bool
    photos: PhotosSchema | None

    class Meta:
        model = Posts
