// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 
                     (import.meta.env.PROD ? '' : 'http://localhost:5000');

export const API_URL = `${API_BASE_URL}/api`;

export default API_URL;
