from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(title="YouTube to LinkedIn SaaS")

app.include_router(router)
