document.getElementById("add_employe_form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita que se recargue la página

    // Capturar datos del formulario
    const formData = new FormData(this);

    // Convertir 'phone' a número entero
    const phoneValue = formData.get("phone");
    if (phoneValue) {
        const phoneInt = parseInt(phoneValue, 10);
        if (!isNaN(phoneInt)) {
            formData.set("phone", phoneInt);
        } else {
            alert("Número de teléfono inválido.");
            return;
        }
    }

    // Enviar datos en formato form-urlencoded
    const urlEncodedData = new URLSearchParams(formData).toString();

    try {
        const response = await fetch("http://localhost:8000/employes/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: urlEncodedData
        });

        if (response.ok) {
            alert("Empleado registrado correctamente.");
            this.reset();
        } else {
            const errorData = await response.json();
            alert("Error: " + JSON.stringify(errorData));
        }
    } catch (error) {
        console.error("Error al enviar los datos:", error);
        alert("Error al conectar con el servidor.");
    }
});
