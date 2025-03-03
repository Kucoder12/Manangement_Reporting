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

function uploadExcel() {
    alert("Fichier soumis avec succès !");
}

function deleteExcel() {
    fileInput.value = "";
    fileNameDisplay.textContent = "Aucun fichier sélectionné";
}

