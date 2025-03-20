from django.shortcuts import get_object_or_404
from ninja_extra import ModelControllerBase  # type: ignore[PGH003]
from ninja_extra import api_controller  # type: ignore[PGH003]
from ninja_extra import permissions  # type: ignore[PGH003]
from ninja_extra import route  # type: ignore[PGH003]

from lxnkup.activities.models import Likes
from lxnkup.activities.models import Lists
from lxnkup.activities.schema import ListCreateSchema
from lxnkup.activities.schema import ListOutSchema


@api_controller(
    "/List/",
    tags=["lists"],
    permissions=[permissions.IsAuthenticatedOrReadOnly],
)
class ListModelController(ModelControllerBase):
    @route.get("all/", response=list[ListOutSchema])
    def get_s(self):
        return Lists.objects.all()

    @route.get("/{slug}/", response=ListOutSchema)
    def get_lists_by_slug(self, slug: str):
        return get_object_or_404(Lists, slug=slug)

    @route.post("/create/report", response={201: ListCreateSchema})
    def create_report(self, listt: ListCreateSchema):
        Lists.objects.create(**list.dict())
        return list

    @route.post("/update/{slug}/Lists/", response=ListOutSchema)
    def update_lists(self, slug, data: ListOutSchema):
        lis = Lists.objects.get(slug=slug)
        for attribute, value in data.dict().items():
            setattr(Lists, attribute, value)
        lis.save()
        return lis

    @route.delete("/delete/{list_id}", response={200: None})
    def delete_list(self, list_id: int):
        lis = Lists.objects.get(pk=list_id)
        lis.delete()
        return 200


@api_controller(
    "/Likes",
    tags=["likes"],
    permissions=[permissions.IsAuthenticatedOrReadOnly],
)
class LikeModelController(ModelControllerBase):
    @route.get("all/")
    def get_likes(self):
        return Likes.objects.all()
