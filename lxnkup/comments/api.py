from django.shortcuts import get_object_or_404
from ninja_extra import api_controller  # type: ignore[PGH003]
from ninja_extra import permissions  # type: ignore[PGH003]
from ninja_extra import route  # type: ignore[PGH003]

from lxnkup.comments.models import Comments
from lxnkup.comments.schema import CommentsSchema


@api_controller(
    "/Comment/",
    tags=["Comment"],
    permissions=[permissions.IsAuthenticatedOrReadOnly],
)
class CommentsController:
    @route.get("all/", response=list[CommentsSchema])
    def get_commnet(self):
        return Comments.objects.all()

    @route.get("/{slug}/", response=CommentsSchema)
    def get_commnet_by_slug(self, slug: str):
        return get_object_or_404(Comments, slug=slug)

    @route.post("/update/{slug}/commnet/", response=CommentsSchema)
    def update_commnet(self, slug, data: CommentsSchema):
        commnet = Comments.objects.get(slug=slug)
        for attribute, value in data.dict().items():
            setattr(commnet, attribute, value)
        commnet.save()
        return commnet

    @route.delete("/delete/{post_id}", response={200: None})
    def delete_post(self, post_id: int):
        post = Comments.objects.get(pk=post_id)
        post.delete()
        return 200
