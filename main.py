from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
import os
import pymysql

# ✅ Database Connection
DATABASE_URL = "mysql+pymysql://root:12345678@localhost/Flywings"
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False)

# ✅ Initialize FastAPI
app = FastAPI()

# ✅ Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# ✅ Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ✅ Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Pydantic Models
class UserSignup(BaseModel):
    first_name: str
    last_name: str = None
    username: str
    password: str
    email: EmailStr
    phone_no: str = None

class UserLogin(BaseModel):
    username: str
    password: str

# ✅ Utility Functions
def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# ✅ User Signup API
@app.post("/signup/")
def signup(user: UserSignup, db: Session = Depends(get_db)):
    try:
        check_user_query = text("SELECT * FROM users WHERE username = :username OR email = :email")
        existing_user = db.execute(check_user_query, {"username": user.username, "email": user.email}).fetchone()

        if existing_user:
            raise HTTPException(status_code=400, detail="Username or email already exists")

        hashed_password = hash_password(user.password)
        insert_user_query = text("""
            INSERT INTO users (first_name, last_name, username, password, email, phone_no, secret_key, user_type)
            VALUES (:first_name, :last_name, :username, :password, :email, :phone_no, :secret_key, :user_type)
        """)

        db.execute(insert_user_query, {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "username": user.username,
            "password": hashed_password,
            "email": user.email,
            "phone_no": user.phone_no,
            "secret_key": "user_secret_key",
            "user_type": "client"
        })
        db.commit()
        return {"message": "User created successfully"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database Error: {str(e)}")

# ✅ User Login API
@app.post("/login/")
def login(user: UserLogin, db: Session = Depends(get_db)):
    try:
        check_user_query = text("SELECT username, password FROM users WHERE username = :username")
        db_user = db.execute(check_user_query, {"username": user.username}).fetchone()

        if not db_user:
            raise HTTPException(status_code=401, detail="Invalid username or password")

        stored_username, stored_password = db_user
        if not verify_password(user.password, stored_password):
            raise HTTPException(status_code=401, detail="Invalid username or password")

        return {"message": "Login successful", "username": stored_username}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

# ✅ Case Retrieval API (Load CSV)
CSV_PATH = "completecitation.csv"

@app.get("/cases")
def get_cases():
    if not os.path.exists(CSV_PATH):
        raise HTTPException(status_code=404, detail="Case data file not found")

    try:
        df = pd.read_csv(CSV_PATH)

        # ✅ Ensure required columns exist
        required_columns = ["title", "summary", "judge", "jurisdiction", "case_no", "citation", "categories", "pdf_url"]
        for col in required_columns:
            if col not in df.columns:
                df[col] = "N/A"  # Fill missing columns with "N/A"

        # ✅ Convert NaN values to "N/A"
        df = df.fillna("N/A")

        # ✅ Convert DataFrame to JSON-compatible format
        cases_list = df.to_dict(orient="records")
        return {"total_cases": len(cases_list), "cases": cases_list}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing cases: {str(e)}")

# ✅ Default Route
@app.get("/")
def root():
    return {"message": "FastAPI server is running!"}

# ✅ Run FastAPI Server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
