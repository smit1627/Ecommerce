import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  title,
  subtitle,
  footer,
  noPadding = false,
  isHoverable = false,
  ...props
}) => {
  return (
    <motion.div
      className={`
        bg-white dark:bg-gray-800 rounded-lg shadow-sm
        border border-gray-200 dark:border-gray-700
        overflow-hidden transition-all duration-300
        ${isHoverable ? 'hover:shadow-md' : ''}
        ${className}
      `}
      whileHover={isHoverable ? { y: -2 } : {}}
      {...props}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
      )}

      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>

      {footer && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}
    </motion.div>
  );
};

export default Card;