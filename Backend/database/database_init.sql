
CREATE TABLE IF NOT EXISTS data_login(id SERIAL PRIMARY KEY,
                                    username TEXT NOT NULL,
                                    pass TEXT NOT NULL UNIQUE,
                                );



CREATE TABLE IF NOT EXISTS Employes( id SERIAL PRIMARY KEY,
                                    "name" TEXT NOT NULL,
                                    last_name TEXT NOT NULL,
                                    email TEXT NOT NULL UNIQUE,
                                    phone TEXT NOT NULL,
                                    "role" TEXT NOT NULL ,
                                    FOREIGN KEY (id) REFERENCES Login(id)
                                    );



CREATE TABLE IF NOT EXISTS Project(id SERIAL PRIMARY KEY,
                                    "name" TEXT NOT NULL,
                                    "address" TEXT NOT NULL,
                                    "description" TEXT NOT NULL,
                                    "start_date" DATE NOT NULL,
                                    end_date DATE NOT NULL,
                                    "state" TEXT NOT NULL,
                                    id_user INTEGER NOT NULL,
                                    FOREIGN KEY (id_user) REFERENCES Employes(id)
                                    );
    


CREATE TABLE IF NOT EXISTS User_Project(id SERIAL PRIMARY KEY,
                                        id_user INTEGER NOT NULL,
                                        id_project INTEGER NOT NULL,
                                        FOREIGN KEY (id_user) REFERENCES Employes(id),
                                        FOREIGN KEY (id_project) REFERENCES Project(id)
                                        );



CREATE TABLE IF NOT EXISTS User_Reporting(id SERIAL PRIMARY KEY,
                                        id_user INTEGER NOT NULL,
                                        id_project INTEGER NOT NULL,
                                        FOREIGN KEY (id_user) REFERENCES Employes(id),
                                        FOREIGN KEY (id_project) REFERENCES Project(id)
                                        );
    

