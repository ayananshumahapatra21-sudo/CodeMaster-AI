import apiClient from './apiClient';

export const healthService = {
  getHealth: async () => {
    const response = await apiClient.get('/health');
    return response.data;
  }
};
