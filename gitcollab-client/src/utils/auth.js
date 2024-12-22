export const auth = {
  isAuthenticated() {
    return !!localStorage.getItem('github_token');
  },

  getToken() {
    return localStorage.getItem('github_token');
  },

  setToken(token) {
    localStorage.setItem('github_token', token);
  },

  removeToken() {
    localStorage.removeItem('github_token');
  },

  async handleAuthCallback(code) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/github/callback?code=${code}`);
      const data = await response.json();
      
      if (data.access_token) {
        this.setToken(data.access_token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur lors de l\'authentification:', error);
      return false;
    }
  },

  async getUserInfo() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des informations utilisateur:', error);
      return null;
    }
  }
}; 