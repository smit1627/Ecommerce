import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16 flex items-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-9xl font-bold text-blue-900">404</h1>
        <h2 className="text-3xl font-semibold mt-6 mb-4">Page Not Found</h2>
        <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button variant="primary" className="flex items-center">
              <Home size={18} className="mr-2" />
              Go to Homepage
            </Button>
          </Link>
          
          <Link to="/products">
            <Button variant="outline" className="flex items-center">
              <Search size={18} className="mr-2" />
              Browse Products
            </Button>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-blue-700 hover:text-blue-900 font-medium"
          >
            <ArrowLeft size={18} className="mr-1" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;