from fastapi import APIRouter, HTTPException
from app.models.schemas import GenerateRequest, PublishRequest
from app.services.youtube_service import get_transcript
from app.services.ai_service import generate_post
from app.services.linkedin_service import publish_post

router = APIRouter()


@router.post("/generate")
async def generate(data: GenerateRequest):
    try:
        transcript = get_transcript(data.youtube_url)
        post_text = generate_post(transcript)
        return {"draft": post_text}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/publish")
async def publish(data: PublishRequest):
    try:
        publish_post(data.content)
        return {"status": "published"}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))