document.addEventListener("DOMContentLoaded", function() {
    // Aquí se pueden agregar más eventos en el futuro

    initializeFileUpload();

    getInfo_project();

    // Agregar más eventos aquí si es necesario
    // Ejemplo: 
    // document.getElementById('someButton').addEventListener('click', someFunction);
});

async function getInfo_project(){
    const project_name = localStorage.getItem("projectName");

    if (project_name) {
        console.log("project_name recuperado:", project_name);  // Mostrar el project_name en consola
    } else {
        console.log("No se encontró el project_name.");
    }

    try {
        const response = await fetch(`http://localhost:8000/projects/${project_name}`);
        if (response.ok){
            const project = await response.json();
            document.getElementById("projectName").innerHTML = project[0].name;
            const data_project = [
                { label: "Name", value: project[0].name, id: "name"},
                { label: "Address", value: project[0].address, id: "address"},
                { label: "Start date", value: project[0].start_date, id: "start_date"},
                { label: "End date", value: project[0].end_date, id: "end_date"},
                { label: "Responsable", value: project[0].employe || "Employe no disponible", id: "employe"}
            ];

            data_project.forEach(item => {
                const project_details = document.getElementById("project-details");
                const div = document.createElement("div");
        
                const label = document.createElement("strong");
                label.textContent = item.label + ": ";
                label.id = item.id;
        
                const value = document.createElement("span");
                value.textContent = item.value;
                value.id = `${item.id}`;
        
                div.appendChild(label);
                div.appendChild(value);
                project_details.appendChild(div);
                
            });
            document.getElementById("descriptionProject").innerHTML = project[0].description;
        }
        
    } catch (error) {
        alert("Ha habido un error a la hora de hacer la solicitud.")
    }

}

function initializeFileUpload() {
    const uploadArea = document.getElementById("uploadArea");
    const fileInput = document.getElementById("excelUpload");
    const fileNameDisplay = document.querySelector(".file-name");

    // Abrir el selector de archivos al hacer clic en el área
    uploadArea.addEventListener("click", () => fileInput.click());

    // Actualizar el nombre del archivo seleccionado
    fileInput.addEventListener("change", function() {
        let fileName = this.files.length > 0 ? this.files[0].name : "Aucun fichier sélectionné";
        fileNameDisplay.textContent = fileName;
    });

    // Manejo de arrastrar y soltar archivos
    uploadArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadArea.classList.add("dragover");
    });

    uploadArea.addEventListener("dragleave", () => {
        uploadArea.classList.remove("dragover");
    });

    uploadArea.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadArea.classList.remove("dragover");

        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            fileNameDisplay.textContent = e.dataTransfer.files[0].name;
        }
    });
}
