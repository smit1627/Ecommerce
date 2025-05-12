// src/components/ui/Textarea.jsx or .tsx
const Textarea = ({ className = '', ...props }) => {
    return (
        <textarea
            className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white ${className}`}
            {...props}
        />
    );
};

export default Textarea;
