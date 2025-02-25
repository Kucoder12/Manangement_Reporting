// Espera hasta que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Ahora puedes agregar el evento al formulario
    document.getElementById("projectForm").addEventListener("submit", async function(event) {
        event.preventDefault(); // Evita que se recargue la página

        // Capturar los datos del formulario
        const formData = new FormData(this);

        try {
            // Convertir los datos en formato URLSearchParams
            const urlEncodedData = new URLSearchParams(formData).toString();

            // Enviar los datos al endpoint 'projects/add'
            const response = await fetch("http://localhost:8000/projects/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: urlEncodedData
            });

            if (response.ok) {
                // Si la respuesta es exitosa, redirige o muestra un mensaje
                alert("Projet créé avec succès !");
                window.location.href = "chantier.html"; // Redirige a la página de chantier
            } else {
                const errorData = await response.json();
                alert("Error: " + JSON.stringify(errorData));
            }
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            alert("Error al conectar con el servidor.");
        }
    });
});
