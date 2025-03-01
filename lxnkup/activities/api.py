from ninja_extra import ModelConfig  # type: ignore[PGH003]
from ninja_extra import ModelControllerBase  # type: ignore[PGH003]
from ninja_extra import ModelSchemaConfig  # type: ignore[PGH003]
from ninja_extra import api_controller  # type: ignore[PGH003]
from ninja_extra import permissions  # type: ignore[PGH003]

from lxnkup.activities.models import Interactions


@api_controller(
    "/Interactions",
    tags=["Interactions"],
    permissions=[permissions.IsAuthenticatedOrReadOnly],
)
class ActionController(ModelControllerBase):
    model_config = ModelConfig(
        model=Interactions,
        allowed_routes=["find_one", "list", "delete"],
        lookup_field="profile",
        schema_config=ModelSchemaConfig(read_only_fields=["id"]),
        exclude=["tags"],
    )
