import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterDropdown = ({
  label,
  options,
  selectedValues = [],
  onChange,
  className = '',
  multiple = false,
  maxHeight = '15rem',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOpen = () => setIsOpen(!isOpen);
  
  const handleSelect = (value) => {
    if (multiple) {
      if (selectedValues.includes(value)) {
        onChange(selectedValues.filter(item => item !== value));
      } else {
        onChange([...selectedValues, value]);
      }
    } else {
      onChange(value === selectedValues[0] ? [] : [value]);
      setIsOpen(false);
    }
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    onChange([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        className="
          flex items-center justify-between w-full px-4 py-2
          text-sm text-gray-700 dark:text-gray-300
          bg-white dark:bg-gray-700
          border border-gray-300 dark:border-gray-600
          rounded-lg
          hover:bg-gray-50 dark:hover:bg-gray-650
          focus:outline-none focus:ring-2 focus:ring-purple-500
          transition-colors duration-200
        "
        onClick={toggleOpen}
      >
        <div className="flex items-center">
          <span className="mr-2">{label}</span>
          {selectedValues.length > 0 && (
            <div className="flex gap-1">
              {selectedValues.length === 1 ? (
                <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full">
                  {options.find(opt => opt.value === selectedValues[0])?.label || selectedValues[0]}
                </span>
              ) : (
                <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full">
                  {selectedValues.length} selected
                </span>
              )}
              <button
                onClick={clearSelection}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="
              absolute z-10 w-full mt-1
              bg-white dark:bg-gray-700
              border border-gray-200 dark:border-gray-600
              rounded-lg shadow-lg
              overflow-hidden
            "
          >
            <div
              className="py-1 overflow-y-auto"
              style={{ maxHeight: maxHeight }}
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  className={`
                    flex items-center w-full px-4 py-2 text-sm text-left
                    ${
                      selectedValues.includes(option.value)
                        ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-650'
                    }
                    transition-colors duration-150
                  `}
                  onClick={() => handleSelect(option.value)}
                >
                  <span className="flex-1">{option.label}</span>
                  {selectedValues.includes(option.value) && (
                    <svg className="h-4 w-4 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDropdown;