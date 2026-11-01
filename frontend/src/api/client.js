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

export const problemsApi = {
  getProblems: async () => {
    const response = await apiClient.get('/problems');
    return response.data;
  },
  getProblemById: async (id) => {
    const response = await apiClient.get(`/problems/${id}`);
    return response.data;
  },
  runCode: async (id, payload) => {
    const response = await apiClient.post(`/problems/${id}/run`, payload);
    return response.data;
  }
};

export default apiClient;
