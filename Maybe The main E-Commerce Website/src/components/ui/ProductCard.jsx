import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import Button from './Button';

const ProductCard = ({ product }) => {
  const { id, title, price, image, rating, discount } = product;
  const { addToCart } = useContext(CartContext);
  const imageUrl = import.meta.env.VITE_IMAGE_URL

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  // Calculate discounted price
  const discountedPrice = discount ? price - (price * discount / 100) : price;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/product/${id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={`${imageUrl}/${image}`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
              {discount}% OFF
            </div>
          )}
          <button
            className="absolute top-2 left-2 p-1.5 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Would handle wishlist in a real app
            }}
          >
            <Heart size={18} className="text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-gray-900 font-medium text-lg mb-1 line-clamp-1">{title}</h3>

          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {Array(5).fill(0).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-500 ml-1">({rating})</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              {discount > 0 ? (
                <div className="flex items-center">
                  <span className="text-lg font-bold text-gray-900">${discountedPrice.toFixed(2)}</span>
                  <span className="text-sm text-gray-500 line-through ml-2">${price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
              )}
            </div>

            <Button
              onClick={handleAddToCart}
              variant="primary"
              size="sm"
              className="flex items-center"
            >
              <ShoppingCart size={16} className="mr-1" />
              Add
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;