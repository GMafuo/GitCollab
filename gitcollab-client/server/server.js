const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route pour l'authentification GitHub
app.get('/api/auth/github/callback', async (req, res) => {
  const { code } = req.query;
  
  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }, {
      headers: {
        Accept: 'application/json',
      },
    });

    const { access_token } = response.data;
    res.json({ access_token });
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    res.status(500).json({ error: 'Erreur d\'authentification' });
  }
});

// Route pour récupérer les repos d'un utilisateur
app.get('/api/repos/:username', async (req, res) => {
  const { username } = req.params;
  
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `token ${req.headers.authorization?.split(' ')[1]}`,
      },
    });
    
    const repos = response.data.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      created_at: repo.created_at,
      html_url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
    }));
    
    res.json(repos);
  } catch (error) {
    console.error('Erreur lors de la récupération des repos:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des repos' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
}); 