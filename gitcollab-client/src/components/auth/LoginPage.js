import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaUsers, FaTrophy, FaChartLine } from 'react-icons/fa';
import { useNavigate, Navigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('github_token');
    if (token) {
      setIsAuthenticated(true);
      navigate('/welcome');
    }
  }, [navigate]);

  const handleGithubLogin = () => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_GITHUB_REDIRECT_URI;
    
    console.log('Tentative de connexion GitHub');
    console.log('Client ID:', clientId);
    console.log('Redirect URI:', redirectUri);
    
    if (!clientId || !redirectUri) {
      console.error('Variables d\'environnement manquantes');
      return;
    }
    
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    githubAuthUrl.searchParams.append('client_id', clientId);
    githubAuthUrl.searchParams.append('redirect_uri', redirectUri);
    githubAuthUrl.searchParams.append('scope', 'user repo');
    githubAuthUrl.searchParams.append('state', Math.random().toString(36).substring(7));
    
    window.location.href = githubAuthUrl.toString();
  };

  if (isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  return (
    <HeroSection>
      <MainTitle
        as={motion.h1}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        GitCollab
      </MainTitle>
      
      <Subtitle
        as={motion.p}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        Trouvez les meilleurs développeurs pour collaborer sur vos projets
      </Subtitle>

      <LoginSection
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        <LoginButton onClick={handleGithubLogin}>
          <FaGithub /> Se connecter avec GitHub
        </LoginButton>
      </LoginSection>

      <Features>
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
            whileHover={{ y: -5, boxShadow: '0 8px 32px rgba(3, 102, 214, 0.2)' }}
          >
            <h3>{feature.icon} {feature.title}</h3>
            <p>{feature.description}</p>
          </FeatureCard>
        ))}
      </Features>
    </HeroSection>
  );
};

const features = [
  {
    icon: <FaUsers />,
    title: "Collaboration",
    description: "Trouvez des développeurs partageant vos intérêts et compétences"
  },
  {
    icon: <FaTrophy />,
    title: "Gamification",
    description: "Gagnez des badges et montez en niveau en contribuant"
  },
  {
    icon: <FaChartLine />,
    title: "Statistiques",
    description: "Suivez votre progression et celle de votre équipe"
  }
];

const HeroSection = styled.div`
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const MainTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(135deg, #0366d6 0%, #2ea44f 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #8b949e;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
`;

const LoginSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 4rem;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: white;
  background: #2ea44f;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: #2c974b;
  }

  svg {
    font-size: 1.4rem;
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  h3 {
    font-size: 1.25rem;
    color: #58a6ff;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    color: #8b949e;
    line-height: 1.6;
  }
`;

export default LoginPage; 