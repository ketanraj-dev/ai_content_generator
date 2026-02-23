from fastapi import APIRouter, HTTPException,Depends
from app.core.dependencies import get_current_user
from app.models.schemas import GenerateRequest, PublishRequest, UpdateDraftRequest, PostResponse,UserRegister, UserLogin, TokenResponse
from app.services.youtube_service import get_transcript
from app.services.ai_service import generate_post
from app.services.linkedin_service import publish_post
from app.db.database import SessionLocal
from app.db.models import Post
from app.db.user_models import User
from typing import List

router = APIRouter()




@router.post("/generate")
async def generate(
    data: GenerateRequest,
    current_user: User = Depends(get_current_user)
):
    try:
        transcript = get_transcript(data.youtube_url)
        post_text = generate_post(transcript)

        db = SessionLocal()
        new_post = Post(
            youtube_url=data.youtube_url,
            draft=post_text,
            published=False,
            user_id=current_user.id
        )
        db.add(new_post)
        db.commit()
        db.refresh(new_post)
        db.close()

        return {"id": new_post.id, "draft": post_text}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))    

@router.put("/update")
async def update_draft(data: UpdateDraftRequest):
    db = SessionLocal()
    post = db.query(Post).filter(Post.id == data.id).first()

    if not post:
        db.close()
        raise HTTPException(status_code=404, detail="Post not found")

    post.draft = data.content
    db.commit()
    db.close()

    return {"status": "updated"}



@router.post("/publish")
async def publish(
    data: PublishRequest,
    current_user: User = Depends(get_current_user)
):
    try:
        db = SessionLocal()
        post = db.query(Post).filter(
            Post.id == data.id,
            Post.user_id == current_user.id
        ).first()

        if not post:
            db.close()
            raise HTTPException(status_code=404, detail="Post not found")

        if not current_user.linkedin_access_token:
            raise HTTPException(status_code=400, detail="LinkedIn not connected")
        publish_post(post.draft, current_user.linkedin_access_token)
        post.published = True
        db.commit()
        db.close()

        return {"status": "published"}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))




@router.get("/posts", response_model=List[PostResponse])
async def get_posts(current_user: User = Depends(get_current_user)):
    db = SessionLocal()
    posts = db.query(Post).filter(Post.user_id == current_user.id).all()
    db.close()
    return posts
