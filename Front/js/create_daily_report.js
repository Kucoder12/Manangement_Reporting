const project_name = localStorage.getItem("projectName");
const projecID = localStorage.getItem("projectID");
const employeName = localStorage.getItem("employeName");
const employeLastname = localStorage.getItem("employeLastname");
document.addEventListener("DOMContentLoaded",async function (){

    setDataFrom();

    document.getElementById("daily-report-form").addEventListener("submit",()=>{
        event.preventDefault();

        sendForm();
    })

})

//Dejar como estaticos los valores del formularios que ya tenemos Nombre de la obra, responsable
function setDataFrom(){
    const site_name = document.getElementById("siteName");
    const employee_responsible = document.getElementById("responsible");

    site_name.textContent = project_name;
    employee_responsible.textContent = `${employeName} ${employeLastname}`;
    site_name.value = project_name;
    employee_responsible.value = `${employeName} ${employeLastname}`;
    site_name.readOnly = true;
    employeLastname.readOnly = true;
}

async function sendForm(){

    const dataForm = document.getElementById("daily-report-form");
    const formData = new FormData(dataForm); // Obtiene los datos del formulario

    console.log("📌 Valores del formulario:");
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    console.log(formData.values);
    try {
      const response = await fetch(`http://localhost:8000/projects/${projecID}/report/add`, {
        method: 'POST',
        body: formData, // Enviamos los datos del formulario como FormData
      });

      // Respuesta del servidor
      const result = await response.json();
      console.log(result); // Muestra los datos recibidos
    } catch (error) {
      console.error('Error:', error);
    }

}