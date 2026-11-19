import apiClient from './apiClient';

export const aiService = {
  getHint: async (problemId, problemTitle, code, language) => {
    const response = await apiClient.post('/ai/hint', {
      problemId,
      problemTitle,
      code,
      language
    });
    return response.data?.data || response.data;
  },

  explainProblem: async (problemId, problemTitle) => {
    const response = await apiClient.post('/ai/explain', {
      problemId,
      problemTitle
    });
    return response.data?.data || response.data;
  },

  debugCode: async (problemId, problemTitle, code, language) => {
    const response = await apiClient.post('/ai/debug', {
      problemId,
      problemTitle,
      code,
      language
    });
    return response.data?.data || response.data;
  }
};
