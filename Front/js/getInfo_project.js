const project_name = localStorage.getItem("projectName");
const projecID = localStorage.getItem("projectID");
const employeName = localStorage.getItem("employeName");
const employeLastname = localStorage.getItem("employeLastname");
document.addEventListener("DOMContentLoaded", function() {
    // Aquí se pueden agregar más eventos en el futuro

    initializeFileUpload();

    getInfo_project(project_name);
    getReports(project_name);
    

    document.getElementById("deleteProject").addEventListener("click", ()=>{
        deleteProject(project_name);
        window.location.href = "chantier.html";
    });

    document.getElementById("createReport").addEventListener("click", ()=>{
        window.location.href = "create-daily-report.html";
    });
    // Agregar más eventos aquí si es necesario
    // Ejemplo: 
    // document.getElementById('someButton').addEventListener('click', someFunction);
});

async function getInfo_project(project_name){
    

    if (project_name) {
        console.log("project_name recuperado:", project_name);  // Mostrar el project_name en consola
    } else {
        console.log("No se encontró el project_name.");
    }

    try {
        const response = await fetch(`/goodservices/projects/${project_name}`);
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

function deleteProject(project_name){
    
    try{
        fetch(`/goodservices/projects/${project_name}/delete`,{
            
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar el recurso');
            }
            window.location.href = "chantier.html";
            return response.json();
        })

        
    } catch(error){
        console.log("Ha habido un error: " + error)
    }
}

async function getReports(projectName){

    const report_section = document.getElementById("report-section");
    try{
        const response = await fetch(`/goodservices/projects/${projectName}/reports`)
        if(response.ok){
            const reports = await response.json();
            reports.forEach(report=>{
                const report_card = document.createElement("div");
                report_card.id = "get-report";
                report_card.classList.add("report-card");
                const report_info = document.createElement("div");
                report_info.classList.add("report-info");
                const report_date = document.createElement("div");
                report_date.classList.add("report-date")
                report_date.textContent = "Reporte a fecha de " + report.report_date;
                const arrow = document.createElement("div")
                arrow.classList.add("report-arrow");
                arrow.textContent = ">";

                report_info.appendChild(report_date);
                report_card.appendChild(report_info);
                report_card.appendChild(arrow);
                report_section.appendChild(report_card);
                
            })
        }
    }catch(error){
        alert("Ha ocurrido un error: " + error)
    }
}
