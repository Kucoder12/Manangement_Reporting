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
            
    async def add_employe(self, name:str, lastname:str, email:str, phone:int, role:str):
        cur = self.conn.cursor()
        cur.execute(f"""INSERT INTO Employes (name, last_name, email, phone, role) VALUES (
                    '{name}',
                    '{lastname}',
                    '{email}',
                    {phone},
                    '{role}'
                    )""")
        self.conn.commit()
    
    async def get_users_all(self):
        cur = self.conn.cursor()
        cur.execute("""SELECT * FROM Employes""")
        users = cur.fetchall()
        
        return users
        
        


    

    

