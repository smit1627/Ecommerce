import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingCart
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import RecentOrdersList from '../../components/dashboard/RecentOrdersList';
import StatsCard from '../../components/dashboard/StatsCard';
import SalesChart from '../../components/dashboard/SalesChart';
import TopSellingProducts from '../../components/dashboard/TopSellingProducts';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('weekly');

  // Mock stats
  const stats = {
    weekly: {
      sales: { value: '$12,426', change: 12.5 },
      orders: { value: '356', change: 8.2 },
      customers: { value: '132', change: -2.8 },
      products: { value: '86', change: 4.6 },
    },
    monthly: {
      sales: { value: '$48,605', change: 15.3 },
      orders: { value: '1,245', change: 10.8 },
      customers: { value: '486', change: 5.7 },
      products: { value: '97', change: 2.4 },
    },
    yearly: {
      sales: { value: '$586,325', change: 23.1 },
      orders: { value: '15,248', change: 18.5 },
      customers: { value: '2,856', change: 32.1 },
      products: { value: '124', change: 8.9 },
    }
  };

  const currentStats = stats[dateRange];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0"
        >
          Dashboard
        </motion.h1>

        <div className="flex space-x-2">
          <Button
            variant={dateRange === 'weekly' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setDateRange('weekly')}
          >
            Weekly
          </Button>
          <Button
            variant={dateRange === 'monthly' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setDateRange('monthly')}
          >
            Monthly
          </Button>
          <Button
            variant={dateRange === 'yearly' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setDateRange('yearly')}
          >
            Yearly
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Sales"
          value={currentStats.sales.value}
          change={currentStats.sales.change}
          icon={<DollarSign className="h-5 w-5" />}
          color="purple"
        />

        <StatsCard
          title="Total Orders"
          value={currentStats.orders.value}
          change={currentStats.orders.change}
          icon={<ShoppingBag className="h-5 w-5" />}
          color="blue"
        />

        <StatsCard
          title="Total Customers"
          value={currentStats.customers.value}
          change={currentStats.customers.change}
          icon={<Users className="h-5 w-5" />}
          color="green"
        />

        <StatsCard
          title="Total Products"
          value={currentStats.products.value}
          change={currentStats.products.change}
          icon={<Package className="h-5 w-5" />}
          color="yellow"
        />
      </div>

      {/* Charts & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-1">
          <Card
            title="Recent Orders"
            subtitle="Latest 5 orders"
            footer={
              <Button
                variant="ghost"
                size="sm"
                rightIcon={<ShoppingCart className="h-4 w-4" />}
                onClick={() => window.location.href = '/orders'}
              >
                View All Orders
              </Button>
            }
          >
            <RecentOrdersList />
          </Card>
        </div>

        <div>
          <Card title="Top Selling Products">
            <TopSellingProducts />
          </Card>
        </div>

      </div>


    </div>
  );
};

export default Dashboard;