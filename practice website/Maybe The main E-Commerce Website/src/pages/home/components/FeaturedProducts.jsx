import React from 'react';
import { useData } from '../../../context/DataContext';  // <-- useData hook

import ProductCard from '../../../components/ui/ProductCard';

const FeaturedProducts = () => {
  const { products } = useData();  // get products from context

  // Get 4 products with highest rating as featured
  const featuredProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredProducts.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default FeaturedProducts;
