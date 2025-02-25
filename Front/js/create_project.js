// URL de la PokeAPI para Pikachu
const url = "http://45.235.98.252:7000/projects/add"
// Hacer la solicitud con fetch
fetch(url)
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        // Obtener los datos
        console.log(data)
        const tabla = document.getElementById("create_project");
        for (let index = 0; index < data.length; index++) {
        // Crear una nueva fila
            const row = document.createElement("tr");
            const name = data[index].name
            const address = data[index].address
            const description = data[index].description
            const start_date = data[index].start_date;
            const end_date = data[index].end_date;
            const state = data[index].state;
            const employe = data[index].employe;
    



            row.innerHTML = `
            <td>${name}</td>
            <td>${address}</td>
            <td>${description}</td>
            <td>${start_date}</td>
            <td>${end_date}</td>
            <td>${state}</td>
            <td>${employe}</td>

        `;
            tabla.appendChild(row);
        }


    })
    .catch(error => console.error("Error al obtener los datos:", error));