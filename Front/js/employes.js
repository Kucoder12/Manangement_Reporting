// URL de la PokeAPI para Pikachu
const url = "http://localhost:8000/employes"
// Hacer la solicitud con fetch
fetch(url)
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        // Obtener los datos
        console.log(data)
        const tabla = document.getElementById("employes");
        for (let index = 0; index < data.length; index++) {
        // Crear una nueva fila
            const row = document.createElement("tr");
            const cdi = data[index].cdi
            const name = data[index].name;
            const lastname = data[index].lastname;
            const email = data[index].email;
            const phone = data[index].phone;
            const role = data[index].role;



            row.innerHTML = `
            <td>${cdi}</td>
            <td>${name}</td>
            <td>${lastname}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>${role}</td>
            <td><button class="btn btn-danger" onclick="deleteEmploye(${cdi})">Eliminar</button>
                <button class="btn btn-warning" onclick="updateEmploye(${cdi})">Actualizar</button>
            </td>

        `;
            tabla.appendChild(row);
        }


    })
    .catch(error => console.error("Error al obtener los datos:", error));