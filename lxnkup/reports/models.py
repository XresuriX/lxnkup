from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.utils.translation import gettext_lazy as _

from lxnkup.core.models import CoreModel
from lxnkup.users.models import User


class Reports(CoreModel):
    """Model for reporting."""

    class STATUS(models.TextChoices):
        INITIATED = "INITIATED"
        VERIFIED = "VERIFIED"
        RESOLVED = "RESOLVED"
        REJECTED = "REJECTED"
        REDACTED = "REDACTED"

    STATUS_HELP_TEXT = """
        1. Anyone can create a report. Does not mean it is valid.
        2. Report is valid and further actions can be taken.
        3. The report was verified but is no longer valid. The problem has been solved.
        4. Verified and found the report has no basis. Fake/Invalid.
        5. User is withdrawing the report.
    """

    class TYPE(models.TextChoices):
        HATE = "HATE"
        ABUSE_HARASSMENT = "ABUSE and HARASSMENT"
        VIOLENT_SPEECH = "VIOLENT SPEECH"
        CHILD_SAFETY = "CHILD SAFETY"
        PRIVACY = "PRIVACY"
        SPAM = "SPAM"
        SUICIDE = "SUICIDE or SELF-HARM"
        SENSITIVE_MEDIA = "SENSITIVE or DISTURBING MEDIA"
        IMPERSONATION = "IMPERSONATION"
        VIOLENT_GROUP = "VIOLENT & HATEFUL GROUPS"

    TYPE_HELP_TEXT = """
        1. Slurs, racist or sexist stereotypes, dehumanization, incitement of fear or
        discrimination, hateful references, hateful symbols & logos.
        2. Insults, unwanted sexual content & graphic objectification, unwanted NSFW &
        graphic content,
        violent event denial, targeted harassment, and inciting harassment.
        3. Violent threats, wish of harm, glorification of violence, incitement of
        violence, coded incitement of violence.
        4. Child sexual exploitation, grooming, physical child abuse, underage user.
        5. Sharing private information, threatening to share/expose private information,
        sharing non-consensual intimate images, sharing images of me that
         I don’t want on the platform.
        6. Fake engagement, scams, fake accounts, malicious links.
        7. Encouraging, promoting, providing instructions or
        sharing strategies for self-harm.
        8. Graphic content, gratuitous gore, adult nudity & sexual behavior, violent
        sexual conduct, bestiality & necrophilia, media depicting a deceased individual.
        9. Pretending to be someone else, including non-compliant parody/fan accounts.
        10. Violent extremism and terrorism, hate groups & networks.
    """  # noqa: RUF001

    reporter = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="reporter",
        db_index=True,
    )
    url = models.TextField(blank=True, db_index=True)
    status = models.CharField(
        max_length=10,
        choices=STATUS.choices,
        default=STATUS.INITIATED,
        help_text=STATUS_HELP_TEXT,
        db_index=True,
    )
    report_type = models.CharField(
        max_length=100,
        choices=TYPE.choices,
        help_text=TYPE_HELP_TEXT,
        db_index=True,
    )
    report_investigation_comments = models.TextField(blank=True)
    reported_content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    reported_object_id = models.PositiveIntegerField()
    reported_content = GenericForeignKey("reported_content_type", "reported_object_id")

    class Meta:
        app_label = "reports"
        ordering = ["-created_at"]
        verbose_name = _("Report")
        verbose_name_plural = _("Reports")
        db_table_comment = "Model for saving reports against profiles, posts etc"

    def __str__(self):
        return f"Report by {self.reporter} on {self.report_type} - {self.status}"
