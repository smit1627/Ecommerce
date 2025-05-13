import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Moon,
  Sun,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Orders', path: '/orders', icon: <ShoppingCart className="h-5 w-5" /> },
    { name: 'Products', path: '/products', icon: <Package className="h-5 w-5" /> },
    { name: 'Users', path: '/users', icon: <Users className="h-5 w-5" /> },
    { name: 'Account', path: '/account', icon: <User className="h-5 w-5" /> },
  ];

  const mockNotifications = [
    { id: 1, content: 'New order received', time: '5 minutes ago' },
    { id: 2, content: 'Product X is out of stock', time: '1 hour ago' },
    { id: 3, content: 'New user registered', time: '3 hours ago' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={closeSidebar}></div>
            <motion.aside
              className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transition-all ease-in-out duration-300 z-50"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">ShopWorld</h1>
                <button
                  onClick={closeSidebar}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <nav className="mt-4 px-2">
                {navItems.map((item) => (
                  <div
                    key={item.path}
                    className={`mb-2 ${location.pathname === item.path ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    <button
                      className="flex items-center w-full px-4 py-3 rounded-lg transition-colors"
                      onClick={() => {
                        navigate(item.path);
                        closeSidebar();
                      }}
                    >
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </button>
                  </div>
                ))}

                <button
                  className="flex items-center w-full px-4 py-3 mt-4 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="ml-3">Logout</span>
                </button>
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar for desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">ShopWorld</h1>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          {navItems.map((item) => (
            <div
              key={item.path}
              className={`mb-2 ${location.pathname === item.path ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <button
                className="flex items-center w-full px-4 py-3 rounded-lg transition-colors"
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </button>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            className="flex items-center w-full px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="px-5 py-3 flex items-center justify-end">
            <button
              className="p-1 rounded-md lg:hidden text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400"
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={toggleTheme}
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  className="flex items-center gap-2"
                  onClick={() => {
                    setProfileOpen(!profileOpen);
                    setNotificationsOpen(false);
                  }}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-purple-200 dark:border-purple-800">
                    {currentUser?.profilePicture ? (
                      <img
                        src={currentUser.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
                        <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                          {currentUser?.name?.charAt(0) || 'A'}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {currentUser?.name || 'Admin User'}
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20 border border-gray-200 dark:border-gray-700">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => {
                        setProfileOpen(false);
                        navigate('/account');
                      }}
                    >
                      Your Profile
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => {
                        setProfileOpen(false);
                        navigate('/settings');
                      }}
                    >
                      Settings
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      onClick={() => {
                        setProfileOpen(false);
                        handleLogout();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;