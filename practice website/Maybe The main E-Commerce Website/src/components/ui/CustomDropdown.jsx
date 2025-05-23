import React, { useState, useRef, useEffect } from 'react';

const options = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
];

const CustomDropdown = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedLabel = options.find(o => o.value === value)?.label || 'Select';

    return (
        <div className="relative inline-block w-56 text-left" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="inline-flex justify-between w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
                {selectedLabel}
                <svg
                    className={`ml-2 h-5 w-5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 max-h-60 overflow-auto">
                    <ul className="py-1 text-sm text-gray-700">
                        {options.map(({ value: val, label }) => (
                            <li
                                key={val}
                                onClick={() => {
                                    onChange(val);
                                    setOpen(false);
                                }}
                                className={`cursor-pointer px-4 py-2 hover:bg-blue-500 hover:text-white ${val === value ? 'bg-blue-100 font-semibold' : ''
                                    }`}
                            >
                                {label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
