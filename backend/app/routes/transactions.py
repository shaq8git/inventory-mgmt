from fastapi import APIRouter

router = APIRouter(prefix="/transactions", tags=["transactions"])


@router.get("/")
def list_transactions():
    """List all transactions"""
    return {"message": "List transactions endpoint"}


@router.post("/")
def create_transaction():
    """Create a new transaction"""
    return {"message": "Create transaction endpoint"}
