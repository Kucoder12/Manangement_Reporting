import string
import secrets

def generate_password(name:str,last_name:str,phone:int):
    phone_str = str(phone)
    password = f"{name[0].upper()}{last_name[0:3].lower()}{phone_str[-3:]}!"
    
    return password


