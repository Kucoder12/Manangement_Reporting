
CREATE TABLE IF NOT EXISTS data_login(id SERIAL PRIMARY KEY,
                                    username TEXT NOT NULL,
                                    pass TEXT NULL UNIQUE
                                );



CREATE TABLE IF NOT EXISTS Employes(id SERIAL PRIMARY KEY,
                                    cdi TEXT NOT NULL,
                                    "name" TEXT NOT NULL,
                                    last_name TEXT NOT NULL,
                                    email TEXT NOT NULL UNIQUE,
                                    phone TEXT NOT NULL,
                                    "role" TEXT NOT NULL
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


CREATE TABLE IF NOT EXISTS reporting (
    id SERIAL PRIMARY KEY,
    project_id INT,
    report_date DATE NOT NULL,
    site_name TEXT NOT NULL,
    employee_responsible TEXT NOT NULL,
    machines_used INTEGER NOT NULL,
    same_state BOOLEAN NOT NULL,   
    progress BOOLEAN NOT NULL,     
    full_day BOOLEAN NOT NULL,     
    hours_worked INTEGER,          
    tools_condition BOOLEAN NOT NULL, 
    delays BOOLEAN NOT NULL,       
    delay_reason TEXT,             
    comments TEXT,                 
    photos TEXT,
    FOREIGN KEY (project_id) REFERENCES Project(id)               
);



INSERT INTO Employes(cdi, "name", last_name, email, phone, "role")
VALUES 
('A001', 'Juan', 'Perez', 'juan.perez@empresa.com', '123456789', 'Administrador');


INSERT INTO Project("name", "address", "description", start_date, end_date, "state", id_user)
VALUES 
('Proyecto A', 'Calle Falsa 123', 'Descripción del Proyecto A', '2025-01-01', '2025-12-31', 'Activo', 1),
('Proyecto B', 'Avenida Siempre Viva 456', 'Descripción del Proyecto B', '2025-03-01', '2025-11-30', 'En progreso', 1),
('Proyecto C', 'Calle Imaginaria 789', 'Descripción del Proyecto C', '2025-02-01', '2025-10-31', 'Planificado', 1);


INSERT INTO User_Project(id_user, id_project)
VALUES
(1, 1),
(1, 2),
(1, 3);


-- Insertar informes en reporting

INSERT INTO reporting (project_id,report_date, site_name, employee_responsible, machines_used, same_state, progress, full_day, hours_worked, tools_condition, delays, delay_reason, comments, photos) 
VALUES (2,'2025-03-10', 'Site A', 'John Doe', 5, TRUE, TRUE, TRUE, 8, TRUE, FALSE, NULL, 'No comments', '{"photo1.jpg", "photo2.jpg"}');


INSERT INTO data_login(username, pass)
VALUES 
('jperez', 'Madrid.2025!');



