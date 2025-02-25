from passlib.context import CryptContext

def hashed_password(password):
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    hashed_password = pwd_context.hash(password)

    return hashed_password

def verify_password(password:str, hashed_password:str):
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    
    return pwd_context.verify(password, hashed_password)
