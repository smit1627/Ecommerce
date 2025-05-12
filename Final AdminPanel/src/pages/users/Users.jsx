import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Filter,
  RefreshCw,
  Plus,
  Download,
  Eye,
  Mail,
  Trash2,
  User
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import SearchInput from '../../components/ui/SearchInput';
import FilterDropdown from '../../components/ui/FilterDropdown';
import Badge from '../../components/ui/Badge';
import Pagination from '../../components/ui/Pagination';
import Modal, { useModal } from '../../components/ui/Modal';
import toast from 'react-hot-toast';

// Mock data for users
const generateUsers = (count) => {
  const roles = ['Customer', 'Admin', 'Staff'];
  const statuses = ['Active', 'Inactive', 'Blocked'];
  const names = [
    'John Doe', 'Sarah Johnson', 'Mike Brown', 'Emily Wilson', 'Robert Chen',
    'Lisa Park', 'David Kim', 'Anna Smith', 'Michael Jones', 'Jennifer Lee',
    'James Taylor', 'Emma Garcia', 'Daniel Martinez', 'Olivia Rodriguez', 'William Anderson'
  ];

  return Array.from({ length: count }, (_, i) => {
    const name = names[Math.floor(Math.random() * names.length)];
    const email = name.toLowerCase().replace(' ', '.') + '@example.com';

    return {
      id: `USR-${1000 + i}`,
      name,
      email,
      role: roles[Math.floor(Math.random() * roles.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      orders: Math.floor(Math.random() * 20),
      spent: `$${(Math.random() * 1000 + 50).toFixed(2)}`,
      profilePicture: null,
    };
  });
};

const mockUsers = generateUsers(40);

const statusColorMap = {
  'Active': 'success',
  'Inactive': 'warning',
  'Blocked': 'danger',
};

const roleColorMap = {
  'Customer': 'secondary',
  'Admin': 'primary',
  'Staff': 'info',
};

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const deleteModal = useModal();

  const usersPerPage = 10;

  // Filter options
  const roleOptions = [
    { value: 'Customer', label: 'Customer' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Staff', label: 'Staff' },
  ];

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Blocked', label: 'Blocked' },
  ];

  // Filter users based on search and other filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === '' ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = selectedRoles.length === 0 ||
      selectedRoles.includes(user.role);

    const matchesStatus = selectedStatuses.length === 0 ||
      selectedStatuses.includes(user.status);

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const refreshUsers = () => {
    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      setUsers(generateUsers(40));
      setIsLoading(false);
    }, 800);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    deleteModal.open();
  };

  const confirmDelete = () => {
    // Simulate API request
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          setUsers(users.filter(u => u.id !== userToDelete.id));
          resolve();
        }, 1000);
      }),
      {
        loading: 'Deleting user...',
        success: 'User deleted successfully',
        error: 'Failed to delete user',
      }
    );
    deleteModal.close();
  };

  // Table columns
  const columns = [
    {
      header: 'User',
      accessor: 'name',
      cell: (row) => (
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0 mr-3">
            <div className="h-full w-full rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                {row.name.charAt(0)}
              </span>
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{row.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{row.email}</div>
          </div>
        </div>
      ),
    },
    // {
    //   header: 'Orders',
    //   accessor: 'orders',
    //   cell: (row) => (
    //     <span className="font-medium text-gray-900 dark:text-white">{row.orders}</span>
    //   ),
    // },
    {
      header: 'Spent',
      accessor: 'spent',
      cell: (row) => (
        <span className="font-medium text-gray-900 dark:text-white">{row.spent}</span>
      ),
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex justify-start space-x-2">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Eye className="h-4 w-4" />}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/users/${row.id}`);
            }}
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Mail className="h-4 w-4" />}
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `mailto:${row.email}`;
            }}
          >
            Email
          </Button>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Trash2 className="h-4 w-4 text-red-500" />}
            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(row);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0"
        >
          Users
        </motion.h1>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="primary"
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Add User
          </Button>
          <Button
            variant="secondary"
            leftIcon={<RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />}
            onClick={refreshUsers}
            disabled={isLoading}
          >
            Refresh
          </Button>
        </div>
      </div>

      <Card>
        <div className="mb-6 flex flex-col sm:flex-row flex-wrap gap-4">
          <SearchInput
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            onClear={() => {
              setSearchQuery('');
              setCurrentPage(1);
            }}
            placeholder="Search users..."
            className="sm:w-80"
          />

          <div className="flex gap-2 flex-wrap">
            <FilterDropdown
              label="Role"
              options={roleOptions}
              selectedValues={selectedRoles}
              onChange={(values) => {
                setSelectedRoles(values);
                setCurrentPage(1);
              }}
              multiple
            />

            <FilterDropdown
              label="Status"
              options={statusOptions}
              selectedValues={selectedStatuses}
              onChange={(values) => {
                setSelectedStatuses(values);
                setCurrentPage(1);
              }}
              multiple
            />

            <Button
              variant="outline"
              leftIcon={<Filter className="h-4 w-4" />}
              onClick={() => {
                setSearchQuery('');
                setSelectedRoles([]);
                setSelectedStatuses([]);
                setCurrentPage(1);
              }}
              disabled={searchQuery === '' && selectedRoles.length === 0 && selectedStatuses.length === 0}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          data={currentUsers}
          isLoading={isLoading}
          emptyMessage="No users found"
          onRowClick={(row) => navigate(`/users/${row.id}`)}
        />

        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        title="Delete User"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={deleteModal.close}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        {userToDelete && (
          <div>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="h-10 w-10 flex-shrink-0 mr-3">
                <div className="h-full w-full rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    {userToDelete.name.charAt(0)}
                  </span>
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{userToDelete.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{userToDelete.email}</div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Users;