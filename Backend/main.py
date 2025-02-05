from fastapi import FastAPI, HTTPException, Depends, Form
from database import get_db
from database.db_connect import *


myapp = FastAPI()
myapp.title = "Good Service API"

@myapp.get('/users/all')
async def get_users(database=Depends(get_db)):
    employes=database.get_users_all()
    data = await [{'name':user[0],'lastname':user[1],'email':user[2]} for user in employes]

    return data

@myapp.post('/users', tags=['Users'])
async def new_user(name:str, last_name:str, email:str, phone:int, role:str, database=Depends(get_db)):
    await database.add_employe(name,last_name,email, phone,role)
    return {"message":"Se ha insertado el empleado correctamente"}

    