from django.shortcuts import get_object_or_404
from ninja_extra import ModelControllerBase  # type: ignore[PGH003]
from ninja_extra import api_controller  # type: ignore[PGH003]
from ninja_extra import permissions  # type: ignore[PGH003]
from ninja_extra import route  # type: ignore[PGH003]

from lxnkup.posts.models import Posts
from lxnkup.posts.schemas import PostsSchema


@api_controller(
    "/Posts",
    tags=["Post"],
    permissions=[permissions.IsAuthenticatedOrReadOnly],
)
class PostModelController(ModelControllerBase):
    @route.get("all/", response=list[PostsSchema])
    def get_posts(self):
        return Posts.objects.all()

    @route.get("/{slug}/", response=PostsSchema)
    def get_posts_by_slug(self, slug: str):
        return get_object_or_404(Posts, slug=slug)

    @route.post("/create/report", response={201: PostsSchema})
    def create_report(self, post: PostsSchema):
        Posts.objects.create(**post.dict())
        return post

    @route.post("/update/{slug}/Posts/", response=PostsSchema)
    def update_posts(self, slug, data: PostsSchema):
        posts = Posts.objects.get(slug=slug)
        for attribute, value in data.dict().items():
            setattr(posts, attribute, value)
        posts.save()
        return posts

    @route.delete("/delete/{post_id}", response={200: None})
    def delete_post(self, post_id: int):
        post = Posts.objects.get(pk=post_id)
        post.delete()
        return 200
