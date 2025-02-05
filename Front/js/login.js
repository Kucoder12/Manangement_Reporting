document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío por defecto del formulario

    // Capturar los datos del formulario
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Crear un objeto con los datos
    const data = {
        name: username,
        pass: password
    };

    // Hacer la solicitud POST a tu API (backend)
    fetch('http://localhost:8080/login', { // Cambia la URL a la de tu backend
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
