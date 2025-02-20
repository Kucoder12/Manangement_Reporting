from typing import Annotated
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends, Form 
from database import get_db
from database.db_connect import *


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
    if await database.verify_email(username)
    
    i
    
@myapp.get('/employes',tags=['Users'])
async def get_employes(database=Depends(get_db)):
    data= await database.get_employes()
    employes = [{'cdi':user[1],'name':user[2],'lastname':user[3],'email':user[4], 'phone':user[5],'role':user[6]} for user in data]

    return employes

@myapp.get('/employes/{name}',tags=['Users'])
async def get_employes_name(name: str, database=Depends(get_db)):
    data= await database.get_employe_name(name)
    employes = [{'cdi':user[1],'name':user[2],'lastname':user[3],'email':user[4], 'phone':user[5],'role':user[6]} for user in data]

    return employes

@myapp.post('/employes/add', tags=['Users'])
async def new_user(cdi:Annotated[str, Form()],name:Annotated[str, Form()], last_name:Annotated[str, Form()], email:Annotated[str, Form()], phone:Annotated[int, Form()], role:Annotated[str, Form()], database=Depends(get_db)):
    await database.add_employe(cdi, name,last_name,email, phone,role)
    return {"message":"Se ha insertado el empleado correctamente"}

@myapp.post('employes/{employe_cdi}/delete')
async def delete_employe(employe_cdi:str, database=Depends(get_db)):
    try:
        await database.delete_employe(employe_cdi)
        return {'message':'Se ha eliminado correctamente'}
    except:
        return {'message':'Ha habido un error al eliminar el empleado'}


@myapp.get('/projects', tags=['Projects'])
async def get_projects(database=Depends(get_db)):
    data=await database.get_projects()
    projects=[{'name':project[1],
               'address':project[2],
               'description':project[3],
               'start_date':project[4],
               'end_date':project[5],
               'state':project[6],
               'employe':project[7]}
               for project in data]
    
    return projects

@myapp.get('/projects/{name}', tags=['Projects'])
async def get_projects(name:str,database=Depends(get_db)):
    data = await database.get_project_name(name)
    project=[{'name':data[1],
               'address':data[2],
               'description':data[3],
               'start_date':data[4],
               'end_date':data[5],
               'state':data[6],
               'employe':data[7]}
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

@myapp.post('/projects/{project_name}/delete')
async def delete_project(project_name:str, database=Depends(get_db)):
    try:
        await database.delete_project(project_name)
        return{'message':'Se ha eliminado correctamente'}
    except:
        return {'message':'Ha habido un error'}
        
    