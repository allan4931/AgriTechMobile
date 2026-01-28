from pydantic import BaseModel
from typing import List

class FarmerRecordCreate(BaseModel):
    farmer_name: str
    id_number: str
    phone_number: str
    crop_type: str
    farm_size: str
    clerk_email: str

class FarmerRecordResponse(BaseModel):
    id: int
    farmer_name: str
    id_number: str
    phone_number: str
    crop_type: str
    farm_size: str
    clerk_email: str
    timestamp: str