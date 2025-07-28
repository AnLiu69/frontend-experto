// Datos simulados de síntomas
let symptomsData = [];
let currentDeletingId = null;

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('symptomSearch');

    loadSymptoms();

    // Configurar búsqueda
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const filteredSymptoms = symptomsData.filter(symptom =>
            symptom.name.toLowerCase().includes(searchTerm)
        );
        renderSymptomsTable(filteredSymptoms);
    });
});

async function loadSymptoms() {
    try {
        const res = await fetch(`${API_URL_KEY}/diagnostico/sintomas`);
        const data = await res.json();
        symptomsData = data;
        renderSymptomsTable(symptomsData);
    } catch (err) {
        console.error('Error al cargar síntomas:', err);
    }
}

function renderSymptomsTable(symptoms) {
    const symptomsTable = document.getElementById('symptomsTable');

    symptomsTable.innerHTML = symptoms.map(symptom => `
            <tr>
                <td>#${symptom.id}</td>
                <td>${symptom.nombre}</td>
                <td><span class="category-badge digestive">Digestivo</span></td>
                <td><span class="status-badge activo">Activo</span></td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteSymptom('${symptom.id}')">Eliminar</button>
                </td>
            </tr>
    `).join('');
}




// Función global para abrir modal de agregar síntoma
function openAddSymptomModal() {
    document.getElementById('symptomForm').reset();
    document.getElementById('symptomModal').classList.add('show');
}

async function saveSymptom() {
    const name = document.getElementById('symptomName').value.trim();

    if (!name) {
        alert('Ingrese un nombre válido para el síntoma.');
        return;
    }

    try {
        const res = await fetch(`${API_URL_KEY}/diagnostico/sintomas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: name })
        });

        if (!res.ok) throw new Error('Error al guardar síntoma');
        closeSymptomModal();
        loadSymptoms();
        showSuccessMessage('Síntoma agregado correctamente');
    } catch (err) {
        console.error('Error al guardar:', err);
        alert('No se pudo guardar el síntoma.');
    }
}

function deleteSymptom(id) {
    currentDeletingId = id;
    document.getElementById('deleteModal').classList.add('show');
}

async function confirmDelete() {
    try {
        const res = await fetch(`${API_URL_KEY}/diagnostico/sintomas/${currentDeletingId}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error al eliminar');

        closeDeleteModal();
        loadSymptoms();
        showSuccessMessage('Síntoma eliminado correctamente');
    } catch (err) {
        console.error('Error al eliminar:', err);
        alert('No se pudo eliminar el síntoma.');
    }
}

function closeSymptomModal() {
    document.getElementById('symptomModal').classList.remove('show');
}

function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('show');
    currentDeletingId = null;
}

function showSuccessMessage(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 16px 24px;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Cerrar modales al hacer click fuera
document.addEventListener('click', function (e) {
    if (e.target === document.getElementById('symptomModal')) closeSymptomModal();
    if (e.target === document.getElementById('deleteModal')) closeDeleteModal();
});

// Agregar animaciones CSS
const animationStyles = `
<style>
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', animationStyles);