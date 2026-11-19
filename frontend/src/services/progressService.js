import apiClient from './apiClient';

export const progressService = {
  getProgress: async () => {
    const response = await apiClient.get('/users/me/progress');
    return response.data?.data || response.data;
  }
};

export default progressService;
