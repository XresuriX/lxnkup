from ninja_extra import NinjaExtraAPI  # type: ignore [PGH003]

from lxnkup.activities.api import ListModelController
from lxnkup.comments.api import CommentsController
from lxnkup.medialog.api import GalleriesModelController
from lxnkup.medialog.api import PhotosModelController
from lxnkup.notifications.api import NotificationController
from lxnkup.posts.api import PostModelController
from lxnkup.profiles.api import ProfileModelController
from lxnkup.reports.api import ReportModelController

app = NinjaExtraAPI()

app.register_controllers(ListModelController)
app.register_controllers(CommentsController)
app.register_controllers(NotificationController)
app.register_controllers(ProfileModelController)
app.register_controllers(PostModelController)
app.register_controllers(PhotosModelController)
app.register_controllers(GalleriesModelController)
app.register_controllers(ReportModelController)
