import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  RefreshCw,
  Package,
  Star,
  StarHalf
} from 'lucide-react';
import { getProductById, getRelatedProducts } from '../../data/products';
import { CartContext } from '../../context/CartContext';
import Button from '../../components/ui/Button';
import ProductCard from '../../components/ui/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);

    const fetchedProduct = getProductById(id);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setRelatedProducts(getRelatedProducts(id, 4));
    } else {
      navigate('/404');
    }

    setLoading(false);
  }, [id, navigate]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Calculate discounted price
  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="py-3 text-sm">
          <ol className="flex items-center space-x-1">
            <li>
              <Link to="/" className="text-gray-500 hover:text-blue-600">Home</Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link to="/products" className="text-gray-500 hover:text-blue-600">Products</Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link to={`/products/${product.category}`} className="text-gray-500 hover:text-blue-600 capitalize">{product.category}</Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-800 font-medium truncate">{product.title}</li>
          </ol>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Left: Product Image */}
            <div className="md:col-span-5 lg:col-span-4 p-6 border-r border-gray-100">
              <div className="flex justify-center items-center h-full">
                <div className="w-full max-w-md">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="object-contain w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="md:col-span-7 lg:col-span-8 p-6">
              <div className="flex flex-col h-full">
                {/* Title and Rating */}
                <div className="mb-3">
                  <h1 className="text-xl sm:text-2xl font-medium text-gray-900">{product.title}</h1>

                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {Array(5).fill(0).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">{product.rating} | {product.reviews?.length || 0} Reviews</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-3"></div>

                {/* Price Section */}
                <div className="mb-4">
                  {product.discount > 0 ? (
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-medium text-gray-900">${discountedPrice.toFixed(2)}</span>
                      <span className="text-base text-gray-500 line-through">${product.price.toFixed(2)}</span>
                      <span className="text-sm font-medium bg-green-50 text-green-600 px-2 py-0.5 rounded">
                        {product.discount}% off
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-medium text-gray-900">${product.price.toFixed(2)}</span>
                  )}
                </div>

                {/* Stock Info */}
                <div className="mb-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${product.stock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-700 text-sm">{product.description}</p>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-700 mb-2">Quantity</label>
                  <div className="inline-flex border border-gray-300 rounded-md">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                      className="w-12 text-center border-x border-gray-300 focus:outline-none py-1"
                    />
                    <button
                      onClick={incrementQuantity}
                      disabled={quantity >= 10 || quantity >= product.stock}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <Button
                    onClick={handleAddToCart}
                    variant="primary"
                    className="flex-1 flex justify-center items-center py-2 bg-yellow-400 hover:bg-yellow-500 text-black"
                    disabled={product.stock <= 0}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 flex justify-center items-center py-2 text-blue-600 border-blue-600"
                  >
                    <Heart size={18} className="mr-2" />
                    Add to Wishlist
                  </Button>
                </div>

                {/* Delivery Info */}
                <div className="mt-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Truck size={16} className="mr-2 text-blue-600" />
                      Free shipping over $50
                    </div>
                    <div className="flex items-center">
                      <ShieldCheck size={16} className="mr-2 text-blue-600" />
                      2-year warranty
                    </div>
                    <div className="flex items-center">
                      <RefreshCw size={16} className="mr-2 text-blue-600" />
                      30-day return policy
                    </div>
                    <div className="flex items-center">
                      <Package size={16} className="mr-2 text-blue-600" />
                      Secure packaging
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium">Customer Reviews</h2>
            <Button variant="outline" className="text-sm">Write a Review</Button>
          </div>

          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map((review, i) => (
                <div key={i} className={i < product.reviews.length - 1 ? "border-b pb-6" : ""}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{review.name}</p>
                      <p className="text-xs text-gray-500">Verified Purchase</p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {Array(5).fill(0).map((_, index) => (
                          <Star key={index} className={`w-4 h-4 ${index < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">Posted on {new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
                  <div className="flex gap-2 mt-3">
                    <button className="text-xs text-gray-500 hover:text-gray-700">Helpful (0)</button>
                    <button className="text-xs text-gray-500 hover:text-gray-700">Report</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No reviews yet for this product.</p>
              <Button variant="outline" className="text-sm">Be the first to write a review</Button>
            </div>
          )}
        </div>

        {/* Related Products */}
        <div className="mt-10">
          <h2 className="text-xl font-medium mb-4">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;