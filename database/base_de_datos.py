import psycopg2



#conexion a la base de datos
try :
    conn=psycopg2.connect(
        host="localhost", 
        database="PROJECT_MANAGEMENT", 
        user="postgres", 
        password="Andres123.", 
        port="5432")

    print("Conexion exitosa")
    cur = conn.cursor()



    #Table_login
    cur.execute('''CREATE TABLE IF NOT EXISTS Login(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE )
    ''')

    #Table_User
    cur.execute('''CREATE TABLE IF NOT EXISTS "User"(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        role TEXT NOT NULL,
        id_login INTEGER NOT NULL,
        FOREIGN KEY (id_login) REFERENCES Login(id)
        )''')


    # Table_Project
    cur.execute('''CREATE TABLE IF NOT EXISTS Project(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        description TEXT NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        state TEXT NOT NULL,
        id_user INTEGER NOT NULL,
        FOREIGN KEY (id_user) REFERENCES "User"(id))
        ''')

    #Table_user_project
    cur.execute('''CREATE TABLE IF NOT EXISTS User_Project(
    id SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL,
    id_project INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES "User"(id),
    FOREIGN KEY (id_project) REFERENCES Project(id))
    ''')

    #Table_user_reporting
    cur.execute('''CREATE TABLE IF NOT EXISTS User_Reporting(
        id SERIAL PRIMARY KEY,
        id_user INTEGER NOT NULL,
        id_project INTEGER NOT NULL,
        FOREIGN KEY (id_user) REFERENCES "User"(id),
        FOREIGN KEY (id_project) REFERENCES Project(id))
        ''')


    conn.commit()
    conn.close()
except Exception as error:
    print("Error de conexion", error)
