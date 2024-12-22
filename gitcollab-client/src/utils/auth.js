const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://gitcollab.onrender.com'
  : process.env.REACT_APP_API_URL;

const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;

export const auth = {
  loginWithGithub: () => {
    const redirectUri = process.env.NODE_ENV === 'production'
      ? 'https://gitcollab.onrender.com/auth/github/callback'
      : 'http://localhost:5000/auth/github/callback';

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user+repo`;
    
    window.location.href = githubAuthUrl;
  },

  handleCallback: async (code) => {
    try {
      const response = await fetch(`${API_URL}/auth/github/callback?code=${code}`);
      const data = await response.json();
      
      if (data.access_token) {
        localStorage.setItem('github_token', data.access_token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur lors de l\'authentification:', error);
      return false;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('github_token');
  },

  logout: () => {
    localStorage.removeItem('github_token');
  }
}; 