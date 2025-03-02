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
                    employeCDI.classList.add("employe-role");
                    employeCDI.textContent = `${employes.role|| "Fecha No Disponible"}`; // Validar

                    projectInfo.appendChild(employeName);
                    projectInfo.appendChild(employeCDI);

                    const projectArrow = document.createElement("div");
                    projectArrow.classList.add("employe-arrow");
                    projectArrow.textContent = " > ";

                    projectCard.appendChild(projectInfo);
                    projectCard.appendChild(projectArrow);

                    projectList.appendChild(projectCard);

                    projectCard.addEventListener("click", () => {
                        openModal(employes); // Abre el modal con la información del empleado
                    });
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
    document.getElementById("search-input").addEventListener("keyup", function () {
        const input = this.value.toLowerCase();
        const projectList = document.getElementById("employes-list");
        const projects = projectList.getElementsByClassName("employe-card");

        Array.from(projects).forEach(project => {
            const projectName = project.querySelector(".employe-name").textContent.toLowerCase();
            const projectDate = project.querySelector(".employe-role").textContent.toLowerCase();

            // Mostrar u ocultar proyectos según la búsqueda
            if (projectName.includes(input) || projectDate.includes(input)) {
                project.style.display = "";
            } else {
                project.style.display = "none";
            }
        });
    });
});

//Función para abrir el modal
function openModal(employe) {
    let name = employe.name;
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    let lastname = employe.lastname;
    lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase();
    // Usar \n en el texto original y convertirlo en <br>
    const modalText = `ID: ${employe.id}
                       Nombre: ${employe.name}
                       Apellidos:${employe.lastname}
                       Email: ${employe.email}
                       Teléfono: ${employe.phone}
                       Rol: ${employe.role || "Rol no disponible"}`;
     
    document.getElementById("employe").innerHTML = name + " " + lastname;
    // Convertir los saltos de línea \n en <br>
    document.getElementById("modal-content").innerHTML = modalText.split('\n').join('<br>');


    document.getElementById("modal").style.display = "block";
    document.getElementById("modal-overlay").style.display = "block";
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("modal-overlay").style.display = "none";
}

// Cerrar modal al hacer clic fuera de él
document.addEventListener("DOMContentLoaded", async function () {
    // Esperar a que el DOM esté cargado antes de agregar eventos
    const modalOverlay = document.getElementById("modal-overlay");

    if (modalOverlay) {
        modalOverlay.addEventListener("click", closeModal);
    } else {
        console.error("Error: No se encontró el elemento modal-overlay");
    }
});
