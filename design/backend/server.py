from fastapi import FastAPI, APIRouter, UploadFile, File, Form, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
import base64
from datetime import datetime, timezone, timedelta
from passlib.context import CryptContext
import jwt


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create uploads directory
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Serve uploaded files
app.mount("/api/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class LicenseRecord(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    picture_url: Optional[str] = None
    license_no: str
    cnic: str
    name: str
    father_husband_name: str
    license_category: str
    city: str
    issue_date: str
    expiry_date: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class LicenseCreate(BaseModel):
    license_no: str
    cnic: str
    name: str
    father_husband_name: str
    license_category: str
    city: str
    issue_date: str
    expiry_date: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# ===================== LICENSE ENDPOINTS =====================

@api_router.post("/licenses")
async def create_license(
    license_no: str = Form(...),
    cnic: str = Form(...),
    name: str = Form(...),
    father_husband_name: str = Form(...),
    license_category: str = Form(...),
    city: str = Form(...),
    issue_date: str = Form(...),
    expiry_date: str = Form(...),
    picture: Optional[UploadFile] = File(None),
):
    picture_url = None
    if picture and picture.filename:
        ext = picture.filename.split('.')[-1] if '.' in picture.filename else 'jpg'
        filename = f"{uuid.uuid4()}.{ext}"
        file_path = UPLOAD_DIR / filename
        content = await picture.read()
        with open(file_path, "wb") as f:
            f.write(content)
        picture_url = f"/api/uploads/{filename}"

    license_record = LicenseRecord(
        license_no=license_no,
        cnic=cnic.replace("-", ""),  # Store without dashes
        name=name,
        father_husband_name=father_husband_name,
        license_category=license_category,
        city=city,
        issue_date=issue_date,
        expiry_date=expiry_date,
        picture_url=picture_url,
    )
    
    doc = license_record.model_dump()
    await db.licenses.insert_one(doc)
    # Return the original doc without MongoDB's _id field
    return {"status": "success", "data": license_record.model_dump()}

@api_router.get("/licenses")
async def get_all_licenses():
    licenses = await db.licenses.find({}, {"_id": 0}).to_list(1000)
    return {"status": "success", "data": licenses}

@api_router.get("/licenses/verify/{cnic}")
async def verify_license(cnic: str):
    clean_cnic = cnic.replace("-", "")
    license_record = await db.licenses.find_one({"cnic": clean_cnic}, {"_id": 0})
    if not license_record:
        return {"status": "not_found", "message": "No license found for this CNIC"}
    return {"status": "found", "data": license_record}

@api_router.delete("/licenses/{license_id}")
async def delete_license(license_id: str):
    result = await db.licenses.delete_one({"id": license_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="License not found")
    return {"status": "success", "message": "License deleted"}

# ===================== AUTH SETUP =====================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
JWT_SECRET = os.environ.get("JWT_SECRET", "dlims-admin-secret-key-2024")
JWT_ALGORITHM = "HS256"
JWT_EXPIRY_HOURS = 24

class AdminLogin(BaseModel):
    email: str
    password: str

@app.on_event("startup")
async def seed_admin():
    """Create default admin account if it doesn't exist."""
    existing = await db.admins.find_one({"email": "admin@test.com"})
    if not existing:
        hashed = pwd_context.hash("password")
        await db.admins.insert_one({
            "id": str(uuid.uuid4()),
            "email": "admin@test.com",
            "password": hashed,
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logging.getLogger(__name__).info("Admin account created: admin@test.com")
    else:
        # Update password in case it changed
        hashed = pwd_context.hash("password")
        await db.admins.update_one({"email": "admin@test.com"}, {"$set": {"password": hashed}})

@api_router.post("/auth/login")
async def admin_login(data: AdminLogin):
    admin = await db.admins.find_one({"email": data.email})
    if not admin:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if not pwd_context.verify(data.password, admin["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = jwt.encode(
        {
            "email": admin["email"],
            "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRY_HOURS),
        },
        JWT_SECRET,
        algorithm=JWT_ALGORITHM,
    )
    return {"status": "success", "token": token, "email": admin["email"]}

@api_router.get("/auth/verify")
async def verify_token(token: str = ""):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return {"status": "success", "email": payload["email"]}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()