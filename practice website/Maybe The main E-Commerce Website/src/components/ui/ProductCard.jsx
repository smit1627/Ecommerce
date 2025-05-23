import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import Button from './Button';

const ProductCard = ({ product }) => {
  const { _id, title, price, image, rating, discount } = product;
  const { addToCart } = useContext(CartContext);
  const imageUrl = import.meta.env.VITE_IMAGE_URL;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  // Calculate discounted price
  const discountedPrice = discount ? price - (price * discount) / 100 : price;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer select-none">
      <Link to={`/product/${_id}`} className="block group">
        <div className="relative h-52 overflow-hidden rounded-t-2xl">
          <img
            src={`${imageUrl}/${image}`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold py-1 px-3 rounded-full shadow-lg select-none">
              {discount}% OFF
            </div>
          )}
          {/* Wishlist button can be re-enabled here */}
        </div>

        <div className="p-5 flex flex-col justify-between h-44">
          <h3 className="text-gray-900 font-semibold text-lg mb-2 truncate" title={title}>
            {title}
          </h3>

          <div className="flex items-center mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-600 font-medium">{rating}</span>
          </div>

          <div className="flex justify-between items-center">
            {discount > 0 ? (
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-extrabold text-gray-900">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">${price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-xl font-extrabold text-gray-900">${price.toFixed(2)}</span>
            )}

            <Button
              onClick={handleAddToCart}
              variant="primary"
              size="sm"
              className="flex items-center gap-2 px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 font-semibold"
              aria-label={`Add ${title} to cart`}
            >
              <ShoppingCart size={18} className="text-white" />
              Add
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
