from fastapi import FastAPI
from app.api.routes import router
from app.db.database import engine, Base
from app.db.user_models import User
from app.db.models import Post
from app.api.auth import router as auth_router
from app.api.linkedin_auth import router as linkedin_router
from app.api.user import router as user_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="YouTube to LinkedIn SaaS")

Base.metadata.create_all(bind=engine)

from app.core.config import settings as app_settings

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in app_settings.ALLOWED_ORIGINS.split(",")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)
app.include_router(auth_router)
app.include_router(linkedin_router)
app.include_router(user_router)
