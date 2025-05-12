import React from 'react';
import { Search, X } from 'lucide-react';

const SearchInput = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  className = '',
  ...props
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="
          w-full pl-10 pr-10 py-2 rounded-lg
          border border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-700
          text-gray-900 dark:text-white
          placeholder-gray-500 dark:placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
          dark:focus:ring-purple-600 dark:focus:border-purple-600
          transition-colors duration-200
        "
        placeholder={placeholder}
        {...props}
      />
      {value && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={onClear}
        >
          <X className="h-4 w-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;