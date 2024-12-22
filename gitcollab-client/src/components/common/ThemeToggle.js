import React from 'react';
import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <ToggleButton
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </ToggleButton>
  );
};

const ToggleButton = styled(motion.button)`
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;
  z-index: 100;
  
  &:hover {
    background: ${({ theme }) => theme.surfaceHover};
  }
`;

const StyledComponent = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

export default ThemeToggle; 