import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

// Mock data for recent orders
const recentOrders = [
  {
    id: 'ORD-5962',
    customer: 'John Doe',
    date: '2025-03-15',
    amount: '$245.99',
    status: 'Delivered',
  },
  {
    id: 'ORD-5961',
    customer: 'Sarah Johnson',
    date: '2025-03-14',
    amount: '$124.50',
    status: 'Pending',
  },
  {
    id: 'ORD-5960',
    customer: 'Mike Brown',
    date: '2025-03-14',
    amount: '$89.99',
    status: 'Processing',
  },
  {
    id: 'ORD-5959',
    customer: 'Emily Wilson',
    date: '2025-03-13',
    amount: '$532.80',
    status: 'Delivered',
  },
  {
    id: 'ORD-5958',
    customer: 'Robert Chen',
    date: '2025-03-12',
    amount: '$76.25',
    status: 'Cancelled',
  },
];

const statusColors = {
  Pending: 'warning',
  Processing: 'info',
  Delivered: 'success',
  Cancelled: 'danger',
  Refunded: 'secondary',
};

const RecentOrdersList = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Order ID
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Customer
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {recentOrders.map((order, index) => (
            <motion.tr
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150"
            >
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {order.id}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {order.customer}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {order.date}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {order.amount}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Eye className="h-4 w-4" />}
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  View
                </Button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrdersList;