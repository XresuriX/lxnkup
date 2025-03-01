from django.shortcuts import get_object_or_404
from ninja_extra import ModelControllerBase  # type: ignore[PGH003]
from ninja_extra import api_controller  # type: ignore[PGH003]
from ninja_extra import permissions  # type: ignore[PGH003]
from ninja_extra import route  # type: ignore[PGH003]

from lxnkup.reports.models import Reports
from lxnkup.reports.schemas import ReportCreateSchema
from lxnkup.reports.schemas import ReportOutSchema
from lxnkup.reports.schemas import ReportUpdateSchema


@api_controller(
    "/Reports",
    tags=["Reports"],
    permissions=[permissions.IsAuthenticatedOrReadOnly],
)
class ReportModelController(ModelControllerBase):
    @route.get("all/", response=list[ReportOutSchema])
    def get_reports(self, report_type: str | None):
        return Reports.objects.all(report_type__icontains=report_type)

    @route.get("/{slug}/", response=ReportOutSchema)
    def get_profile(self, slug: str):
        return get_object_or_404(Reports, slug=slug)

    @route.post("/create/report", response={201: ReportCreateSchema})
    def create_report(self, report: ReportCreateSchema):
        Reports.objects.create(**report.dict())
        return report

    @route.post("/update/{slug}/report/", response=ReportUpdateSchema)
    def update_report_location(
        self, slug, report_type: str | None, data: ReportOutSchema
    ):
        report = Reports.objects.get(slug=slug)
        for attribute, value in data.dict().items():
            setattr(report, attribute, value)
        report.save()
        return report

    @route.delete("/delete/{rep_id}", response={200: None})
    def delete_reprort(self, rep_id: int):
        reprort = Reports.objects.get(pk=rep_id)
        reprort.delete()
        return 200

    """"user_model = Reports
    @route.get("/list_all", response=list[ReportOutSchema])
    def all_reports(
        self,
        request,
    ):
        return Reports.objects.all()

    @route.post("create/", response={200: ReportCreateSchema})
    def create_report(self, payload: ReportOutSchema):
        return Reports.objects.create(
            reporter=payload.reporter,
            url=payload.url,
            status=payload.status,
            report_type=payload.report_type,
            report_investigation_comments=payload.report_investigation_comments,
            reported_content_type=payload.reported_content_type,
            reported_object_id=payload.reported_object_id,
            reported_content=payload.reported_content,
        )

    @route.post("update/{int:rep_id}", response={200: ReportCreateSchema})
    def update_report(self, payload: ReportOutSchema, rep_id):
        update_report = Reports.objects.get(pk=rep_id)
        update_report.objects.update(reporter=payload.reporter,
            url=payload.url,
            status=payload.status,
            report_type=payload.report_type,
            report_investigation_comments=payload.report_investigation_comments,
            reported_content_type=payload.reported_content_type,
            reported_object_id=payload.reported_object_id,
            reported_content=payload.reported_content,
        )
        return update_report




@api_controller("/events")
class EventModelController(ModelControllerBase):
    service = CustomParamsModelService(model=Event)
    get_event = ModelEndpointFactory.find_one(
        path="/{str:slug}",
        lookup_param="slug",
        schema_out=EventSchema,
        object_getter=lambda self, slug, **kwargs: self.service.get_by_slug(slug)
    )"""
