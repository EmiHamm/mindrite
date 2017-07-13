import axios from 'axios';
import notifications from './notifications';
import { onBlur } from './validator';

(function contact() {
    const formWrappers = document.querySelectorAll('.input-wrapper');
    const formInputs = document.querySelectorAll('.input-wrapper input');
    const submitButton = document.getElementById('contact-submit');
    const successContent = document.getElementById('contact-success');
    const failureContent = document.getElementById('failure-content');
    const errorContent = document.getElementById('error-content');
    const contactState = {
        name: '',
        email: '',
        phone: '',
        message: '',
    };

    function createNotification(content, timeout, type) {
        return new notifications({
            content,
            timeout,
            type,
        });
    }

    function updateState(node) {
        const { name, value } = node;
        contactState[name] = value;
    }

    function resetForm() {
        for (const input of formInputs) {
            input.value = '';
            input.classList.remove('valid');
        }
    }

    onBlur(formInputs, updateState);

    async function sendMessage() {
        if (submitButton.classList.contains('form-valid')) {
            submitButton.classList.add('loading');

            try {
                const response = await axios.post('/contact', contactState, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.data.success) {
                    createNotification(sucessContent, 2000, 'success');

                    const success = new Event('message-sent');
                    window.setTimeout(() => {
                        submitButton.classList.remove('loading');
                        window.dispatchEvent(success);
                        submitButton.classList.remove('form-valid');
                        resetForm();
                    }, 700);
                } else {
                    createNotification(failureContent, 2000, 'failure');

                    const failure = new Event('message-failed');
                    submitButton.classList.remove('loading');
                    window.dispatchEvent(failure);
                }
            } catch (err) {
                createNotification(errorContent, 2000, 'error');

                const error = new Event('message-error');
                window.dispatchEvent(error);
            }
        }
    }
})();