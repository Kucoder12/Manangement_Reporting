from passlib.context import CryptContext

async def hashed_password(password):
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    # Hashear la contraseña
    hashed_password = pwd_context.hash(password)
    return hashed_password

    # Verificar la contraseña
    #is_correct = pwd_context.verify(password, hashed_password)
    #print(is_correct)  # True si las contraseñas coinciden