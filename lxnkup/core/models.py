from django.db import models
from django.utils import timezone


class CoreModelManager(models.Manager):
    """Custom manager to handle soft-deleted
    objects and provide additional utilities."""

    def get_queryset(self):
        """Exclude soft-deleted objects by default."""
        return super().get_queryset().filter(is_deleted=False)

    def deleted(self):
        """Include only soft-deleted objects."""
        return super().get_queryset().filter(is_deleted=True)

    def all_with_deleted(self):
        """Include both soft-deleted and non-deleted objects."""
        return super().get_queryset()


class CoreModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False, db_index=True)

    objects = CoreModelManager()

    class Meta:
        abstract = True
        ordering = ["-updated_at"]

    def __str__(self):
        """Provide a default string representation."""
        return f"{self.__class__.__name__} object (ID: {self.pk})"

    def save(self, *args, **kwargs):
        """Custom save logic."""
        if not self.pk:
            self.created_at = timezone.now()
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        """Soft delete the object instead of removing it from the database."""
        if self.status == "deactivated":
            self.is_deleted = True
        self.save()

    def restore(self):
        """Restore a soft-deleted object."""
        self.is_deleted = False
        self.save()

    def hard_delete(self, *args, **kwargs):
        """Permanently delete the object from the database."""
        super().delete(*args, **kwargs)

    def is_edited(self):
        return (self.updated_at - self.created_at).total_seconds() > 1

    edited = property(is_edited)


class DummyCoreModel(CoreModel):
    name = models.CharField(max_length=255)
