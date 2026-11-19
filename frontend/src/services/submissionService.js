import apiClient from './apiClient';

export const submissionService = {
  submitCode: async (problemId, language, sourceCode) => {
    const response = await apiClient.post('/submissions', {
      problemId,
      language,
      sourceCode
    });
    return response.data?.data || response.data;
  },

  getHistory: async () => {
    const response = await apiClient.get('/submissions/history');
    return response.data?.data || response.data;
  }
};
