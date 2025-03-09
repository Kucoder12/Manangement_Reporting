import psycopg2

class Connection_Database():

    def __init__(self):
        try :
            #conexion a la base de datos
            self.conn = psycopg2.connect(
                host="database", 
                database="good_services", 
                user="postgres", 
                password="Goodservices.2025!", 
                )
        except:
            print("Error de conexión a la Base de datos")
            
 # --------------  LOGIN   --------------
 
    async def insert_password_default(self, username:str, password:str):
        cur = self.conn.cursor()
        cur.execute(f"""INSERT INTO data_login (username,pass) VALUES ('{username}','{password}')""")
        self.conn.commit()
 
    async def verify_username(self, username):
        cur =self.conn.cursor()
        cur.execute(f"""SELECT EXISTS (SELECT 1 FROM data_login WHERE username = '{username}')""")
        verify_bool = cur.fetchone()
        
        return  verify_bool
    
    async def get_password(self, username):
        cur =self.conn.cursor()
        cur.execute(f"""SELECT pass FROM data_login WHERE username = '{username}'""")
        password = cur.fetchone()
        
        return  password
        
        
            
 # -------------- EMPLOYES --------------
 
    async def get_employes(self):
        cur = self.conn.cursor()
        cur.execute("""SELECT * FROM Employes""")
        employes = cur.fetchall()
        
        return employes
    
    async def get_employe_name(self,name:str):
       cur=self.conn.cursor()
       cur.execute(f"""SELECT * FROM Employes WHERE name='{name}'""")
       employes=cur.fetchall()
       
       return employes 
   
    async def get_employes_managers(self):
        cur = self.conn.cursor()
        cur.execute("""SELECT Employes.id, Employes.name, Employes.last_name FROM Employes WHERE role='manager'""")
        managers = cur.fetchall()
        
        return managers
         
    async def add_employe(self, cdi:str, name:str, lastname:str, email:str, phone:int, role:str):
        cur = self.conn.cursor()
        cur.execute(f"""INSERT INTO Employes (cdi, name, last_name, email, phone, role) VALUES (
                    '{cdi}',
                    '{name}',
                    '{lastname}',
                    '{email}',
                    {phone},
                    '{role}'
                    )""")
        self.conn.commit()
    
    async def delete_employe(self,cdi:str):
        cur=self.conn.cursor()
        cur.execute(f"""DELETE FROM employes WHERE cdi = '{cdi}'""")
        self.conn.commit()
    
    async def update_employe(self, id_employe:int, field:str, value:str):
        cur =self.conn.cursor()
        cur.execute(f"""UPDATE employes SET {field}='{value}' WHERE id={id_employe}""")
        self.conn.commit()
        
# -------------- PROJECTS ----------------

    async def get_projects(self):
        cur=self.conn.cursor()
        cur.execute(f"""SELECT Project.id, Project.name, Project.address, Project.description, Project.start_date, Project.end_date, Project.state, employes.name  AS employe, employes.last_name
                        FROM Project JOIN employes 
                        ON Project.id_user = employes.id""")
        projects=cur.fetchall()
        
        return projects
    
    async def get_project_name(self, project_name:str): 
        cur=self.conn.cursor()
        cur.execute(f"""SELECT Project.id, Project.name, Project.address, Project.description, Project.start_date, Project.end_date, Project.state, employes.name  AS employe, employes.last_name
                    FROM Project JOIN employes 
                    ON Project.id_user = employes.id
                    WHERE Project.name='{project_name}'""")
        project=cur.fetchone()
        
        return project
    
    async def add_project(self,name:str,address:str,description:str,start_date:str,end_date:str,state:str,employe_id:str):
        cur=self.conn.cursor()
        cur.execute(f"""INSERT INTO project (name,address,description,start_date,end_date,state, id_user) VALUES ('{name}',
                                                                                                                  '{address}',
                                                                                                                  '{description}',
                                                                                                                  '{start_date}',
                                                                                                                  '{end_date}',
                                                                                                                  '{state}',
                                                                                                                  {employe_id})""")
        self.conn.commit()
    
    async def delete_project(self,project_name):
        cur=self.conn.cursor()
        cur.execute(f"""DELETE FROM Project WHERE name = '{project_name}'""")
        self.conn.commit()
        
#----------------- REPORTING -------------------

    async def get_reports(self,project_name:str):
        cur =self.conn.cursor()
        cur.execute(f"""SELECT 
                        reporting.id, 
                        project.name AS project_name, 
                        reporting.report_date, 
                        reporting.site_name, 
                        reporting.employee_responsible, 
                        reporting.machines_used, 
                        reporting.same_state, 
                        reporting.progress, 
                        reporting.full_day, 
                        reporting.hours_worked, 
                        reporting.tools_condition, 
                        reporting.delays, 
                        reporting.delay_reason, 
                        reporting.comments, 
                        reporting.photos 
                        FROM reporting JOIN project 
                        ON reporting.project_id = project.id 
                        WHERE project.name = '{project_name}'
                    """)
        reporting = cur.fetchall()
        
        return reporting
    
    async def create_report(self,
                            project_id, 
                            report_date, 
                            site_name, 
                            employee_responsible, 
                            machines_used, 
                            same_state, 
                            progress, 
                            full_day, 
                            hours_worked, 
                            tools_condition, 
                            delays, 
                            delay_reason, 
                            comments, 
                            photos):
        cur = self.conn.cursor()
        cur.execute(f"""INSERT INTO reporting (project_id, 
                                               report_date, 
                                               site_name, 
                                               employee_responsible, 
                                               machines_used, 
                                               same_state, 
                                               progress, 
                                               full_day, 
                                               hours_worked, 
                                               tools_condition, 
                                               delays, 
                                               delay_reason, 
                                               comments, 
                                               photos)
                        VALUES ({project_id},TO_DATE('{report_date}','DD-MM-YYYY'),'{site_name}','{employee_responsible}',{machines_used},{same_state},{progress},{full_day},{hours_worked},{tools_condition},{delays},'{delay_reason}','{comments}','{photos}')
                    """)
        self.conn.commit()
        
        
    

        
        


    

    

