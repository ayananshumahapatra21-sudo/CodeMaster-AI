import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Response interceptor for consistent error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API Client Error]:', error.response || error.message);
    return Promise.reject(error);
  }
);

export const healthApi = {
  getHealth: async () => {
    const response = await apiClient.get('/health');
    return response.data;
  }
};

export default apiClient;
