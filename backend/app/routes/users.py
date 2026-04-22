from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/")
def list_users():
    """List all users"""
    return {"message": "List users endpoint"}


@router.post("/")
def create_user():
    """Create a new user"""
    return {"message": "Create user endpoint"}
