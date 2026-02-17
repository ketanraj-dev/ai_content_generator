from pydantic import BaseModel
from typing import Optional, List


class BlogState(BaseModel):
    youtube_url: str
    title: Optional[str] = None
    transcript: Optional[str] = None
    processed_content: Optional[str] = None
    blog_content: Optional[str] = None
    seo_title: Optional[str] = None
    tags: Optional[List[str]] = None
    published_url: Optional[str] = None
