// Obtener referencias a los elementos del formulario
const form = document.querySelector('form');
const userInput = document.getElementById('user');
const passwordInput = document.getElementById('password');

// Función para mostrar el mensaje de error
function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');

    // Crear un elemento de error si no existe
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.classList.add('error-message');
        formGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

// Función para limpiar el mensaje de error
function clearError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        formGroup.removeChild(errorElement);
    }
}

// Validar los campos al enviar el formulario
form.addEventListener('submit', function (e) {
    let isValid = true;

    // Validar el campo de usuario
    if (userInput.value.trim() === '') {
        showError(userInput, 'El campo usuario no puede estar vacío.');
        isValid = false;
    } else {
        clearError(userInput);
    }

    // Validar el campo de contraseña
    if (passwordInput.value.trim() === '') {
        showError(passwordInput, 'El campo contraseña no puede estar vacío.');
        isValid = false;
    } else {
        clearError(passwordInput);
    }

    // Prevenir el envío del formulario si hay errores
    if (!isValid) {
        e.preventDefault();
    }
});
