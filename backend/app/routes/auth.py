from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas import UserLogin, UserResponse, ForgotPassword
from app.core.security import verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])


def get_user_by_username(db: Session, username: str):
    """Get user by username."""
    return db.query(User).filter(User.username == username).first()


def get_user_by_email(db: Session, email: str):
    """Get user by email."""
    return db.query(User).filter(User.email == email).first()


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    """Login endpoint - returns access token."""
    db_user = get_user_by_username(db, user.username)
    
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    if not db_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive"
        )
    
    if not verify_password(user.password, db_user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    token = create_access_token({"sub": db_user.username})
    return {"access_token": token, "user": UserResponse.from_orm(db_user)}


@router.post("/forgot-password")
def forgot_password(request: ForgotPassword, db: Session = Depends(get_db)):
    """Forgot password endpoint - sends reset email (placeholder)."""
    db_user = get_user_by_email(db, request.email)
    
    if not db_user:
        # For security, don't reveal if email exists
        return {"message": "If the email exists, a reset link has been sent."}
    
    # TODO: Send reset email
    # For now, just return success
    return {"message": "If the email exists, a reset link has been sent."}