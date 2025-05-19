import React from 'react';
import products from '../../../data/products';
import ProductCard from '../../../components/ui/ProductCard';

const FeaturedProducts = () => {
  // Get 4 products with highest rating as featured
  const featuredProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default FeaturedProducts;