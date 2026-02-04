from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import List
from database import get_db_connection, init_db

import os
from dotenv import load_dotenv
from fastapi import FastAPI

load_dotenv()

app = FastAPI()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# MODELS
class FarmerRecord(BaseModel):
    farmer_name: str
    id_number: str
    phone_number: str
    crop_type: str
    farm_size: str
    clerk_email: str
    localId: str

class AppConfig(BaseModel):
    crops: List[str]
    farm_types: List[str]
    locations: List[str]

class UserRegister(BaseModel):
    username: str
    password: str
    role: str # 'admin' or 'clerk'

@app.on_event("startup")
def startup():
    init_db()

# --- AUTHENTICATION ---

@app.post("/register")
async def register(user: UserRegister):
    conn = get_db_connection()
    try:
        conn.execute('INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
                     (user.username, user.password, user.role))
        conn.commit()
        return {"message": "User registered successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail="User already exists")
    finally:
        conn.close()

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    conn = get_db_connection()
    row = conn.execute('SELECT * FROM users WHERE username = ? AND password = ?',
                        (form_data.username, form_data.password)).fetchone()
    conn.close()
    
    if not row:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    user = dict(row)
    
    return {
        "access_token": user["username"], 
        "token_type": "bearer",
        "role": user["role"]
    }

# --- CLERK DATA SYNC ---

@app.post("/sync-records")
async def sync_records(records: List[FarmerRecord]):
    conn = get_db_connection()
    try:
        for r in records:
            conn.execute('''
                INSERT INTO farmer_records (farmer_name, id_number, phone_number, crop_type, farm_size, clerk_email, localId)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (r.farmer_name, r.id_number, r.phone_number, r.crop_type, r.farm_size, r.clerk_email, r.localId))
        conn.commit()
        return {"status": "success"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

# --- ADMIN VIEW ---

@app.get("/all-records")
async def get_all_records():
    conn = get_db_connection()
    rows = conn.execute('SELECT * FROM farmer_records ORDER BY id DESC').fetchall()
    conn.close()
    return [dict(row) for row in rows]

# --- ADMIN CONFIGURATION ---

@app.post("/set-config")
async def set_config(config: AppConfig):
    conn = get_db_connection()
    try:
        import json
        config_json = json.dumps(config.dict())
        conn.execute('DELETE FROM app_config') 
        conn.execute('INSERT INTO app_config (data) VALUES (?)', (config_json,))
        conn.commit()
        return {"message": "Configuration updated successfully"}
    finally:
        conn.close()

@app.get("/get-config")
async def get_config():
    conn = get_db_connection()
    row = conn.execute('SELECT data FROM app_config LIMIT 1').fetchone()
    conn.close()
    
    if row:
        import json
        return json.loads(row['data'])
    
    # Default fallback options if Admin hasn't set anything yet
    return {
        "crops": ["Maize", "Cotton", "Tobacco"],
        "farm_types": ["Small Scale", "Commercial"],
        "locations": ["Harare", "Bulawayo"]
    }