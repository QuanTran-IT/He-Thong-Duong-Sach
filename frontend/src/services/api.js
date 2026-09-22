const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:4000/api';

export const api = {
    // Auth endpoints
    login: async (credentials) => {
        const res = await fetch(`${AUTH_API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        if (!res.ok) throw new Error('Login failed');
        return res.json();
    },
    
    // Admin endpoints (example)
    getEvents: async () => {
        const res = await fetch(`${API_BASE_URL}/admin/events`);
        if (!res.ok) throw new Error('Failed to fetch events');
        return res.json();
    }
};
