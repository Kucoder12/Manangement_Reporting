from typing import Annotated
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends, Form 
from database import get_db
from database.db_connect import *
from features.generare_password import *
from features.hashing import *
from datetime import datetime


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
    projects=[{'id':project[0],
               'name':project[1],
               'address':project[2],
               'description':project[3],
               'start_date':project[4],
               'end_date':project[5],
               'state':project[6],
               'employe':project[7],
               'employe_lastname':project[8]}
               for project in data]
    
    return projects

@myapp.get('/projects/{name}', tags=['Projects'])
async def get_projects(name:str,database=Depends(get_db)):
    data = await database.get_project_name(name)
    project=[{'id':data[0],
               'name':data[1],
               'address':data[2],
               'description':data[3],
               'start_date':data[4],
               'end_date':data[5],
               'state':data[6],
               'employe':data[7],
               'employe_lastname':data[8]}
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
    
@myapp.get('/projects/{project_name}/reports', tags=['Reports'])
async def get_reporting(project_name:str, database = Depends(get_db)):
    
    try:
        data = await database.get_reports(project_name)
        reports = [{"id":report[0],
                    "project_name":report[1],
                    "report_date":report[2],
                    "site_name":report[3],
                    "employee_responsible":report[4],
                    "machines_used":report[5],
                    "same_state":report[6],
                    "progress":report[7],
                    "full_day":report[8],
                    "hours_worked":report[9],
                    "tools_condition":report[10],
                    "delays":report[11],
                    "delay_reason":report[12],
                    "comments":report[13],
                    "photos":report[14]}
                    for report in data]
        
        return reports
    
    except:
        raise HTTPException(status_code=400, detail="Error al obtener datos")

@myapp.post('/projects/{project_id}/report/add', tags=['Reports'])
async def add_report(project_id: int,
                    report_date: Annotated[str, Form()],
                    site_name: Annotated[str, Form()],
                    employee_responsible: Annotated[str, Form()],
                    machines_used: Annotated[str, Form()],
                    same_state: Annotated[str, Form()],
                    progress: Annotated[str, Form()],
                    full_day: Annotated[str, Form()],
                    hours_worked: Annotated[str, Form()],
                    tools_condition: Annotated[str, Form()],
                    delays: Annotated[str, Form()],
                    delay_reason: Annotated[str, Form()],
                    comments: Annotated[str, Form()],
                    photos: Annotated[str, Form()],
                    database = Depends(get_db)):
    
    try:
        date_object = datetime.strptime(report_date, "%Y-%m-%d")
        formated_date = date_object.strftime("%d-%m-%Y")
        int_machines_used = int(machines_used)
        int_hours_worked = int(hours_worked)
        await database.create_report(project_id, 
                                  formated_date, 
                                  site_name, 
                                  employee_responsible, 
                                  int_machines_used, 
                                  same_state, 
                                  progress, 
                                  full_day, 
                                  int_hours_worked, 
                                  tools_condition, 
                                  delays, 
                                  delay_reason, 
                                  comments, 
                                  photos
                                )
        return {'message':'Se ha creado el reporte con éxito'}
    except ValueError as error:
       raise HTTPException(status_code=400, detail={str(error)})
#-------------------- REPORTING ---------------


        
    