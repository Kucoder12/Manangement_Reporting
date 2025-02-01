from fastapi import FastAPI, HTTPException, Depends, Form
from database import get_db
from database.base_de_datos import Connection_Database


myapp = FastAPI()

myapp.post('/users')
async def new_user(name:str, last_name:str, email:str, phone:int, role:str, database=Depends(get_db)):
    database.add_employe(name,last_name,email, phone,role)
    return {"message":"Se ha insertado el empleado correctamente"}