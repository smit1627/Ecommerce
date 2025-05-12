import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../ui/Card';

const colors = {
  purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300',
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300',
  green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300',
  yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300',
  red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300',
};

const StatsCard = ({ title, value, change, icon, color = 'purple' }) => {
  const isPositive = change >= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full" isHoverable>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <h3 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">{value}</h3>
            
            <div className="mt-2 flex items-center">
              <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${isPositive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
                {isPositive ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {isPositive ? '+' : ''}{change}%
              </span>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                vs. previous period
              </span>
            </div>
          </div>
          
          <div className={`p-3 rounded-full ${colors[color]}`}>
            {icon}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatsCard;