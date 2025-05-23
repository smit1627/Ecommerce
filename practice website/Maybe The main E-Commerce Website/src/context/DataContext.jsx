import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";
import PropTypes from "prop-types";

// Static categories memoized
const staticCategories = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subcategories: ["audio", "televisions", "cameras", "wearables", "computers", "phones"]
  },
  {
    id: "clothing",
    name: "Clothing",
    image: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subcategories: ["shirts", "pants", "outerwear", "dresses", "activewear"]
  },
  {
    id: "books",
    name: "Books",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subcategories: ["bags", "watches", "jewelry", "sunglasses", "scarves"]
  },
  {
    id: "furniture",
    name: "Furniture",
    image: "https://images.pexels.com/photos/1358900/pexels-photo-1358900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subcategories: ["furniture", "kitchen", "bedding", "decor", "appliances"]
  },
  {
    id: "beauty",
    name: "Beauty",
    image: "https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subcategories: ["yoga", "running", "gym equipment", "accessories", "outdoor"]
  },
  {
    id: "sports",
    name: "Sports",
    image: "https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subcategories: ["yoga", "running", "gym equipment", "accessories", "outdoor"]
  },
  {
    id: "toys",
    name: "Toys",
    image: "https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    subcategories: ["yoga", "running", "gym equipment", "accessories", "outdoor"]
  }
];

const DataContext = createContext();

export function DataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  // Fetch products from backend
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${apiUrl}/getAllProducts`);
      if (res.status !== 200) {
        throw new Error("Failed to fetch products from server.");
      }

      const data = res.data;
      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid or empty product data received.");
      }

      setProducts(data);
    } catch (err) {
      console.error("Fetch Products Error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Memoized helpers
  const getProductsByCategory = useCallback((categoryId) => {
    return products.filter((product) => product.category === categoryId);
  }, [products]);

  const getProductById = useCallback((productId) => {
    const product = products.find((p) => String(p._id) === String(productId));
    if (!product) {
      console.warn(`Product with ID ${productId} not found.`);
    }
    return product;
  }, [products]);

  const getRelatedProducts = useCallback((productId, limit = 4) => {
    const product = getProductById(productId);
    if (!product) return [];

    return products
      .filter(p => p._id !== productId && p.category === product.category)
      .sort(() => 0.5 - Math.random())
      .slice(0, limit);
  }, [products, getProductById]);

  const searchProducts = useCallback((query) => {
    const term = query.toLowerCase();
    return products.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  }, [products]);

  const categories = useMemo(() => staticCategories, []);

  const contextValue = useMemo(() => ({
    categories,
    products,
    loading,
    error,
    getProductsByCategory,
    getProductById,
    getRelatedProducts,
    searchProducts,
    fetchProducts
  }), [
    categories,
    products,
    loading,
    error,
    getProductsByCategory,
    getProductById,
    getRelatedProducts,
    searchProducts,
    fetchProducts
  ]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Custom hook
export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
