document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("loginForm").addEventListener("submit", async function(event) {
        event.preventDefault(); // Evita que se recargue la página

        // Capturar datos del formulario
        const formData = new FormData(this);

        try {
            // Enviar datos en formato form-urlencoded
            const urlEncodedData = new URLSearchParams(formData).toString();

            const response = await fetch("/goodservices/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: urlEncodedData
            });

            if (response.ok) {
                // Si la respuesta es exitosa, redirige
                window.location.href = "chantier.html";
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



//document.addEventListener("DOMContentLoaded", function () {
//    const loginForm = document.getElementById("loginForm");
//
//    loginForm.addEventListener("submit", async function (event) {
//        event.preventDefault(); // Evita el envío tradicional del formulario
//
//        const formData = new FormData(loginForm); // Captura todos los datos del formulario
//
//        try {
//            const response = await fetch("/goodservices/login", {
//                method: "POST",
//                body: formData, // Aquí enviamos los datos del formulario directamente
//            });
//
//            if (!response.ok) {
//                throw new Error("Login incorrecto. Verifica tus credenciales.");
//            }
//
//            const result = await response.json(); // Obtener la respuesta en JSON
//
//            // Si el login es correcto, guardar el token en localStorage
//            localStorage.setItem("access_token", result.access_token);
//
//            alert("Login exitoso!");
//            window.location.href = "chantier.html"; // Redirigir si el login es exitoso
//
//        } catch (error) {
//            alert(error.message); // Mostrar mensaje de error
//        }
//    });
//});
