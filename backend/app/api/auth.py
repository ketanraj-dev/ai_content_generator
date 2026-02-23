from fastapi import APIRouter, HTTPException
from app.db.database import SessionLocal
from app.db.user_models import User
from app.core.security import hash_password, verify_password, create_access_token
from app.models.schemas import UserRegister, UserLogin, TokenResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register")
def register(data: UserRegister):
    db = SessionLocal()

    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        db.close()
        raise HTTPException(status_code=400, detail="Email already registered")
    print("Password length:", len(data.password.encode("utf-8")))

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
    db.close()
    return {"message": "User created"}


from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends

@router.post("/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db = SessionLocal()

    user = db.query(User).filter(User.email == form_data.username).first()

    if not user or not verify_password(form_data.password, user.hashed_password):
        db.close()
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": str(user.id)})
    db.close()

    return {"access_token": token}