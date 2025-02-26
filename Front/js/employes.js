document.addEventListener("DOMContentLoaded", async function () {
    // Obtener los proyectos al cargar la página
    try {
        const response = await fetch("http://localhost:8000/employes");
        if (response.ok) {
            const employes = await response.json();
            console.log(employes); // Verifica que los proyectos se reciben correctamente

            // Mostrar los proyectos en las tarjetas
            const projectList = document.getElementById("employes-list");
            projectList.innerHTML = ''; // Limpiar cualquier proyecto existente

            if (Array.isArray(employes) && employes.length > 0) {
                employes.forEach(employes => {
                    const projectCard = document.createElement("div");
                    projectCard.id = "get_info" 
                    projectCard.classList.add("employe-card");

                    const projectInfo = document.createElement("div");
                    projectInfo.classList.add("employe-info");

                    // Asegurarse de que cada propiedad exista
                    const employeName = document.createElement("div");
                    employeName.classList.add("employe-name");
                    employeName.textContent = `${employes.name} ${employes.lastname}` || "Nombre del empleado No Disponible"; // Validar

                    const employeCDI = document.createElement("div");
                    employeCDI.classList.add("employe-date");
                    employeCDI.textContent = `${employes.role|| "Fecha No Disponible"}`; // Validar

                    projectInfo.appendChild(employeName);
                    projectInfo.appendChild(employeCDI);

                    const projectArrow = document.createElement("div");
                    projectArrow.classList.add("employe-arrow");
                    projectArrow.textContent = " > ";

                    projectCard.appendChild(projectInfo);
                    projectCard.appendChild(projectArrow);

                    projectList.appendChild(projectCard);
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


// Función para filtrar los proyectos según la búsqueda
function searchProjects() {
    const input = document.getElementById("searchProject").value.toLowerCase();
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
}

