import axios from 'axios';

export default function admin() {
    async function checkAdmin() {
        const token = window.localStorage.getItem('token');
        try {
            const response = axios.get('/checkAdmin', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.data.success) {
                return;
            } else {
                window.location.href = '/';
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    async function getMessages() {

    }
}