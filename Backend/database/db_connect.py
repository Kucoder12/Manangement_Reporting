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
 
    async def verify_username(self, username):
        cur =self.conn.cursor()
        cur.execute(f"""SELECT EXISTS (SELECT 1 FROM data_login WHERE username = '{username}')""")
        verify_bool = cur.fetchone()
        
        return  verify_bool
    
    async def verify_password(self, password):
        cur =self.conn.cursor()
        cur.execute(f"""SELECT EXISTS (SELECT 1 FROM data_login WHERE pass = '{password}')""")
        verify_bool = cur.fetchone()
        
        return  verify_bool
        
        
            
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
        cur.execute(f"""DELETE FROM employe WHERE cdi = '{cdi}'""")
        self.conn.commit()
        
# -------------- PROJECTS ----------------

    async def get_projects(self):
        cur=self.conn.cursor()
        cur.execute(f"""SELECT * FROM Project""")
        projects=cur.fetchall()
        
        return projects
    
    async def get_project_name(self, project_name:str): 
        cur=self.conn.cursor()
        cur.execute(f"""SELECT * FROM Project WHERE name='{project_name}'""")
        project=cur.fetchone()
        
        return project
    
    async def add_project(self,name:str,address:str,description:str,start_date:str,end_date:str,state:str,employe_name:str):
        cur=self.conn.cursor()
        cur.execute(f"""INSERT INTO project (name,address,description,start_date,end_date,state, id_user) VALUES ('{name}',
                                                                                                                  '{address}',
                                                                                                                  '{description}',
                                                                                                                  '{start_date}',
                                                                                                                  '{end_date}',
                                                                                                                  '{state}',
                                                                                                                  1)""")
        self.conn.commit()
    
    async def delete_project(self,project_name):
        cur=self.conn.cursor()
        cur.execute(f"""DELETE FROM Project WHERE name = '{project_name}'""")
        self.conn.commit()
        
        
    

        
        


    

    

