import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    // Set page title
    document.title = isLogin ? 'Login - ShopWorld' : 'Create Account - ShopWorld'
    // Scroll to top
    window.scrollTo(0, 0)
  }, [isLogin])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', { email, password, rememberMe })
    // This would normally handle login/registration
  }

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
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

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
              className={`flex-1 py-4 font-medium text-center ${
                isLogin ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-600'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button 
              className={`flex-1 py-4 font-medium text-center ${
                !isLogin ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-600'
              }`}
              onClick={() => setIsLogin(false)}
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
              {/* Name field (only for registration) */}
              {!isLogin && (
                <motion.div className="mb-4" variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
                      <FiUser />
                    </span>
                    <input
                      type="text"
                      id="name"
                      className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </motion.div>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </motion.div>
              
              {/* Password field */}
              <motion.div className="mb-6" variants={itemVariants}>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                  <p className="text-xs text-neutral-500 mt-1">
                    Password must be at least 8 characters long and include a number and a special character.
                  </p>
                )}
              </motion.div>
              
              {/* Remember me checkbox (only for login) */}
              {isLogin && (
                <motion.div className="mb-6 flex items-center" variants={itemVariants}>
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
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
  )
}

export default LoginPage