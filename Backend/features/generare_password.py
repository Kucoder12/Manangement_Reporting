import string
import secrets

def generate_password(length=8):
    # Definir el conjunto de caracteres posibles
    caracteres = string.ascii_letters + string.digits + string.punctuation
    # Generar una contraseña aleatoria de la length especificada
    password = ''.join(secrets.choice(caracteres) for _ in range(length))
    return password


