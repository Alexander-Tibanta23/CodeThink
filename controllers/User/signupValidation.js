document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('input');
    const errorMessages = {
        'First Name': 'First name is required.',
        'Last Name': 'Last name is required.',
        'Email': 'A valid email is required.',
        'Password': 'Password is required.',
        'Repeat Password': 'You must confirm your password.',
        'Passwords Mismatch': 'Passwords do not match.',
        'Weak Password': 'Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.',
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form submission
        let isValid = true;
        let passwordValue = '';
        let repeatPasswordValue = '';

        inputs.forEach(input => {
            const placeholder = input.getAttribute('placeholder');
            const value = input.value.trim();
            const errorContainer = input.nextElementSibling;

            // Validate empty fields
            if (!value) {
                isValid = false;
                input.style.border = '2px solid red';

                if (!errorContainer || !errorContainer.classList.contains('error')) {
                    const error = document.createElement('p');
                    error.className = 'error';
                    error.textContent = errorMessages[placeholder];
                    error.style.color = 'red';
                    error.style.fontSize = '0.9rem';
                    input.insertAdjacentElement('afterend', error);
                }
            } else {
                input.style.border = '';
                if (errorContainer && errorContainer.classList.contains('error')) {
                    errorContainer.remove();
                }
            }

            // Store password and repeat password values
            if (placeholder === 'Password') {
                passwordValue = value;
            }
            if (placeholder === 'Repeat Password') {
                repeatPasswordValue = value;
            }
        });

        // Validate password security
        if (passwordValue) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(passwordValue)) {
                isValid = false;
                const passwordInput = document.querySelector('input[placeholder="Password"]');
                const errorContainer = passwordInput.nextElementSibling;

                passwordInput.style.border = '2px solid red';

                if (!errorContainer || !errorContainer.classList.contains('error')) {
                    const error = document.createElement('p');
                    error.className = 'error';
                    error.textContent = errorMessages['Weak Password'];
                    error.style.color = 'red';
                    error.style.fontSize = '0.9rem';
                    passwordInput.insertAdjacentElement('afterend', error);
                }
            }
        }

        // Validate passwords match
        if (passwordValue && repeatPasswordValue && passwordValue !== repeatPasswordValue) {
            isValid = false;
            const repeatPasswordInput = document.querySelector('input[placeholder="Repeat Password"]');
            const errorContainer = repeatPasswordInput.nextElementSibling;

            repeatPasswordInput.style.border = '2px solid red';

            if (!errorContainer || !errorContainer.classList.contains('error')) {
                const error = document.createElement('p');
                error.className = 'error';
                error.textContent = errorMessages['Passwords Mismatch'];
                error.style.color = 'red';
                error.style.fontSize = '0.9rem';
                repeatPasswordInput.insertAdjacentElement('afterend', error);
            }
        }

        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
        }
    });
});
