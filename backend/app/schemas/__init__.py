from datetime import datetime
from decimal import Decimal
from pydantic import BaseModel, ConfigDict


class UserLogin(BaseModel):
    username: str
    password: str


class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    full_name: str = None


class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    full_name: str | None = None
    is_active: bool
    is_admin: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ForgotPassword(BaseModel):
    email: str


class ProductBase(BaseModel):
    name: str
    sku: str
    category: str | None = None
    description: str | None = None
    unit: str = "pcs"
    quantity: int = 0
    unit_price: Decimal = Decimal("0.00")
    is_active: bool = True


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: str | None = None
    sku: str | None = None
    category: str | None = None
    description: str | None = None
    unit: str | None = None
    quantity: int | None = None
    unit_price: Decimal | None = None
    is_active: bool | None = None


class ProductResponse(ProductBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
