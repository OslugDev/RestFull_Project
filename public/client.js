// client.js
const API_URL = 'http://localhost:3000/api';

// Función para obtener todos los items
async function getItems() {
    const response = await fetch(`${API_URL}/items`);
    const items = await response.json();
    displayItems(items);
}

// Función para agregar un nuevo item
async function addItem(name, description) {
    const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
    });
    const newItem = await response.json();
    getItems();
}

// Función para actualizar un item
async function updateItem(id, name, description) {
    const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
    });
    const updatedItem = await response.json();
    getItems();
}

// Función para eliminar un item
async function deleteItem(id) {
    await fetch(`${API_URL}/items/${id}`, {
        method: 'DELETE',
    });
    getItems();
}

// Función para mostrar los items en la página
function displayItems(items) {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'item';
        li.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <button class="update-btn" onclick="updateItem(${item.id}, prompt('Nuevo nombre:', '${item.name}'), prompt('Nueva descripción:', '${item.description}'))">Actualizar</button>
            <button class="delete-btn" onclick="deleteItem(${item.id})">Eliminar</button>
        `;
        itemList.appendChild(li);
    });
}

// Event listener para el formulario de agregar item
document.getElementById('itemForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('itemName').value;
    const description = document.getElementById('itemDescription').value;
    await addItem(name, description);
    document.getElementById('itemForm').reset();
});

// Cargar items al iniciar la página
getItems();