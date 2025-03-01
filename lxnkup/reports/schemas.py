from ninja import Schema  # type: ignore[PGH003]

from lxnkup.core.schema import ContentTypeSchema
from lxnkup.profiles.schemas import ProfileDetailSchema
from lxnkup.reports.models import Reports


# Schema for creating a report
class ReportCreateSchema(Schema):
    reporter: ProfileDetailSchema
    url: str | None = None
    report_type: str
    report_comments: str | None = None
    report_investigation_comments: str | None = None
    reported_content: list[int, str] | None
    reported_content_type: ContentTypeSchema
    reported_object_id: int

    class Meta:
        model = Reports
        exclude = ["is_deleted", "reproter", "status"]


# Schema for retrieving a report
class ReportOutSchema(ReportCreateSchema):
    status: str = Reports.STATUS.INITIATED

    class Meta:
        model = Reports


# Schema for updating a report
class ReportUpdateSchema(ReportCreateSchema):
    status: str | None = None
    report_investigation_comments: str | None = None

    class Meta:
        model = Reports
