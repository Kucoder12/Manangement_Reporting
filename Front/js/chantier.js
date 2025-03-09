document.addEventListener("DOMContentLoaded", async function () {
    // Obtener los proyectos al cargar la página
    try {
        const response = await fetch("http://backend:8000/projects");
        if (response.ok) {
            const projects = await response.json();
            console.log(projects); // Verifica que los proyectos se reciben correctamente

            // Mostrar los proyectos en las tarjetas
            const projectList = document.getElementById("project-list");
            projectList.innerHTML = ''; // Limpiar cualquier proyecto existente

            if (Array.isArray(projects) && projects.length > 0) {
                projects.forEach(project => {
                    const projectCard = document.createElement("div");
                    projectCard.id = "get_info" 
                    projectCard.classList.add("project-card");

                    const projectInfo = document.createElement("div");
                    projectInfo.classList.add("project-info");

                    // Asegurarse de que cada propiedad exista
                    const projectName = document.createElement("div");
                    projectName.classList.add("project-name");
                    projectName.textContent = project.name || "Nombre del Proyecto No Disponible"; // Validar

                    const projectDate = document.createElement("div");
                    projectDate.classList.add("project-date");
                    projectDate.textContent = `De ${project.start_date || "Fecha No Disponible"} a ${project.end_date || "Fecha No Disponible"}`; // Validar

                    projectInfo.appendChild(projectName);
                    projectInfo.appendChild(projectDate);

                    const projectArrow = document.createElement("div");
                    projectArrow.classList.add("project-arrow");
                    projectArrow.textContent = " > ";

                    projectCard.appendChild(projectInfo);
                    projectCard.appendChild(projectArrow);

                    projectList.appendChild(projectCard);

                    projectCard.addEventListener("click", ()=>{
                        const projectName = project.name;
                        localStorage.setItem("projectName",projectName);
                        localStorage.setItem("projectID",project.id)
                        localStorage.setItem("employeName",project.employe)
                        localStorage.setItem("employeLastname", project.employe_lastname)
                        console.log(projectName);
                        window.location.href = "./../html/getInfo_project.html";
                    })
                });
            } else {
                console.log("No hay proyectos disponibles o el formato es incorrecto.");
            }
        } else {
            console.error("Error al obtener proyectos: ", response.statusText);
        }
    } catch (error) {
        console.error("Error de conexión:", error);
    }

    // Escuchar la búsqueda de proyectos
    document.getElementById("searchProject").addEventListener("keyup", function () {
        const input = this.value.toLowerCase();
        const projectList = document.getElementById("project-list");
        const projects = projectList.getElementsByClassName("project-card");
    
        Array.from(projects).forEach(project => {
            const projectName = project.querySelector(".project-name").textContent.toLowerCase();
            const projectDate = project.querySelector(".project-date").textContent.toLowerCase();
    
            // Mostrar u ocultar proyectos según la búsqueda
            if (projectName.includes(input) || projectDate.includes(input)) {
                project.style.display = "";
            } else {
                project.style.display = "none";
            }
        });
    });
});







//const url = "http://localhost:8000/projects"
//// Hacer la solicitud con fetch
//fetch(url)
//    .then(response => response.json()) // Convertir la respuesta a JSON
//    .then(data => {
//        // Obtener los datos
//        console.log(data)
//        const tabla = document.getElementById("projectTableBody");
//        for (let index = 0; index < data.length; index++) {
//        // Crear una nueva fila
//            const row = document.createElement("tr");
//            const name = data[index].name;
//            const address = data[index].address;
//            const description = data[index].description;
//            const start_date = data[index].start_date;
//            const end_date = data[index].end_date;
//            const state = data[index].state;
//            const employe = data[index].employe;
//
//            row.innerHTML = `
//            <td>${name}</td>
//            <td>${start_date}</td>
//            <td>${end_date}</td>
//        `;
//
//        // Agregar la fila a la tabla
//            tabla.appendChild(row);
//        }
//
//
//        // Obtener la referencia a la tabla
//        
//
//
//
//        // Insertar las celdas con los datos
//
//    })
//    .catch(error => console.error("Error al obtener los datos:", error));