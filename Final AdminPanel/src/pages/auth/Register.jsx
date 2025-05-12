import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { FaEnvelope, FaGoogle, FaLock } from 'react-icons/fa';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
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
          style={{ left: `${left}%`, animationDelay: `${i * 1.5}s` }}
        />
      ))}

      <div className="relative bg-gradient-to-br from-white to-gray-100 p-8 rounded-[20px] shadow-xl border-2 border-dashed border-gray-400 w-[400px] clip-ticket transform transition-transform duration-300 hover:scale-105 z-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Audiowide, sans-serif' }}>
            Admin Register
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1" style={{ fontFamily: 'Viga, sans-serif' }}>
              <FaEnvelope className="inline mr-2" /> Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              style={{ fontFamily: 'Space Mono, monospace' }}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
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
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1" style={{ fontFamily: 'Viga, sans-serif' }}>
              <FaLock className="inline mr-2" /> confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                style={{ fontFamily: 'Space Mono, monospace' }}

              />
              <Eye onClick={() => setShowPassword(!showPassword)} className='absolute top-[22%] right-[5%] z-999'></Eye>

            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
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
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>

          <div className="text-center mb-2 text-red-600 font-bold" style={{ fontFamily: 'monospace' }}>
            <Link to='/login'>Already have an account?{' '}</Link>
          </div>

          <div className="text-center text-gray-600 font-medium cursor-pointer hover:text-[#db4437] transition-colors" style={{ fontFamily: 'Space Mono, monospace' }}>
            <FaGoogle className="inline mr-2 text-lg" /> Login with Google
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
