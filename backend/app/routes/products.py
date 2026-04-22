from fastapi import APIRouter

router = APIRouter(prefix="/products", tags=["products"])


@router.get("/")
def list_products():
    """List all products"""
    return {"message": "List products endpoint"}


@router.post("/")
def create_product():
    """Create a new product"""
    return {"message": "Create product endpoint"}
