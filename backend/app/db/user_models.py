from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.db.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=True)
    provider = Column(String, default="email")
    provider_id = Column(String, nullable=True)

    linkedin_access_token = Column(String, nullable=True)
    linkedin_expires_at = Column(DateTime, nullable=True)
    linkedin_urn = Column(String, nullable=True)

    # Preferences
    pref_tone = Column(String, default="professional")
    pref_post_length = Column(String, default="medium")
    pref_hashtags = Column(String, default="")

    # Plan
    plan = Column(String, default="free")

    created_at = Column(DateTime(timezone=True), server_default=func.now())
