import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gray-900 text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Hero background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/30"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 pt-32 pb-24 md:pt-40 md:pb-32 relative z-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Shop the Best <span className="text-amber-500">Premium Products</span>
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Discover unique products with exceptional quality and unbeatable prices. Your one-stop destination for all your shopping needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/products" 
              className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 text-center sm:text-left"
            >
              Shop Now
            </Link>
            <Link 
              to="/products/electronics" 
              className="bg-transparent border border-white hover:bg-white/10 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center sm:justify-start"
            >
              Explore Tech
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path fill="#F9FAFB" fillOpacity="1" d="M0,96L80,80C160,64,320,32,480,32C640,32,800,64,960,69.3C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;