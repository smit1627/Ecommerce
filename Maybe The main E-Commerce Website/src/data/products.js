// Sample product data for the e-commerce website
const products = [

];

export default products;

// Categories data
export const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    subcategories: ['audio', 'televisions', 'cameras', 'wearables', 'computers', 'phones']
  },
  {
    id: 'clothing',
    name: 'Clothing',
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    subcategories: ['shirts', 'pants', 'outerwear', 'dresses', 'activewear']
  },
  {
    id: 'fashion',
    name: 'Fashion Accessories',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    subcategories: ['bags', 'watches', 'jewelry', 'sunglasses', 'scarves']
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    image: 'https://images.pexels.com/photos/1358900/pexels-photo-1358900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    subcategories: ['furniture', 'kitchen', 'bedding', 'decor', 'appliances']
  },
  {
    id: 'sports-fitness',
    name: 'Sports & Fitness',
    image: 'https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    subcategories: ['yoga', 'running', 'gym equipment', 'accessories', 'outdoor']
  }
];

// Helper functions to filter products
export const getProductsByCategory = (categoryId) => {
  return products.filter(product => product.category === categoryId);
};

export const getProductById = (productId) => {
  console.log(`Searching for product with ID: ${productId}`);
  console.log(products);

  return products.find(product => product._id === productId);
};

export const getRelatedProducts = (productId, limit = 4) => {
  const product = getProductById(productId);
  if (!product) return [];

  return products
    .filter(p => p._id !== productId && p.category === product.category)
    .sort(() => 0.5 - Math.random()) // Simple random sort
    .slice(0, limit);
};

export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product =>
    product.title.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
};