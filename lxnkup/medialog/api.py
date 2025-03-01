from django.shortcuts import get_object_or_404
from ninja_extra import ModelControllerBase  # type: ignore[PGH003]
from ninja_extra import api_controller  # type: ignore[PGH003]
from ninja_extra import permissions  # type: ignore[PGH003]
from ninja_extra import route  # type: ignore[PGH003]

from lxnkup.medialog.models import Galleries
from lxnkup.medialog.models import Photos
from lxnkup.medialog.schemas import GalleriesSchema
from lxnkup.medialog.schemas import PhotosSchema


@api_controller(
    "/Photos",
    tags=["Photos"],
    permissions=[permissions.IsAuthenticatedOrReadOnly],
)
class PhotosModelController(ModelControllerBase):
    @route.get("/all/", response=list[PhotosSchema])
    def get_photos(self):
        return Photos.objects.all()

    @route.get("/{slug}/", response=PhotosSchema)
    def get_photos_by_slug(self, slug: str):
        return get_object_or_404(Photos, slug=slug)

    @route.post("/create/photo", response={201: PhotosSchema})
    def create_photo(self, photos: PhotosSchema):
        Photos.objects.create(**photos.dict())
        return photos

    @route.post("/update/{slug}/", response=PhotosSchema)
    def update_photos(self, slug, data: PhotosSchema):
        photo = Photos.objects.get(slug=slug)
        for attribute, value in data.dict().items():
            setattr(photo, attribute, value)
        photo.save()
        return photo

    @route.delete("/delete/{photos_id}", response={200: None})
    def delete_photos(self, photos_id: int):
        photos = Photos.objects.get(pk=photos_id)
        photos.delete()
        return 200


@api_controller(
    "/Galleries",
    tags=["galleries"],
    permissions=[permissions.IsAuthenticatedOrReadOnly],
)
class GalleriesModelController(ModelControllerBase):
    @route.get("all/", response=list[GalleriesSchema])
    def get_galleries(self):
        return Galleries.objects.all()

    @route.get("/{slug}/", response=GalleriesSchema)
    def get_galleries_by_slug(self, slug: str):
        return get_object_or_404(Galleries, slug=slug)

    @route.post("/create/gallery", response={201: GalleriesSchema})
    def create_gallery(self, gallery: GalleriesSchema):
        Galleries.objects.create(**gallery.dict())
        return gallery

    @route.post("/update/{slug}/", response=GalleriesSchema)
    def update_gallery(self, slug, data: GalleriesSchema):
        gallery = Galleries.objects.get(slug=slug)
        for attribute, value in data.dict().items():
            setattr(gallery, attribute, value)
        gallery.save()
        return gallery

    @route.delete("/delete/{gallery_id}", response={200: None})
    def delete_gallery(self, gallery_id: int):
        gallery = Galleries.objects.get(pk=gallery_id)
        gallery.delete()
        return 200
