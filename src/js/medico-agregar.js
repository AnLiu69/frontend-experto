document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addPatientForm');
    const confirmModal = document.getElementById('confirmModal');

    // Configurar validaciones para cada campo
    setupFieldValidation('nombre', value => value.trim().length >= 2, 'El nombre debe tener al menos 2 caracteres');
    setupFieldValidation('correo', value => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }, 'Ingrese un correo electrónico válido');

    // Validación en tiempo real
    function setupFieldValidation(fieldId, validationFn, errorMessage) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');

        field.addEventListener('blur', function() {
            validateField(field, errorElement, validationFn, errorMessage);
        });

        field.addEventListener('input', function() {
            if (field.classList.contains('error') && validationFn(field.value)) {
                clearFieldError(field, errorElement);
            }
        });
    }

    function validateField(field, errorElement, validationFn, errorMessage) {
        if (!validationFn(field.value)) {
            showFieldError(field, errorElement, errorMessage);
            return false;
        } else {
            clearFieldError(field, errorElement);
            return true;
        }
    }

    function showFieldError(field, errorElement, message) {
        field.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    function clearFieldError(field, errorElement) {
        field.classList.remove('error');
        errorElement.classList.remove('show');
    }

    function clearAllErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    }

    // Manejar envío del formulario
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre');
        const correo = document.getElementById('correo');

        let isValid = true;

        if (!validateField(nombre, document.getElementById('nombreError'), value => value.trim().length >= 2, 'El nombre debe tener al menos 2 caracteres')) {
            isValid = false;
        }

        if (!validateField(correo, document.getElementById('correoError'), value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), 'Ingrese un correo electrónico válido')) {
            isValid = false;
        }

        if (!isValid) return;

        try {
            const response = await fetch(`${API_URL_KEY}/diagnostico/pacientes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: nombre.value.trim(),
                    correo: correo.value.trim()
                })
            });

            const result = await response.json();

            if (response.ok) {
                confirmModal.classList.add('show');
                form.reset();
                clearAllErrors();
            } else {
                alert(result.error || 'Ocurrió un error al registrar el paciente.');
            }
        } catch (err) {
            console.error('Error al guardar paciente:', err);
            alert('No se pudo conectar con el servidor.');
        }
    });
});

// Función global para limpiar formulario
function resetForm() {
    const form = document.getElementById('addPatientForm');
    form.reset();
    clearAllErrors();
}

// Función global para cerrar modal de confirmación
function closeConfirmModal() {
    document.getElementById('confirmModal').classList.remove('show');
}

// Cerrar modal al hacer click fuera
document.addEventListener('click', function(e) {
    const modal = document.getElementById('confirmModal');
    if (e.target === modal) {
        closeConfirmModal();
    }
});