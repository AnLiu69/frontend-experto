// Simulación de datos de usuario
const users = {
    'Pepito': {
        password: 'untels',
        role: 'paciente',
        name: 'Pepe Santos'
    },
    'medico': {
        password: '123456',
        role: 'medico',
        name: 'Dr. Perez Alvela'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const usuarioInput = document.getElementById('usuario');
    const passwordInput = document.getElementById('password');
    const rolSelect = document.getElementById('rol');

    // Validación en tiempo real
    function validateField(field, errorElementId, validationFn, errorMessage) {
        const errorElement = document.getElementById(errorElementId);
        
        field.addEventListener('blur', function() {
            if (!validationFn(field.value)) {
                field.classList.add('error');
                errorElement.textContent = errorMessage;
                errorElement.classList.add('show');
            } else {
                field.classList.remove('error');
                errorElement.classList.remove('show');
            }
        });

        field.addEventListener('input', function() {
            if (field.classList.contains('error') && validationFn(field.value)) {
                field.classList.remove('error');
                errorElement.classList.remove('show');
            }
        });
    }

    // Configurar validaciones
    validateField(usuarioInput, 'usuarioError', 
        value => value.trim() !== '', 
        'El usuario es requerido'
    );

    validateField(passwordInput, 'passwordError', 
        value => value.length >= 6, 
        'La contraseña debe tener al menos 6 caracteres'
    );

    validateField(rolSelect, 'rolError', 
        value => value !== '', 
        'Debe seleccionar un rol'
    );

    // Manejar click del botón de login
    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const usuario = usuarioInput.value.trim();
        const password = passwordInput.value;
        const rol = rolSelect.value;

        // Validar campos
        let hasErrors = false;

        if (!usuario) {
            showError('usuarioError', 'El usuario es requerido');
            usuarioInput.classList.add('error');
            hasErrors = true;
        }

        if (password.length < 6) {
            showError('passwordError', 'La contraseña debe tener al menos 6 caracteres');
            passwordInput.classList.add('error');
            hasErrors = true;
        }

        if (!rol) {
            showError('rolError', 'Debe seleccionar un rol');
            rolSelect.classList.add('error');
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        // Validar credenciales
        if (!users[usuario] || users[usuario].password !== password) {
            showError('usuarioError', 'Credenciales incorrectas');
            showError('passwordError', '');
            usuarioInput.classList.add('error');
            passwordInput.classList.add('error');
            return;
        }

        // Validar que el rol coincida
        if (users[usuario].role !== rol) {
            showError('rolError', 'El rol seleccionado no coincide con el usuario');
            rolSelect.classList.add('error');
            return;
        }

        // Guardar datos de sesión (simulado)
        localStorage.setItem('currentUser', JSON.stringify({
            username: usuario,
            name: users[usuario].name,
            role: rol
        }));

        // Redireccionar según el rol
        if (rol === 'medico') {
            window.location.href = 'src/medico.html';
        } else {
            window.location.href = 'src/paciente.html';
        }
    });

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    // Limpiar errores al escribir
    [usuarioInput, passwordInput, rolSelect].forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorElement = document.getElementById(this.id + 'Error');
                errorElement.classList.remove('show');
            }
        });
    });

    // Manejar Enter en los inputs
    [usuarioInput, passwordInput, rolSelect].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                loginButton.click();
            }
        });
    });
});