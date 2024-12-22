const API_URL = process.env.REACT_APP_API_URL;

export const githubService = {
  async getAccessToken(code) {
    try {
      const response = await fetch(`${API_URL}/api/auth/github/callback?code=${code}`);
      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('github_token', data.access_token);
        return data.access_token;
      }
      throw new Error('Token non reçu');
    } catch (error) {
      console.error('Erreur lors de la récupération du token:', error);
      throw error;
    }
  },

  async getUserRepos(username) {
    const token = localStorage.getItem('github_token');
    try {
      const response = await fetch(`${API_URL}/api/repos/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des repos:', error);
      throw error;
    }
  }
}; 