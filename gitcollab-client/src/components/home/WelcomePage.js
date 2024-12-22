import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUsers, FaTrophy, FaChartLine, FaSignOutAlt } from 'react-icons/fa';
import EnhancedSearchBar from '../search/EnhancedSearchBar';

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
  color: #0366d6;
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

const SearchSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
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

const LogoutButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.error}22;
  color: ${({ theme }) => theme.error};
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: ${({ theme }) => theme.error}33;
  }
`;

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

const WelcomePage = ({ onLogout, onSearch }) => {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('github_token');
      
      if (token) {
        await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      }
      
      const githubLogoutWindow = window.open('https://github.com/logout', 'github_logout', 'width=600,height=400');
      
      const checkWindow = setInterval(() => {
        if (githubLogoutWindow && githubLogoutWindow.closed) {
          clearInterval(checkWindow);
          localStorage.removeItem('github_token');
          onLogout();
          window.location.href = '/';
        }
      }, 1000);
      
    } catch (error) {
      localStorage.removeItem('github_token');
      onLogout();
      window.location.href = '/';
    }
  };

  return (
    <HeroSection>
      <LogoutButton
        onClick={handleLogout}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaSignOutAlt />
        Déconnexion
      </LogoutButton>

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

      <SearchSection
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        <EnhancedSearchBar onSearch={onSearch} />
      </SearchSection>

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

export default WelcomePage;