from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
import pymysql

# ✅ MySQL Database Connection
DATABASE_URL = "mysql+pymysql://root:12345678@localhost/Flywings"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False)

# ✅ FastAPI Initialization
app = FastAPI()

# ✅ CORS Middleware to Allow Frontend Requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],  
    allow_headers=["*"],  
)

# ✅ Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ✅ Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Pydantic Model for Signup
class UserSignup(BaseModel):
    first_name: str
    last_name: str = None
    username: str
    password: str
    email: EmailStr
    phone_no: str = None

# ✅ Pydantic Model for Login
class UserLogin(BaseModel):
    username: str
    password: str
def hash_password(password: str):
    return pwd_context.hash(password)
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
@app.post("/signup/")
def signup(user: UserSignup, db: Session = Depends(get_db)):
    check_user_query = text("SELECT * FROM users WHERE username = :username OR email = :email")
    existing_user = db.execute(check_user_query, {"username": user.username, "email": user.email}).fetchone()

    if existing_user:
        raise HTTPException(status_code=400, detail="Username or email already exists")
    hashed_password = hash_password(user.password)
    insert_user_query = text("""
        INSERT INTO users (first_name, last_name, username, password, email, phone_no, secret_key, user_type)
        VALUES (:first_name, :last_name, :username, :password, :email, :phone_no, :secret_key, :user_type)
    """)

    try:
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

@app.post("/login/")
def login(user: UserLogin, db: Session = Depends(get_db)):
    # Retrieve user by username
    check_user_query = text("SELECT username, password FROM users WHERE username = :username")
    db_user = db.execute(check_user_query, {"username": user.username}).fetchone()

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    stored_username, stored_password = db_user
    if not verify_password(user.password, stored_password):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    return {"message": "Login successful", "username": stored_username}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
