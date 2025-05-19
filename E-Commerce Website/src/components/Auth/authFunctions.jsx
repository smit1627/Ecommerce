import axios from 'axios';
import toast from 'react-hot-toast';

// Login function
export const handleLogin = async (loginData) => {
    try {
        const registerToken = localStorage.getItem('token')
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await axios.post(`${apiUrl}/login`, {
            email: loginData.email,
            password: loginData.password
        }, {
            headers: {
                Authorization: `Bearer ${registerToken}`
            }
        });

        const token = response.data.token;

        if (!token) {
            toast.error("Invalid Credentials");
            return { success: false, error: "Invalid Credentials" };
        }

        const user = {
            email: loginData.email,
            token: token,
        };

        console.log("Login successful:", user);
        sessionStorage.setItem("currentUser", JSON.stringify(user));

        return { success: true, user };

    } catch (error) {
        const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
        console.error("Login failed:", errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
    }
};

// Register function
export const handleRegister = async (registerData, setIsLogin, setConfirmPasswordError) => {
    const apiUrl = import.meta.env.VITE_API_URL || '';

    // Check for password match
    if (registerData.password !== registerData.confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
        toast.error("Passwords do not match");
        return { success: false, error: 'Passwords do not match' };
    }

    try {
        const userData = {
            name: registerData.firstName,
            lastName: registerData.lastName,
            email: registerData.email,
            password: registerData.password
        };

        const response = await axios.post(`${apiUrl}/register`, userData);
        const token = response.data.token;

        if (!token) {
            throw new Error("Registration failed: No token returned");
        }

        localStorage.setItem('token', token);
        console.log("Registration successful:", userData);
        toast.success("Registration successful! Please log in.");
        setIsLogin(true); // Switch to login mode after successful registration

        return { success: true, token };

    } catch (error) {
        const errorMessage = error.response?.data?.message || "Registration failed. Try a different email.";
        console.error("Registration failed:", errorMessage);
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
    }
};