import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

// Mock data for top selling products
const topProducts = [
  {
    id: 'PRD-1001',
    name: 'Wireless Earbuds',
    sold: 235,
    amount: '$14,100',
    image: 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 'PRD-1056',
    name: 'Smartphone Case',
    sold: 182,
    amount: '$2,730',
    image: 'https://images.pexels.com/photos/4071887/pexels-photo-4071887.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 'PRD-1022',
    name: 'Smart Watch',
    sold: 124,
    amount: '$18,600',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 'PRD-1089',
    name: 'Bluetooth Speaker',
    sold: 98,
    amount: '$8,820',
    image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
];

const TopSellingProducts = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-5">
      {topProducts.map((product, index) => (
        <motion.div 
          key={product.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-center"
        >
          <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 mr-4 flex-shrink-0">
            <img 
              src={product.image} 
              alt={product.name} 
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {product.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {product.sold} units sold
            </p>
          </div>
          
          <div className="flex flex-col items-end">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {product.amount}
            </p>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-xs p-1"
              leftIcon={<Eye className="h-3 w-3" />}
              onClick={() => navigate(`/products/${product.id}`)}
            >
              View
            </Button>
          </div>
        </motion.div>
      ))}
      
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => navigate('/products')}
        >
          View All Products
        </Button>
      </div>
    </div>
  );
};

export default TopSellingProducts;