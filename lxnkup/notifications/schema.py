from typing import Any

from ninja import Schema

from lxnkup.profiles.schemas import ProfileOutSchema


class NotifsSchema(Schema):
    profile: ProfileOutSchema | None
    actor: int
    level: str
    recipient: int
    unread: bool
    verb: str
    description: str
    target: int
    timestamp: float
    data: dict[str, Any]
