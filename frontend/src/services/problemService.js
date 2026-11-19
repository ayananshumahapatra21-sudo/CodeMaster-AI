import apiClient from './apiClient';

export const problemService = {
  getAllProblems: async () => {
    const response = await apiClient.get('/problems');
    return response.data;
  },

  getProblemById: async (id) => {
    const response = await apiClient.get(`/problems/${id}`);
    return response.data;
  },

  runCode: async (id, code, language) => {
    const response = await apiClient.post(`/problems/${id}/run`, {
      code,
      language
    });
    return response.data;
  }
};
