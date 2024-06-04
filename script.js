document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('subscription-form');
    const formTitle = document.getElementById('form-title');
    const nameInput = document.getElementById('full-name');

    nameInput.addEventListener('input', function() {
        formTitle.textContent = `HOLA ${nameInput.value}`;
    });

    form.addEventListener('blur', function(event) {
        if (event.target.tagName === 'INPUT') {
            validateField(event.target);
        }
    }, true);

    form.addEventListener('focus', function(event) {
        if (event.target.tagName === 'INPUT') {
            clearError(event.target);
        }
    }, true);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;
        const inputs = form.querySelectorAll('input');

        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            alert('Formulario enviado correctamente');
        } else {
            alert('Por favor corrige los errores en el formulario');
        }
    });

    function validateField(field) {
        let isValid = true;
        const errorMessage = field.nextElementSibling;

        switch (field.name) {
            case 'full-name':
                isValid = /^[a-zA-Z\s]{7,}$/.test(field.value) && field.value.includes(' ');
                errorMessage.textContent = isValid ? '' : 'El nombre debe tener más de 6 letras y al menos un espacio';
                break;
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
                errorMessage.textContent = isValid ? '' : 'Debe ser un email válido';
                break;
            case 'password':
                isValid = /^[a-zA-Z0-9]{8,}$/.test(field.value);
                errorMessage.textContent = isValid ? '' : 'La contraseña debe tener al menos 8 caracteres y ser formada por letras y números';
                break;
            case 'confirm-password':
                const password = document.getElementById('password').value;
                isValid = field.value === password;
                errorMessage.textContent = isValid ? '' : 'Las contraseñas no coinciden';
                break;
            case 'age':
                isValid = /^\d+$/.test(field.value) && parseInt(field.value) >= 18;
                errorMessage.textContent = isValid ? '' : 'Debe ser un número entero mayor o igual a 18';
                break;
            case 'phone':
                isValid = /^\d{7,}$/.test(field.value);
                errorMessage.textContent = isValid ? '' : 'El teléfono debe tener al menos 7 dígitos y no debe contener espacios, guiones ni paréntesis';
                break;
            case 'address':
                isValid = /^[a-zA-Z0-9\s]{5,}$/.test(field.value) && field.value.includes(' ');
                errorMessage.textContent = isValid ? '' : 'La dirección debe tener al menos 5 caracteres con letras, números y un espacio';
                break;
            case 'city':
                isValid = /^[a-zA-Z\s]{3,}$/.test(field.value);
                errorMessage.textContent = isValid ? '' : 'La ciudad debe tener al menos 3 caracteres';
                break;
            case 'postal-code':
                isValid = /^[a-zA-Z0-9]{3,}$/.test(field.value);
                errorMessage.textContent = isValid ? '' : 'El código postal debe tener al menos 3 caracteres';
                break;
            case 'dni':
                isValid = /^\d{7,8}$/.test(field.value);
                errorMessage.textContent = isValid ? '' : 'El DNI debe tener 7 u 8 dígitos';
                break;
            default:
                isValid = true;
        }

        return isValid;
    }

    function clearError(field) {
        const errorMessage = field.nextElementSibling;
        errorMessage.textContent = '';
    }
});