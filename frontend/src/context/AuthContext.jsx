import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // Check localStorage for user info on initial load
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  // Login handler
  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    localStorage.setItem('authToken', userData.token);
    setUserInfo(userData);
    navigate('/'); // Redirect to homepage after login
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('authToken');
    setUserInfo(null);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create a custom hook for easy access to the context
export const useAuth = () => {
  return useContext(AuthContext);
};