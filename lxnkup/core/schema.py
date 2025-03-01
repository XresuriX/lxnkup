from django.contrib.contenttypes.models import ContentType
from ninja import Schema  # type: ignore  # noqa: PGH003


class ContentTypeSchema(Schema):
    app_label: str
    model: str

    class Meta:
        model = ContentType
