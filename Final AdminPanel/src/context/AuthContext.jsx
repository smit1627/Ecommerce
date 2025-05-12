import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        console.log(apiUrl);

        const response = await axios.get(`${apiUrl}/adminCredentials`);
        console.log(response);

        const users = response.data;

        // Find a matching user
        const matchedUser = users.find(user => user.email === email && user.password === password);

        if (matchedUser) {
          const user = {
            id: matchedUser.id || '1',
            name: matchedUser.name || 'Admin User',
            email: matchedUser.email,
            role: matchedUser.role || 'admin',
            profilePicture: matchedUser.profilePicture || null
          };

          localStorage.setItem('currentUser', JSON.stringify(user));
          setCurrentUser(user);
          toast.success('Login successful');
          resolve(user);
        } else {
          toast.error('Invalid credentials');
          reject(new Error('Invalid credentials'));
        }
      } catch (error) {
        toast.error('Login failed. Server error.');
        reject(error);
      }
    });
  };


  const register = async (name, email, password) => {
    try {
      const user = {
        name,
        email,
        password, // include password if needed
        role: 'admin',
        profilePicture: null
      };

      const response = await axios.post("http://localhost:3000/adminCredentials", user);
      console.log('User saved to db:', response.data);

      localStorage.setItem('currentUser', JSON.stringify(response.data));
      setCurrentUser(response.data);
      toast.success('Registration successful');

      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Failed to register user');
      throw error;
    }
  };


  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    toast.success('Logged out successfully');
  };

  const updateProfile = (updatedUserData) => {
    const updatedUser = { ...currentUser, ...updatedUserData };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
    toast.success('Profile updated successfully');
    return updatedUser;
  };

  const updateProfilePicture = (pictureUrl) => {
    const updatedUser = { ...currentUser, profilePicture: pictureUrl };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
    toast.success('Profile picture updated');
    return updatedUser;
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    updateProfile,
    updateProfilePicture
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};