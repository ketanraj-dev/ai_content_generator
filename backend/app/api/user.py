from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.db.user_models import User
from app.db.models import Post
from app.models.schemas import (
    UserProfileResponse,
    UserPreferencesRequest,
    UserPreferencesResponse,
)

router = APIRouter(prefix="/user", tags=["user"])

PLAN_LIMITS = {
    "free": 3,
    "pro": 999999,  # unlimited
}


@router.get("/me", response_model=UserProfileResponse)
def get_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    posts_count = db.query(Post).filter(Post.user_id == current_user.id).count()
    limit = PLAN_LIMITS.get(current_user.plan or "free", 3)

    return UserProfileResponse(
        id=current_user.id,
        email=current_user.email,
        plan=current_user.plan or "free",
        posts_used=posts_count,
        posts_limit=limit,
        created_at=current_user.created_at,
    )


@router.get("/preferences", response_model=UserPreferencesResponse)
def get_preferences(current_user: User = Depends(get_current_user)):
    return UserPreferencesResponse(
        tone=current_user.pref_tone or "professional",
        post_length=current_user.pref_post_length or "medium",
        hashtags=current_user.pref_hashtags or "",
    )


@router.put("/preferences", response_model=UserPreferencesResponse)
def update_preferences(
    data: UserPreferencesRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if data.tone is not None:
        if data.tone not in ("professional", "casual", "storytelling"):
            raise HTTPException(status_code=400, detail="Invalid tone value")
        current_user.pref_tone = data.tone

    if data.post_length is not None:
        if data.post_length not in ("short", "medium", "long"):
            raise HTTPException(status_code=400, detail="Invalid post_length value")
        current_user.pref_post_length = data.post_length

    if data.hashtags is not None:
        current_user.pref_hashtags = data.hashtags

    db.commit()
    db.refresh(current_user)

    return UserPreferencesResponse(
        tone=current_user.pref_tone or "professional",
        post_length=current_user.pref_post_length or "medium",
        hashtags=current_user.pref_hashtags or "",
    )


@router.delete("/account")
def delete_account(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # Delete all posts belonging to this user
    db.query(Post).filter(Post.user_id == current_user.id).delete()

    # Delete the user
    db.query(User).filter(User.id == current_user.id).delete()

    db.commit()

    return {"message": "Account deleted"}
