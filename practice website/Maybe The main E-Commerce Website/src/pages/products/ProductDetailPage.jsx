import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useData } from "../../context/DataContext";
import { Heart, Package, RefreshCw, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import Button from "../../components/ui/Button";
import ProductCard from "../../components/ui/ProductCard";
import React from "react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const imageUrl = import.meta.env.VITE_IMAGE_URL || 'http://localhost:3000/image';
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const { products, getProductById, getRelatedProducts } = useData()

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    console.log('Product ID:', products, "i am getting products");
    if (!products.length) return; // wait for products to load

    setLoading(true);
    window.scrollTo(0, 0);

    const fetchedProduct = getProductById(id);

    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setRelatedProducts(getRelatedProducts(id, 4));
      setLoading(false);
    } else {
      navigate('/404');
    }
  }, [id, products, navigate, getProductById, getRelatedProducts]);


  const handleAddToCart = () => {
    const qty = parseInt(quantity) || 1;
    addToCart(product, qty);
  };

  const incrementQuantity = () => {
    setQuantity(qty => Math.min(Number(qty) + 1, Math.min(10)));
  };

  const decrementQuantity = () => {
    setQuantity(qty => Math.max(Number(qty) - 1, 1));
  };


  if (loading || !product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  return (
    <div className="min-h-screen bg-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-sm mb-6 text-gray-500">
          <ol className="flex items-center space-x-2">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/products" className="hover:text-blue-600">Products</Link></li>
            <li>/</li>
            <li><Link to={`/products/${product.category}`} className="capitalize hover:text-blue-600">{product.category}</Link></li>
            <li>/</li>
            <li className="text-gray-800 truncate">{product.title}</li>
          </ol>
        </nav>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start bg-gray-50 p-6 rounded-2xl shadow-md">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200 p-4">
            <img
              src={`${imageUrl}/${product.image}`}
              alt={product.title}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900">{product.title}</h1>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center">
                {Array(5).fill(0).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span>{product.rating} | {product.reviews?.length || 0} Reviews</span>
            </div>

            {/* Pricing */}
            <div>
              {product.discount > 0 ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-gray-900">${discountedPrice.toFixed(2)}</span>
                  <span className="line-through text-gray-400 text-base">${product.price.toFixed(2)}</span>
                  <span className="bg-green-100 text-green-700 text-sm px-2 py-0.5 rounded">{product.discount}% off</span>
                </div>
              ) : (
                <span className="text-2xl font-semibold text-gray-900">${product.price.toFixed(2)}</span>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="font-medium text-gray-700 mb-1">Description</h2>
              <p className="text-gray-600 text-sm">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <div className="inline-flex items-center border rounded-md overflow-hidden">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val)) setQuantity(Math.min(Math.max(val, 1), 999));
                  }}
                  className="w-12 text-center border-x py-1 focus:outline-none"
                />
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= 10}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                variant="accent"
                size="md"
                className="flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </Button>
            </div>

            {/* Info Icons */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center"><Truck size={16} className="mr-2 text-blue-600" /> Free shipping over $50</div>
              <div className="flex items-center"><ShieldCheck size={16} className="mr-2 text-blue-600" /> 2-year warranty</div>
              <div className="flex items-center"><RefreshCw size={16} className="mr-2 text-blue-600" /> 30-day returns</div>
              <div className="flex items-center"><Package size={16} className="mr-2 text-blue-600" /> Secure packaging</div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-4">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

};

export default ProductDetailPage;