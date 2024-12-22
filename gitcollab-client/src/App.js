import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginPage from './components/auth/LoginPage';
import WelcomePage from './components/home/WelcomePage';
import AuthCallback from './components/auth/AuthCallback';
import AnimatedBackground from './components/common/AnimatedBackground';
import { auth } from './utils/auth';

// Composant de protection des routes
const PrivateRoute = ({ children }) => {
  return auth.isAuthenticated() ? children : <Navigate to="/" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('github_token');
  });
  const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('github_token');
    setIsAuthenticated(false);
    setUserData(null);
  };
  
  return (
    <ThemeProvider>
      <Router>
        <AnimatedBackground />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/callback" element={<AuthCallback />} />
          <Route 
            path="/welcome" 
            element={
              <PrivateRoute>
                <WelcomePage 
                  onLogout={handleLogout}
                />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
