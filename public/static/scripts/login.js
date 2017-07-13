import axios from 'axios';
import notifications from './notifications';

export default function login() {
    const formWrapper = document.querySelectorAll('.form-wrapper');
    const formInputs = document.querySelectorAll('.form-wrapper input');
    const passwordInput = document.getElementById('password');
    const submitButton = document.getElementById('login-submit');
    const loginState = {
        email: '',
        password: '',
    };

    async function login() { 
        if (submitButton.classList.includes('form-valid')) {
            submitButton.classList.add('loading');

            try {
                const response = await axios.post('/login', loginState, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.data.success) {
                    submitButton.classList.remove('loading');
                    window.localStorage.setItem('token', response.data.res.token);
                    window.localStorage.setItem('user', JSON.stringify(response.data.res.user));
                    window.location.href = '/admin';
                } else {
                    const failure = new Event('login-failure');
                    submitButton.classList.remove('loading');
                    window.dispatchEvent(failure);
                }
            } catch (err) {
                const error = new Event('login-error');
                submitButton.classList.remove('loading');
                window.dispatchEvent(error);
            }
        } else {
            const formErrors = new Event('invalid-form');
            window.dispatchEvent(formErrors);
        }
    }

    function showPassword() {
        passwordInput.type = "text";
    }

    function hidePassword() {
        passwordInput.type = "password";
    }
}