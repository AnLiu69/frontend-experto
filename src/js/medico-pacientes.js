let patientsData = [];

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const patientsTable = document.getElementById('patientsTable');

    // Filtros y búsqueda
    function filterPatients() {
        const searchTerm = searchInput.value.toLowerCase();

        const filteredPatients = patientsData.filter(p => {
            return (
                p.nombre.toLowerCase().includes(searchTerm) ||
                p.correo.toLowerCase().includes(searchTerm) ||
                String(p.id).includes(searchTerm)
            );
        });

        renderPatientsTable(filteredPatients);
    }

    async function loadPatientsFromBackend() {
        try {
            const response = await fetch(`${API_URL_KEY}/diagnostico/pacientes`); // Ruta que configuraremos en el backend
            const data = await response.json();
            patientsData = data;
            renderPatientsTable(patientsData);
        } catch (error) {
            console.error("Error al cargar pacientes:", error);
        }
    }

    function renderPatientsTable(patients) {
        patientsTable.innerHTML = patients.map(patient => `
            <tr>
                <td>#${patient.id}</td>
                <td>${patient.nombre}</td>
                <td>${patient.correo}</td>
                <td><span class="status-badge active">Activo</span></td>
            </tr>
        `).join('');
    }

    // Event listeners para filtros
    searchInput.addEventListener('input', filterPatients);

    // Renderizar tabla inicial
    loadPatientsFromBackend();
});

document.head.insertAdjacentHTML('beforeend', additionalStyles);