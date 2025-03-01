from datetime import datetime

from ninja import Schema  # type: ignore PGH003

from lxnkup.medialog.models import Gallery
from lxnkup.medialog.models import Photo


class PhotosSchema(Schema):
    title: str
    image: str
    slug: str
    caption: str | None
    date_added: datetime
    is_public: bool
    date_taken: datetime
    view_count: int
    effect: int
    crop_from: str

    class Meta:
        model = Photo
        exclude = ["", ""]


class GalleriesSchema(Schema):
    date_added: datetime
    title: str
    slug: str
    description: str | None
    is_public: bool
    photos: PhotosSchema | None

    class Meta:
        model = Gallery
