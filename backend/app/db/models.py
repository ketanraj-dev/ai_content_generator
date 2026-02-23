from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.db.database import Base
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    youtube_url = Column(String, nullable=False)
    draft = Column(String, nullable=False)
    published = Column(Boolean, default=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User")
