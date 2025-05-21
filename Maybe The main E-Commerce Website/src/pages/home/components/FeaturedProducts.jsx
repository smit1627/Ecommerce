import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../../components/ui/ProductCard';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${apiUrl}/getAllProducts`);
        const topRated = res.data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4);

        setFeaturedProducts(topRated);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredProducts.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default FeaturedProducts;
