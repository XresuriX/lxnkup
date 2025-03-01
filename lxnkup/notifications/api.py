from ninja_extra import ModelConfig  # type: ignore[PGH003]
from ninja_extra import ModelControllerBase  # type: ignore[PGH003]
from ninja_extra import ModelSchemaConfig  # type: ignore[PGH003]
from ninja_extra import api_controller  # type: ignore[PGH003]
from ninja_extra import permissions  # type: ignore[PGH003]

from lxnkup.notifications.models import Notification
from lxnkup.notifications.schema import NotifsSchema


@api_controller(
    "/Notifications/",
    tags=["notifications"],
    permissions=[permissions.IsAuthenticatedOrReadOnly],
)
class NotificationController(ModelControllerBase):
    model_config = ModelConfig(
        model=Notification,
        allowed_routes=["find_one", "list", "delete"],
        retrieve_schema=NotifsSchema,
        schema_config=ModelSchemaConfig(read_only_fields=["id"]),
    )

    """@route.get('/list_all', response=List[NotifsSchema])
    def notifs_all(self,request,):
        return Notification.objects.all()
"""
