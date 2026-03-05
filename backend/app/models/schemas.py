from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class GenerateRequest(BaseModel):
    youtube_url: str


class PublishRequest(BaseModel):
    id: int


class PostResponse(BaseModel):
    id: int
    youtube_url: str
    draft: str
    published: bool
    created_at: datetime

    class Config:
        from_attributes = True  # important for SQLAlchemy


class UpdateDraftRequest(BaseModel):
    id: int
    content: str

class UserRegister(BaseModel):
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ─── User Profile / Preferences ───

class UserProfileResponse(BaseModel):
    id: int
    email: str
    plan: str
    posts_used: int
    posts_limit: int
    created_at: datetime

    class Config:
        from_attributes = True


class UserPreferencesRequest(BaseModel):
    tone: Optional[str] = None
    post_length: Optional[str] = None
    hashtags: Optional[str] = None


class UserPreferencesResponse(BaseModel):
    tone: str
    post_length: str
    hashtags: str
