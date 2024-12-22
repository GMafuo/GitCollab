import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaHistory } from 'react-icons/fa';

const SearchWrapper = styled.div`
  position: relative;
  max-width: 600px;
  margin: 2rem auto;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 10px;
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  padding-left: 40px;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}33;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.textSecondary};
`;

const SearchButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary}dd;
  }
`;

const RecentSearches = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background: ${({ theme }) => theme.surface};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const RecentItem = styled(motion.div)`
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};

  svg {
    color: ${({ theme }) => theme.textSecondary};
  }

  &:hover {
    background: ${({ theme }) => theme.border}33;
  }
`;

const EnhancedSearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showRecent, setShowRecent] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setRecentSearches(prev => {
        const newSearches = [searchTerm.trim(), ...prev.filter(s => s !== searchTerm.trim())].slice(0, 5);
        return newSearches;
      });
      setShowRecent(false);
    }
  };

  return (
    <SearchWrapper>
      <SearchForm onSubmit={handleSubmit}>
        <InputWrapper>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Rechercher un utilisateur GitHub..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowRecent(true)}
          />
        </InputWrapper>
        <SearchButton type="submit">
          Rechercher
        </SearchButton>
      </SearchForm>

      <AnimatePresence>
        {showRecent && recentSearches.length > 0 && (
          <RecentSearches
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {recentSearches.map((term, index) => (
              <RecentItem
                key={index}
                onClick={() => {
                  setSearchTerm(term);
                  onSearch(term);
                  setShowRecent(false);
                }}
              >
                <FaHistory />
                {term}
              </RecentItem>
            ))}
          </RecentSearches>
        )}
      </AnimatePresence>
    </SearchWrapper>
  );
};

export default EnhancedSearchBar;
