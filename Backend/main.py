from typing import Annotated
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends, Form 
from database import get_db
from database.db_connect import *
from features.generare_password import *
from features.hashing import *


myapp = FastAPI()
myapp.title = "Good Service API"

myapp.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@myapp.post('/login')
async def validateLogin(username:Annotated[str, Form()], password:Annotated[str, Form()], database=Depends(get_db)):
    verified_username = await database.verify_username(username)
    if not verified_username[0]:
        raise HTTPException(status_code=400, detail="Usuario no encontrado")
    
    hashed_password = await database.get_password(username)
    if not verify_password(password, hashed_password[0]):
        raise HTTPException(status_code=400, detail="Contraseña incorrecta")
    
    return {'message':'Las contraseñas coinciden'}
        
#----------------------- EMPLOYES ------------------------
 
@myapp.get('/employes',tags=['Users'])
async def get_employes(database=Depends(get_db)):
    data= await database.get_employes()
    employes = [{'id':user[0],'cdi':user[1],'name':user[2],'lastname':user[3],'email':user[4], 'phone':user[5],'role':user[6]} for user in data]

    return employes

@myapp.get('/employes/{name}',tags=['Users'])
async def get_employes_name(name: str, database=Depends(get_db)):
    data= await database.get_employe_name(name)
    employes = [{'cdi':user[1],'name':user[2],'lastname':user[3],'email':user[4], 'phone':user[5],'role':user[6]} for user in data]

    return employes

@myapp.get('/employes/role/managers', tags=['Users'])
async def get_managers(database = Depends(get_db)):
    data = await database.get_employes_managers()
    managers = [{'id':manager[0],'name':manager[1],'lastname':manager[2]} for manager in data]
    
    return managers

@myapp.post('/employes/add', tags=['Users'])
async def new_user(cdi:Annotated[str, Form()],
                   name:Annotated[str, Form()], 
                   last_name:Annotated[str, Form()], 
                   email:Annotated[str, Form()], 
                   phone:Annotated[int, Form()], 
                   role:Annotated[str, Form()], 
                   database=Depends(get_db)):
    
    await database.add_employe(cdi, name,last_name,email, phone,role)
    username = f"{name[0].lower()}{last_name.lower()}"
    password_employe = generate_password(name,last_name,phone)
    hash_password = hashed_password(password_employe)
    await database.insert_password_default(username,hash_password)
    
    return {"message":f'{password_employe}'}

@myapp.delete('/employes/{employe_cdi}/delete', tags=['Users'])
async def delete_employe(employe_cdi:str, database=Depends(get_db)):
    try:
        await database.delete_employe(employe_cdi)
        return {'message':'Se ha eliminado correctamente'}
    except:
        return {'message':'Ha habido un error al eliminar el empleado'}
    
@myapp.put('/employes/{id_employe}/{field}/{value}/update', tags=['Users'])
async def update_employe(id_employe:int, field:str,value:str, db=Depends(get_db)):
    try:
        await db.update_employe(id_employe,field,value)
        return {'message':'Se ha actualizado correctamente.'}
        
    except:
        return {'message':'Ha habido un error.'}

# ------------------------- PROJECTS ----------------------------


@myapp.get('/projects', tags=['Projects'])
async def get_projects(database=Depends(get_db)):
    data=await database.get_projects()
    projects=[{'name':project[0],
               'address':project[1],
               'description':project[2],
               'start_date':project[3],
               'end_date':project[4],
               'state':project[5],
               'employe':project[6]}
               for project in data]
    
    return projects

@myapp.get('/projects/{name}', tags=['Projects'])
async def get_projects(name:str,database=Depends(get_db)):
    data = await database.get_project_name(name)
    project=[{'name':data[0],
               'address':data[1],
               'description':data[2],
               'start_date':data[3],
               'end_date':data[4],
               'state':data[5],
               'employe':data[6]}
               ]
    
    return project

@myapp.post('/projects/add', tags=['Projects'])
async def add_project(name:Annotated[str, Form()],
                      address:Annotated[str, Form()],
                      description:Annotated[str, Form()],
                      start_date:Annotated[str, Form()],
                      end_date:Annotated[str, Form()],
                      state:Annotated[str, Form()],
                      employe_name:Annotated[str, Form()],
                      database=Depends(get_db)):
    
    await database.add_project(name,address,description,start_date,end_date,state,employe_name)
    return {'message':'Se ha creado creado correctamente el proyecto'}

@myapp.delete('/projects/{project_name}/delete')
async def delete_project(project_name:str, database=Depends(get_db)):
    try:
        await database.delete_project(project_name)
        return{'message':'Se ha eliminado correctamente'}
    except:
        return {'message':'Ha habido un error'}
        
    