import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../utils/auth';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');

      if (code) {
        const success = await auth.handleAuthCallback(code);
        if (success) {
          navigate('/welcome');
        } else {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    };

    handleCallback();
  }, [location, navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      Authentification en cours...
    </div>
  );
};

export default AuthCallback; 