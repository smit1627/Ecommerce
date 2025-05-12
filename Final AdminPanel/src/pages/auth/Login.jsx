import React, { use, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaEnvelope, FaGoogle, FaLock } from 'react-icons/fa';
import { Eye } from 'lucide-react';
import axios from 'axios';


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      // Fetch the stored credentials from db.json
      const dbUrl = import.meta.env.VITE_DB_URL || '';
      const response = await axios.get(`${dbUrl}/adminCredentials`);
      console.log(response);

      const stored = await response.data;
      console.log(stored);

      stored.forEach(async (user) => {
        if (formData.email === user.email && formData.password === user.password) {
          await login(formData.email, formData.password);
          navigate('/dashboard');
          console.log('User found:', user);
        } else {
          setErrors({ ...errors, password: 'Invalid email or password' });
        }
      })
    } catch (error) {
      console.error('Login error:', error.message);
      setErrors({ ...errors, password: 'Server error. Try again later.' });
    } finally {
      setIsLoading(false);
    }
  };


  const fillDemoCredentials = () => {
    setFormData({ email: 'admin@example.com', password: 'password' });
  };

  return (
    <div className="relative h-screen flex justify-center items-center bg-[#101010] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] overflow-hidden">
      {/* Glowing grid */}
      <div className="absolute top-[-50%] left-[-50%] w-[250%] h-[250%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[length:30px_30px] animate-[spin_50s_linear_infinite] opacity-50 z-0 pointer-events-none brightness-110" />

      {/* Particles */}
      {[15, 35, 55, 75, 90].map((left, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 bg-white/15 rounded-full shadow-[0_0_12px_4px_rgba(255,255,255,0.08)] animate-[floatUp_12s_linear_infinite]"
          style={{ left: `${left} % `, animationDelay: `${i * 1.5}s` }}
        />
      ))}

      <div className="relative bg-gradient-to-br from-white to-gray-100 p-8 rounded-[20px] shadow-xl border-2 border-dashed border-gray-400 w-[400px] clip-ticket transform transition-transform duration-300 hover:scale-105 z-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Audiowide, sans-serif' }}>
            Admin Login
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1" style={{ fontFamily: 'Viga, sans-serif' }}>
              <FaEnvelope className="inline mr-2" /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              style={{ fontFamily: 'Space Mono, monospace' }}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1" style={{ fontFamily: 'Viga, sans-serif' }}>
              <FaLock className="inline mr-2" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                style={{ fontFamily: 'Space Mono, monospace' }}

              />
              <Eye onClick={() => setShowPassword(!showPassword)} className='absolute top-[22%] right-[5%] z-999'></Eye>

            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="text-right mb-3" style={{ fontFamily: 'Space Mono, monospace' }}>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Forgot Password?</a>
          </div>

          <div className="flex justify-center mb-3">
            <button
              type="submit"
              className="bg-gradient-to-br from-[#ff6f61] to-[#d32f2f] text-white font-semibold px-8 py-3 rounded-[10px] uppercase tracking-wider relative shadow-lg transition-transform transform hover:scale-105 hover:from-[#ff8a75] hover:to-[#f44336] active:scale-95"
              style={{
                fontFamily: 'Space Mono, monospace',
                clipPath: 'polygon(10% 0%, 90% 0%, 100% 15%, 100% 85%, 90% 100%, 10% 100%, 0% 85%, 0% 15%)'
              }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
