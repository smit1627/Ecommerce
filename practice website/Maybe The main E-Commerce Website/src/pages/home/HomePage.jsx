import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useData } from '../../context/DataContext';  // useData hook instead of direct import
import ProductCard from '../../components/ui/ProductCard';
import FeaturedProducts from './components/FeaturedProducts';
import HeroSection from './components/HeroSection';
import CategoriesSection from './components/CategoriesSection';
import NewsletterSection from './components/NewsletterSection';

const HomePage = () => {
  const { categories } = useData();  // get categories from context

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <CategoriesSection categories={categories} />

      {/* Featured Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link
              to="/products"
              className="flex items-center text-blue-700 hover:text-blue-900 transition-colors font-medium"
            >
              View All
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <FeaturedProducts />
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Special Offers</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 p-8">
                  <span className="inline-block bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">Limited Time</span>
                  <h3 className="text-2xl font-bold mb-3">Summer Sale</h3>
                  <p className="text-gray-700 mb-4">Get up to 40% off on selected items. Hurry while stocks last!</p>
                  <Link
                    to="/products?discount=true"
                    className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-300"
                  >
                    Shop Now
                  </Link>
                </div>
                <div className="w-full md:w-1/2">
                  <img
                    src="https://images.pexels.com/photos/5872361/pexels-photo-5872361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Summer Sale"
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 p-8">
                  <span className="inline-block bg-blue-900 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">New Arrivals</span>
                  <h3 className="text-2xl font-bold mb-3">Tech Gadgets</h3>
                  <p className="text-gray-700 mb-4">Discover the latest tech gadgets that will transform your lifestyle.</p>
                  <Link
                    to="/products/electronics"
                    className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-300"
                  >
                    Explore
                  </Link>
                </div>
                <div className="w-full md:w-1/2">
                  <img
                    src="https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Tech Gadgets"
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};

export default HomePage;