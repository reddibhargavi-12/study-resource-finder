import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // User Authentication State
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Recent Searches State (SRS Table 16: recentSearches)
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem('recentSearches');
      return saved ? JSON.parse(saved) : ['Python Inheritance', 'DBMS Normalization', 'Photosynthesis'];
    } catch {
      return [];
    }
  });

  // Favorite Topics State (SRS Table 16: favoriteTopics)
  const [favoriteTopics, setFavoriteTopics] = useState(() => {
    try {
      const saved = localStorage.getItem('favoriteTopics');
      return saved ? JSON.parse(saved) : ['Python Inheritance'];
    } catch {
      return [];
    }
  });

  // Persist recentSearches
  useEffect(() => {
    try {
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    } catch (e) {
      console.warn('localStorage unavailable for recentSearches', e);
    }
  }, [recentSearches]);

  // Persist favoriteTopics
  useEffect(() => {
    try {
      localStorage.setItem('favoriteTopics', JSON.stringify(favoriteTopics));
    } catch (e) {
      console.warn('localStorage unavailable for favoriteTopics', e);
    }
  }, [favoriteTopics]);

  /**
   * FR-26 & FR-31: Add to recent searches (newest first, no duplicates, max 10)
   */
  const addRecentSearch = (topic) => {
    if (!topic || !topic.trim()) return;
    const clean = topic.trim();
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== clean.toLowerCase());
      return [clean, ...filtered].slice(0, 10);
    });
  };

  /**
   * FR-28: Clear all recent searches
   */
  const clearHistory = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('recentSearches');
    } catch (e) {
      console.warn('Failed to clear recent searches from localStorage', e);
    }
  };

  /**
   * FR-29 & FR-30: Toggle topic favorite
   */
  const toggleFavorite = (topic) => {
    if (!topic || !topic.trim()) return;
    const clean = topic.trim();
    setFavoriteTopics(prev => {
      const exists = prev.some(item => item.toLowerCase() === clean.toLowerCase());
      if (exists) {
        return prev.filter(item => item.toLowerCase() !== clean.toLowerCase());
      } else {
        return [clean, ...prev];
      }
    });
  };

  const isFavorite = (topic) => {
    if (!topic) return false;
    return favoriteTopics.some(item => item.toLowerCase() === topic.trim().toLowerCase());
  };

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    if (token) localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        recentSearches,
        favoriteTopics,
        addRecentSearch,
        clearHistory,
        toggleFavorite,
        isFavorite,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
