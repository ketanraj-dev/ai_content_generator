from fastapi import APIRouter, HTTPException, Depends, Response
from fastapi.security import OAuth2PasswordRequestForm
from app.db.database import SessionLocal
from app.db.user_models import User
from app.core.security import hash_password, verify_password, create_access_token
from app.models.schemas import UserRegister, UserLogin, TokenResponse
from app.core.config import settings

router = APIRouter(prefix="/auth", tags=["auth"])

_is_prod = settings.ENVIRONMENT == "production"

def _set_auth_cookie(response: Response, token: str):
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=_is_prod,
        samesite="none" if _is_prod else "lax",
        max_age=60 * 60,  # 1 hour
    )


@router.post("/register")
def register(data: UserRegister, response: Response):
    db = SessionLocal()

    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        db.close()
        raise HTTPException(status_code=400, detail="Email already registered")

    try:
        hashed = hash_password(data.password)
    except ValueError as e:
        db.close()
        raise HTTPException(status_code=400, detail=str(e))

    new_user = User(
        email=data.email,
        hashed_password=hashed
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Auto-login: set auth cookie immediately
    token = create_access_token({"sub": str(new_user.id)})
    _set_auth_cookie(response, token)

    db.close()
    return {"message": "User created"}


@router.post("/login")
def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends()
):
    db = SessionLocal()

    user = db.query(User).filter(User.email == form_data.username).first()

    if not user or not verify_password(form_data.password, user.hashed_password):
        db.close()
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": str(user.id)})

    # Set HttpOnly Cookie
    _set_auth_cookie(response, token)

    db.close()

    return {"message": "Login successful"}

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out"}