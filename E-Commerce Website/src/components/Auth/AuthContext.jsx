import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { handleLogin, handleRegister } from './authFunctions';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL || '';

    useEffect(() => {
        // Check if user is stored in sessionStorage
        const storedUser = sessionStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (loginData) => {
        try {
            const result = await handleLogin(loginData);
            if (result.success) {
                setCurrentUser(result.user);
                toast.success('Login successful');
                return result.user;
            } else {
                toast.error(result.error);
                throw new Error(result.error);
            }
        } catch (error) {
            toast.error('Login failed. Please try again.');
            throw error;
        }
    };

    const register = async (registerData, setIsLogin, setConfirmPasswordError) => {
        try {
            const result = await handleRegister(registerData, setIsLogin, setConfirmPasswordError);
            if (result.success) {
                toast.success('Registration successful! Please log in.');
                return result;
            } else {
                toast.error(result.error);
                throw new Error(result.error);
            }
        } catch (error) {
            toast.error('Registration failed. Please try again.');
            throw error;
        }
    };

    const logout = () => {
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        setCurrentUser(null);
        toast.success('Logged out successfully');
    };

    const value = {
        currentUser,
        loading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};