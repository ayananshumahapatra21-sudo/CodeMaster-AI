import apiClient from './apiClient';

export const leaderboardService = {
  getLeaderboard: async () => {
    const response = await apiClient.get('/leaderboard');
    return response.data?.data || response.data;
  }
};

export const progressService = {
  getProgress: async () => {
    const response = await apiClient.get('/users/me/progress');
    return response.data?.data || response.data;
  }
};
