from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse
from app.core.dependencies import get_current_user
from app.db.database import SessionLocal
from app.db.user_models import User
from app.core.config import settings
import requests
from datetime import datetime, timedelta

router = APIRouter(prefix="/auth/linkedin", tags=["linkedin"])

@router.get("/login")
def linkedin_login(current_user: User = Depends(get_current_user)):
    linkedin_url = (
        "https://www.linkedin.com/oauth/v2/authorization"
        f"?response_type=code"
        f"&client_id={settings.LINKEDIN_CLIENT_ID}"
        f"&redirect_uri={settings.LINKEDIN_REDIRECT_URI}"
        f"&scope=w_member_social openid profile email"
    )

    return RedirectResponse(linkedin_url)

@router.get("/callback")
def linkedin_callback(code: str, current_user: User = Depends(get_current_user)):
    token_url = "https://www.linkedin.com/oauth/v2/accessToken"

    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": settings.LINKEDIN_REDIRECT_URI,
        "client_id": settings.LINKEDIN_CLIENT_ID,
        "client_secret": settings.LINKEDIN_CLIENT_SECRET,
    }

    response = requests.post(token_url, data=data)

    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to get token")

    token_data = response.json()

    access_token = token_data["access_token"]
    expires_in = token_data["expires_in"]

    db = SessionLocal()
    user = db.query(User).filter(User.id == current_user.id).first()

    user.linkedin_access_token = access_token
    user.linkedin_expires_at = datetime.utcnow() + timedelta(seconds=expires_in)

    db.commit()
    db.close()

    return {"message": "LinkedIn connected successfully"}


