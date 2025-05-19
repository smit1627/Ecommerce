import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';

const UserDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dropdownRef = useRef(null);
    const modalRef = useRef(null);
    const navigate = useNavigate();

    // Check for currentUser in sessionStorage on mount
    const checkUser = () => {
        const user = sessionStorage.getItem('currentUser');
        console.log(user, "user in userDropDown");
        setCurrentUser(user ? JSON.parse(user).token : null);
    }
    useEffect(() => {
        checkUser()
    }, []);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle logout confirmation
    const handleLogout = () => {
        sessionStorage.removeItem('currentUser');
        setCurrentUser(null);
        setIsOpen(false);
        setIsModalOpen(false);
        navigate('/products');
        toast.success('Logged Out Successfully')
    };

    // Open modal when logout is clicked
    const openLogoutModal = () => {
        setIsOpen(false); // Close dropdown
        setIsModalOpen(true); // Open modal
    };

    // If no currentUser, render login link
    if (!currentUser) {
        return (
            <Link
                to="/login"
                className="hidden sm:block p-2 text-neutral-700 hover:text-primary-600 transition-colors"
            >
                <FiUser size={20} />
            </Link>
        );
    }

    // If currentUser exists, render dropdown and modal
    return (
        <>
            <div className="relative hidden sm:block" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-neutral-700 hover:text-primary-600 transition-colors"
                    aria-label="User menu"
                >
                    <FiUser size={20} />
                </button>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100"
                            onClick={() => setIsOpen(false)}
                        >
                            Profile
                        </Link>
                        <button
                            onClick={openLogoutModal}
                            className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 m-0 overflow-hidden">
                    <div
                        ref={modalRef}
                        className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl"
                    >
                        <h2 className="text-lg font-semibold text-neutral-800 mb-4">
                            Confirm Logout
                        </h2>
                        <p className="text-sm text-neutral-600 mb-6">
                            Are you sure you want to log out?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-sm text-neutral-600 hover:text-neutral-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserDropdown;