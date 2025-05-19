import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi';
import axios from 'axios';
import { useAuth } from '../components/Auth/AuthContext';

const LoginPage = () => {
  // Form state for login
  const apiUrl = import.meta.env.VITE_API_URL || '';
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // Form state for registration
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  // Form validation states
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [token, setToken] = useState('');
  const [registerToken, setRegisterToken] = useState('');

  const { login, register } = useAuth();

  useEffect(() => {
    // Set page title
    document.title = isLogin ? 'Login - ShopWorld' : 'Create Account - ShopWorld';
    // Scroll to top
    window.scrollTo(0, 0);
  }, [isLogin]);

  // Handle input changes for login form
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle input changes for registration form
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });

    // Password validation
    if (name === 'password') {
      const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(value)) {
        setPasswordError('Password must be at least 8 characters with a number and special character');
      } else {
        setPasswordError('');
      }

      // Also check confirm password match
      if (registerData.confirmPassword && value !== registerData.confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
      } else {
        setConfirmPasswordError('');
      }
    }

    // Confirm password validation
    if (name === 'confirmPassword') {
      if (value !== registerData.password) {
        setConfirmPasswordError('Passwords do not match');
      } else {
        setConfirmPasswordError('');
      }
    }
  };
  console.log(isLogin, "is login or not");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login(loginData);
    } else {
      if (passwordError || confirmPasswordError) return;
      await register(registerData, setIsLogin, setConfirmPasswordError);
    }
  };

  // UI animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Toggle between login and register mode
  const toggleMode = (mode) => {
    setIsLogin(mode);
    // Reset any validation errors
    setPasswordError('');
    setConfirmPasswordError('');
  };

  return (
    <div className="py-12">
      <div className="container-custom max-w-md mx-auto">
        <motion.div
          className="bg-white rounded-lg shadow-md overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header tabs */}
          <div className="flex">
            <button
              className={`flex-1 py-4 font-medium text-center ${isLogin ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-600'}`}
              onClick={() => toggleMode(true)}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-4 font-medium text-center ${!isLogin ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-600'}`}
              onClick={() => toggleMode(false)}
            >
              Create Account
            </button>
          </div>

          <div className="p-8">
            <motion.h1
              className="text-2xl font-bold text-neutral-800 mb-6 text-center"
              variants={itemVariants}
            >
              {isLogin ? 'Welcome back' : 'Create your account'}
            </motion.h1>

            <motion.form onSubmit={handleSubmit} variants={containerVariants}>
              {/* Registration fields */}
              {!isLogin && (
                <>
                  <motion.div className="mb-4" variants={itemVariants}>
                    <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                      First Name
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
                        <FiUser />
                      </span>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={registerData.firstName}
                        onChange={handleRegisterChange}
                        className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div className="mb-4" variants={itemVariants}>
                    <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                      Last Name
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
                        <FiUser />
                      </span>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={registerData.lastName}
                        onChange={handleRegisterChange}
                        className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </motion.div>
                </>
              )}

              {/* Email field */}
              <motion.div className="mb-4" variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
                    <FiMail />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={isLogin ? loginData.email : registerData.email}
                    onChange={isLogin ? handleLoginChange : handleRegisterChange}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </motion.div>

              {/* Password field */}
              <motion.div className="mb-4" variants={itemVariants}>
                <div className="flex justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                    Password
                  </label>
                  {isLogin && (
                    <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
                    <FiLock />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={isLogin ? loginData.password : registerData.password}
                    onChange={isLogin ? handleLoginChange : handleRegisterChange}
                    className={`w-full pl-10 pr-10 py-2 border ${!isLogin && passwordError ? 'border-red-500' : 'border-neutral-300'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                    placeholder={isLogin ? 'Enter your password' : 'Create a password'}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {!isLogin && (
                  <p className={`text-xs ${passwordError ? 'text-red-500' : 'text-neutral-500'} mt-1`}>
                    {passwordError || 'Password must be at least 8 characters long and include a number and a special character.'}
                  </p>
                )}
              </motion.div>

              {/* Confirm Password field (only for registration) */}
              {!isLogin && (
                <motion.div className="mb-4" variants={itemVariants}>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
                      <FiLock />
                    </span>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      className={`w-full pl-10 pr-10 py-2 border ${confirmPasswordError ? 'border-red-500' : 'border-neutral-300'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {confirmPasswordError && (
                    <p className="text-xs text-red-500 mt-1">{confirmPasswordError}</p>
                  )}
                </motion.div>
              )}

              {/* Remember me checkbox (only for login) */}
              {isLogin && (
                <motion.div className="mb-6 flex items-center" variants={itemVariants}>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={loginData.rememberMe}
                    onChange={handleLoginChange}
                    className="h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-neutral-700">
                    Remember me
                  </label>
                </motion.div>
              )}

              {/* Submit button */}
              <motion.button
                type="submit"
                className="w-full py-3 btn-primary"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </motion.button>

              {/* Social login options */}
              <motion.div className="mt-6" variants={itemVariants}>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-neutral-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full py-2 px-4 border border-neutral-300 rounded-md shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors"
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    className="w-full py-2 px-4 border border-neutral-300 rounded-md shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors"
                  >
                    Facebook
                  </button>
                </div>
              </motion.div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;