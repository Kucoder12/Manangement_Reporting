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
                        document.querySelector(".delete-btn").addEventListener('click', ()=> {
                            deleteModal(employes);
                        });                      
                        
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
    let name = employe.name.charAt(0).toUpperCase() + employe.name.slice(1).toLowerCase();
    let lastname = employe.lastname.charAt(0).toUpperCase() + employe.lastname.slice(1).toLowerCase();

    const modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = '';  // Limpiar contenido previo

    const data = [
        { label: "ID", value: employe.id, id: "id", editable: false },
        { label: "CDI", value: employe.cdi, id: "cdi", editable: true },
        { label: "Email", value: employe.email, id: "email", editable: true },
        { label: "Teléfono", value: employe.phone, id: "phone", editable: true },
        { label: "Rol", value: employe.role || "Rol no disponible", id: "role", editable: true }
    ];

    const id_employe = data[0].value;    //me coge el ID del empleado que seleccione (abra el modal)

    data.forEach(item => {
        const div = document.createElement("div");

        const label = document.createElement("strong");
        label.textContent = item.label + ": ";
        label.id = item.id;

        const value = document.createElement("span");
        value.textContent = item.value;
        value.id = `${item.id}`;

        if (item.editable) {
            const editIcon = document.createElement("i");
            editIcon.classList.add("fas", "fa-edit", "edit-icon");
            editIcon.onclick = function () {
                editField(item.id, value, id_employe);  // Pasar employe_id al hacer clic en el icono
                console.log(item.id,value,id_employe);
            };

            div.appendChild(label);
            div.appendChild(value);
            div.appendChild(editIcon);
        } else {
            div.appendChild(label);
            div.appendChild(value);
        }

        modalContent.appendChild(div);
    });

    document.getElementById("employe").innerHTML = name + " " + lastname;
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

function editField(fieldId, spanElement, id_employe) {
    const id = id_employe
   // Obtener el valor actual del campo
   //const currentValue = spanElement.textContent;

   // Crear el input de texto
   const input = document.createElement("input");
   input.type = "text";
   input.id = fieldId;
   input.name = fieldId;
   //input.value = currentValue;  // Asignar el valor actual del campo al input
   // Reemplazar el span con el input
   spanElement.innerHTML = ' ';  // Limpiar el contenido del span
   spanElement.appendChild(input);  // Añadir el input al div
   // Opcional: Si quieres que el campo se enfoque cuando sea editable
   input.focus();

   const update = document.querySelector(".update-btn");
   update.onclick = function (){
       updatefieldModal(fieldId,input,id);
   }

}

//funcion para actualizar algun campo del empleado
async function updatefieldModal(fieldId, input, employe_id) {
    const newValue = input.value.trim();  // Obtener el nuevo valor del input
    console.log(newValue, fieldId,employe_id);

    if (!newValue) {
        alert("El campo no puede estar vacío");
        return;
    }

    try {
        // Hacer la petición PUT al backend con employe_id
        const response = await fetch(`http://localhost:8000/employes/${employe_id}/${fieldId}/${newValue}/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            //body: JSON.stringify(requestData)
        });

        const result = await response.json(); // Intentar leer la respuesta JSON
        console.log("Respuesta del servidor:", result); // Verificar la respuesta del backend


        if (!response.ok) {
            throw new Error("Error al actualizar el campo");
        }

        // Convertir el input de vuelta a un span con el nuevo valor
        const span = document.createElement("span");
        span.id = `span-${fieldId}`;
        span.textContent = newValue;

        input.parentNode.replaceChild(span, input);

        alert("Campo actualizado correctamente");
    } catch (error) {
        alert("Primero debe seleccionar un campo para editar y asignarle el nuevo valor.");
    }
}


//funcion para eliminar empleado a traves del modal

function deleteModal(employe){
    let cdi = employe.cdi
    fetch('http://localhost:8000/employes/' + cdi + '/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar el recurso');
        }
        window.location.href = window.location.href;
        return response.json();
        

    })

}