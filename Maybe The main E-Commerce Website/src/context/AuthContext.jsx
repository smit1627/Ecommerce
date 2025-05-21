import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL || ''

  useEffect(() => {
    // Check if user is stored in sessionStorage
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    try {
      console.log(userData);
      const response = await axios.post(`${apiUrl}/login`, userData);
      console.log(response);

      if (response.status >= 200 && response.status < 300 && response.data.token && response.data.message === "Login successful") {
        const { email } = userData
        console.log(email);
        const loggedInUser = {
          email,
          token: response.data.token
        };
        console.log(loggedInUser);

        sessionStorage.setItem('currentUser', JSON.stringify(loggedInUser));
        setCurrentUser(loggedInUser);
        return true;
      }
    } catch (error) {
      console.log("Invalid Credential", error.message);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${apiUrl}/register`, userData);
      console.log(response);

      if (response.status >= 200 && response.status < 300) {
        // Store in localStorage so it's persistent
        // localStorage.setItem('registeredUser', JSON.stringify(registeredUser));
        return true;
      } else {
        console.log("error while registering the user");
      }
    } catch (error) {
      console.log("Error during registration:", error.message);
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...currentUser, ...updatedData };
    sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
    return true;
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};