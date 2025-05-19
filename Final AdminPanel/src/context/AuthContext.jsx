import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dbUrl = import.meta.env.VITE_DB_URL || '';

  useEffect(() => {
    // Check if user is stored in sessionStorage
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(dbUrl);

        const dbResponse = await axios.get(`${dbUrl}/adminCredentials`);
        const tokenResponse = await axios.get(`${dbUrl}/adminToken`)
        console.log(dbResponse);

        const users = dbResponse.data;
        // Find a matching user
        const matchedUser = users.find(user => user.email === email && user.password === password);

        const token = tokenResponse.data.token

        if (matchedUser) {
          const admin = {
            email: matchedUser.email,
            password: matchedUser.password
          }

          const apiUrl = import.meta.env.VITE_API_URL || ''
          const response = await axios.post(`${apiUrl}/login`, admin, {
            headers: {
              'Authentication': `Bearer ${token}`
            }
          })

          console.log(response, "response while loging in with token");

          if (response.status >= 200 && response.status < 300) {
            const user = {
              id: matchedUser.id || '1',
              name: matchedUser.name || 'Admin User',
              email: matchedUser.email,
              role: matchedUser.role || 'admin',
              profilePicture: matchedUser.profilePicture || null,
              token: response.data.token
            };
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            setCurrentUser(user);
            toast.success('Login successful');
            resolve(user);
          } else {
            toast.error('Invalid credentials');
            console.log("error in loging in if else Authcontext");

            reject(new Error('Invalid credentials'));
          }
        } else {
          toast.error('Invalid credentials');
          reject(new Error('Invalid credentials'));
        }
      } catch (error) {
        toast.error('Login failed. Server error.');
        console.log("server error in authcontext login fucntion");
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

      const response = await axios.post(`${dbUrl}/adminCredentials`, user);
      console.log('User saved to db:', response.data);

      sessionStorage.setItem('currentUser', JSON.stringify(response.data));
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
    sessionStorage.removeItem('currentUser');
    setCurrentUser(null);
    toast.success('Logged out successfully');
  };

  const updateProfile = (updatedUserData) => {
    const updatedUser = { ...currentUser, ...updatedUserData };
    sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
    toast.success('Profile updated successfully');
    return updatedUser;
  };

  const updateProfilePicture = (pictureUrl) => {
    const updatedUser = { ...currentUser, profilePicture: pictureUrl };
    sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
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