from fastapi import FastAPI, HTTPException, Depends, Form
from database import get_db
from database.base_de_datos import Connection_Database


myapp = FastAPI()
myapp.title = "Good Service API"

myapp.get('/users', tags=['Users'])

myapp.post('/users', Form)
async def new_user(name:str, last_name:str, email:str, phone:int, role:str, database=Depends(get_db), tags=['Users']):
    database.add_employe(name,last_name,email, phone,role)
    return {"message":"Se ha insertado el empleado correctamente"}

myapp.get('/users/all')
async def get_users(database=Depends(get_db)):
    employes=database.get_users_all()
    data = [{'name':user[0],'lastname':user[1],'email':user[2]} for user in employes]

    return data    