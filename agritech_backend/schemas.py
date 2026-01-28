from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# --- Farmer Schemas ---
class FarmerBase(BaseModel):
    farmer_name: str
    crop: str
    farm_type: str
    location: str

class FarmerCreate(FarmerBase):
    pass

class FarmerResponse(FarmerBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True

# --- Auth & User Schemas ---
class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    status: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str