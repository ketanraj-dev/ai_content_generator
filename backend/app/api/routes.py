from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from datetime import datetime, timedelta

from app.core.dependencies import get_current_user
from app.models.schemas import (
    GenerateRequest,
    PublishRequest,
    UpdateDraftRequest,
    PostResponse,
)
from app.services.youtube_service import get_transcript
from app.services.ai_service import generate_post
from app.services.linkedin_service import publish_post
from app.db.database import get_db
from app.db.models import Post
from app.db.user_models import User
from app.core.config import settings

PLAN_LIMITS = {"free": 3, "pro": 999999}

router = APIRouter()


# 🔥 Generate Post
@router.post("/generate")
async def generate(
    data: GenerateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # ─── Enforce plan usage limits ───
    plan = current_user.plan or "free"
    limit = PLAN_LIMITS.get(plan, 3)
    month_start = datetime.utcnow().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    posts_this_month = (
        db.query(Post)
        .filter(Post.user_id == current_user.id, Post.created_at >= month_start)
        .count()
    )
    if posts_this_month >= limit:
        raise HTTPException(
            status_code=402,
            detail=f"You've reached your {plan} plan limit of {limit} posts this month. Upgrade to Pro for unlimited posts.",
        )

    try:
        transcript = get_transcript(data.youtube_url)
        post_text = generate_post(
            transcript,
            tone=current_user.pref_tone or "professional",
            post_length=current_user.pref_post_length or "medium",
            hashtags=current_user.pref_hashtags or "",
        )

        new_post = Post(
            youtube_url=data.youtube_url,
            draft=post_text,
            published=False,
            user_id=current_user.id,
        )

        db.add(new_post)
        db.commit()
        db.refresh(new_post)

        return {"id": new_post.id, "draft": post_text}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# 🔥 Update Draft
@router.put("/update")
async def update_draft(
    data: UpdateDraftRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    post = db.query(Post).filter(
        Post.id == data.id,
        Post.user_id == current_user.id,
    ).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    post.draft = data.content
    db.commit()

    return {"status": "updated"}


# 🔥 Publish Post
@router.post("/publish")
async def publish(
    data: PublishRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    post = db.query(Post).filter(
        Post.id == data.id,
        Post.user_id == current_user.id,
    ).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    if not current_user.linkedin_access_token:
        raise HTTPException(
            status_code=400,
            detail="LinkedIn not connected"
        )

    # Resolve the person URN for this user
    person_urn = current_user.linkedin_urn or settings.LINKEDIN_PERSON_URN

    try:
        publish_post(post.draft, current_user.linkedin_access_token, person_urn)

    except Exception:
        # 🔥 If LinkedIn fails (revoked / expired token)
        current_user.linkedin_access_token = None
        current_user.linkedin_expires_at = None
        db.commit()

        raise HTTPException(
            status_code=400,
            detail="LinkedIn session expired. Please reconnect."
        )

    post.published = True
    db.commit()

    return {"status": "published"}


# 🔥 Get All User Posts
@router.get("/posts", response_model=List[PostResponse])
async def get_posts(current_user: User = Depends(get_current_user),db: Session = Depends(get_db),):
    posts = db.query(Post).filter(Post.user_id == current_user.id).all()
    return posts

