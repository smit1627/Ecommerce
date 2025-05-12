import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const AuthLayout = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();

  return (

    <main className="">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=""
      >
        {children}
      </motion.div>
    </main>


  );
};

export default AuthLayout;