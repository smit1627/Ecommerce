import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Mail, 
  ShoppingBag, 
  Edit, 
  Trash2, 
  UserCog,
  ShieldAlert,
  Clock,
  MapPin,
  Phone,
  Calendar
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal, { useModal } from '../../components/ui/Modal';
import toast from 'react-hot-toast';

// Mock user details
const getUserDetails = (id) => {
  return {
    id,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Customer',
    status: 'Active',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001, USA',
    joinDate: '2024-08-15',
    lastLogin: '2025-03-15 09:23 AM',
    orders: [
      { id: 'ORD-5962', date: '2025-03-15', amount: '$245.99', status: 'Delivered' },
      { id: 'ORD-5945', date: '2025-02-28', amount: '$124.50', status: 'Delivered' },
      { id: 'ORD-5932', date: '2025-02-14', amount: '$89.99', status: 'Delivered' },
    ],
    totalSpent: '$460.48',
    profilePicture: null,
  };
};

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

const orderStatusColorMap = {
  'Pending': 'warning',
  'Processing': 'info',
  'Delivered': 'success',
  'Cancelled': 'danger',
};

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const deleteModal = useModal();
  const blockModal = useModal();
  
  useEffect(() => {
    // Simulate API request
    setIsLoading(true);
    setTimeout(() => {
      const userDetails = getUserDetails(id);
      setUser(userDetails);
      setIsLoading(false);
    }, 800);
  }, [id]);
  
  const handleDelete = () => {
    // Simulate API call to delete user
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
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
    navigate('/users');
  };
  
  const handleBlockUser = () => {
    // Simulate API call to block user
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          setUser(prev => ({
            ...prev,
            status: prev.status === 'Blocked' ? 'Active' : 'Blocked'
          }));
          resolve();
        }, 1000);
      }),
      {
        loading: user?.status === 'Blocked' ? 'Activating user...' : 'Blocking user...',
        success: user?.status === 'Blocked' ? 'User activated successfully' : 'User blocked successfully',
        error: 'Failed to update user status',
      }
    );
    
    blockModal.close();
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <Card>
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">User not found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">The user you're looking for doesn't exist or has been removed.</p>
          <Button 
            variant="primary" 
            onClick={() => navigate('/users')}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Back to Users
          </Button>
        </div>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <button
            className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-2"
            onClick={() => navigate('/users')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Users
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
          <div className="flex items-center mt-1 space-x-2">
            <Badge variant={roleColorMap[user.role]}>
              {user.role}
            </Badge>
            <Badge variant={statusColorMap[user.status]}>
              {user.status}
            </Badge>
          </div>
        </div>
        
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <Button
            variant="outline"
            leftIcon={<Mail className="h-4 w-4" />}
            onClick={() => window.location.href = `mailto:${user.email}`}
          >
            Email User
          </Button>
          <Button
            variant="outline"
            leftIcon={<Edit className="h-4 w-4" />}
          >
            Edit
          </Button>
          <Button
            variant={user.status === 'Blocked' ? 'success' : 'danger'}
            leftIcon={<ShieldAlert className="h-4 w-4" />}
            onClick={blockModal.open}
          >
            {user.status === 'Blocked' ? 'Activate User' : 'Block User'}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/3 mb-6 sm:mb-0 flex flex-col items-center">
                <div className="h-32 w-32 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center mb-4">
                  <span className="text-4xl font-medium text-purple-700 dark:text-purple-300">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{user.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
              </div>
              
              <div className="sm:w-2/3 sm:pl-6 sm:border-l border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="text-gray-900 dark:text-white">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="text-gray-900 dark:text-white">{user.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                      <p className="text-gray-900 dark:text-white">{user.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card title="Recent Orders">
            {user.orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {user.orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {order.id}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {order.date}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {order.amount}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Badge variant={orderStatusColorMap[order.status]}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => navigate(`/orders/${order.id}`)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                This user has not placed any orders yet.
              </div>
            )}
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button 
                variant="outline" 
                size="sm" 
                leftIcon={<ShoppingBag className="h-4 w-4" />}
                onClick={() => navigate('/orders')}
              >
                View All Orders
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card title="Account Summary">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400">Member Since</span>
                <span className="text-gray-900 dark:text-white flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-gray-400" /> {user.joinDate}
                </span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400">Last Login</span>
                <span className="text-gray-900 dark:text-white flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-gray-400" /> {user.lastLogin}
                </span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400">Total Orders</span>
                <span className="text-gray-900 dark:text-white">{user.orders.length}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400">Total Spent</span>
                <span className="font-medium text-gray-900 dark:text-white">{user.totalSpent}</span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-gray-500 dark:text-gray-400">Account Status</span>
                <Badge variant={statusColorMap[user.status]}>
                  {user.status}
                </Badge>
              </div>
            </div>
          </Card>
          
          <Card title="Notes">
            <p className="text-gray-500 dark:text-gray-400 italic">
              No notes have been added for this user.
            </p>
            <textarea
              className="mt-4 w-full rounded-lg border border-gray-300 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2"
              rows="4"
              placeholder="Add a note about this user..."
            ></textarea>
            <div className="mt-2 flex justify-end">
              <Button variant="primary" size="sm">Save Note</Button>
            </div>
          </Card>
          
          <Card title="Account Actions">
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<UserCog className="h-4 w-4" />}
                fullWidth
              >
                Reset Password
              </Button>
              
              <Button
                variant={user.status === 'Blocked' ? 'success' : 'danger'}
                size="sm"
                leftIcon={<ShieldAlert className="h-4 w-4" />}
                fullWidth
                onClick={blockModal.open}
              >
                {user.status === 'Blocked' ? 'Activate Account' : 'Block Account'}
              </Button>
              
              <Button
                variant="danger"
                size="sm"
                leftIcon={<Trash2 className="h-4 w-4" />}
                fullWidth
                onClick={deleteModal.open}
              >
                Delete User
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
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
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Are you sure you want to delete this user? This action cannot be undone.
        </p>
        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center mr-3">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              {user.name.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
          </div>
        </div>
      </Modal>
      
      {/* Block Confirmation Modal */}
      <Modal
        isOpen={blockModal.isOpen}
        onClose={blockModal.close}
        title={user.status === 'Blocked' ? 'Activate User' : 'Block User'}
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={blockModal.close}>
              Cancel
            </Button>
            <Button variant={user.status === 'Blocked' ? 'success' : 'danger'} onClick={handleBlockUser}>
              {user.status === 'Blocked' ? 'Activate' : 'Block'}
            </Button>
          </>
        }
      >
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          {user.status === 'Blocked' 
            ? 'Are you sure you want to activate this user? They will be able to access their account again.'
            : 'Are you sure you want to block this user? They will not be able to access their account until unblocked.'}
        </p>
        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center mr-3">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              {user.name.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserDetail;