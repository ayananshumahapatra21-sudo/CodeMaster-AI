import apiClient from './apiClient';

export const authService = {
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    if (response.data?.token) {
      localStorage.setItem('codemaster_token', response.data.token);
    }
    return response.data;
  },

  register: async (name, email, password) => {
    const response = await apiClient.post('/auth/register', { name, email, password });
    if (response.data?.token) {
      localStorage.setItem('codemaster_token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('codemaster_token');
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/users/me');
    return response.data;
  }
};
