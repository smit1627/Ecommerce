// Sample product data for the e-commerce website
const products = [
  {
    id: '1',
    title: 'Wireless Noise Cancelling Headphones',
    description: 'Premium wireless headphones with advanced noise cancelling technology, crystal-clear sound quality, and up to 30 hours of battery life. Perfect for travel, work, or enjoying your favorite music without distractions.',
    price: 299.99,
    discount: 15,
    category: 'electronics',
    subcategory: 'audio',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4959828/pexels-photo-4959828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    rating: 4.8,
    stock: 45,
    specifications: {
      'Bluetooth Version': '5.2',
      'Battery Life': '30 hours',
      'Noise Cancellation': 'Active',
      'Weight': '250g',
      'Charging Time': '2 hours',
      'Microphone': 'Built-in with voice assistant support',
      'Warranty': '2 years'
    }
  },
  {
    id: '2',
    title: 'Ultra HD 4K Smart TV - 55"',
    description: 'Transform your home entertainment with this stunning 55-inch 4K Ultra HD Smart TV. Featuring vibrant colors, sharp contrast, and integrated streaming apps, this TV delivers an immersive viewing experience for movies, sports, and gaming.',
    price: 699.99,
    discount: 10,
    category: 'electronics',
    subcategory: 'televisions',
    image: 'https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5552789/pexels-photo-5552789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    rating: 4.6,
    stock: 20,
    specifications: {
      'Screen Size': '55 inches',
      'Resolution': '4K Ultra HD (3840 x 2160)',
      'Refresh Rate': '120Hz',
      'Smart TV': 'Yes, with built-in apps',
      'HDR': 'Yes, HDR10 and Dolby Vision',
      'HDMI Ports': '4',
      'USB Ports': '2',
      'Warranty': '1 year'
    }
  },
  {
    id: '3',
    title: 'Professional DSLR Camera with Lens Kit',
    description: 'Capture stunning photos and videos with this professional DSLR camera. The package includes a versatile lens kit, making it perfect for beginners and enthusiasts alike. With advanced autofocus, 4K video recording, and exceptional image quality, this camera helps bring your creative vision to life.',
    price: 1299.99,
    discount: 0,
    category: 'electronics',
    subcategory: 'cameras',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2929411/pexels-photo-2929411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    rating: 4.9,
    stock: 15,
    specifications: {
      'Sensor': '24.1 Megapixel CMOS',
      'Video Recording': '4K UHD',
      'ISO Range': '100-25600 (expandable to 51200)',
      'Autofocus Points': '45-point all cross-type AF system',
      'Lens Mount': 'EF/EF-S',
      'Continuous Shooting': 'Up to 7 fps',
      'Battery Life': 'Approximately 1200 shots per charge',
      'Warranty': '2 years limited warranty'
    }
  },
  {
    id: '4',
    title: 'Premium Leather Jacket',
    description: 'Elevate your style with this premium genuine leather jacket. Crafted from high-quality materials, this timeless piece features a classic design with modern details. Perfect for casual outings or evening events, this versatile jacket will last for years to come.',
    price: 249.99,
    discount: 0,
    category: 'clothing',
    subcategory: 'outerwear',
    image: 'https://images.pexels.com/photos/6175210/pexels-photo-6175210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/6175210/pexels-photo-6175210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6769536/pexels-photo-6769536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6770036/pexels-photo-6770036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    rating: 4.7,
    stock: 30,
    specifications: {
      'Material': 'Genuine leather',
      'Lining': '100% polyester',
      'Closure': 'YKK zipper front',
      'Pockets': 'Two side pockets, one inner pocket',
      'Care': 'Professional leather cleaning only',
      'Sizes': 'S, M, L, XL, XXL',
      'Colors Available': 'Black, Brown, Cognac'
    }
  },
  {
    id: '5',
    title: 'Designer Handbag',
    description: 'This designer handbag combines luxury and functionality. Made from premium materials with meticulous attention to detail, it features multiple compartments, an adjustable strap, and elegant hardware. A perfect accessory to elevate any outfit.',
    price: 189.99,
    discount: 20,
    category: 'fashion',
    subcategory: 'bags',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1001996/pexels-photo-1001996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    rating: 4.5,
    stock: 25,
    specifications: {
      'Material': 'Full-grain leather',
      'Dimensions': '12" x 9" x 4"',
      'Strap': 'Adjustable and removable shoulder strap',
      'Closure': 'Magnetic snap and zipper',
      'Interior': 'Lined with multiple pockets',
      'Colors Available': 'Black, Tan, Navy, Red',
      'Hardware': 'Gold-tone metal'
    }
  },
  {
    id: '6',
    title: 'Smart Fitness Watch',
    description: 'Track your health and fitness goals with this advanced smart fitness watch. Monitor heart rate, sleep patterns, steps, and various workout metrics. With smartphone notifications and long battery life, this water-resistant watch is the perfect companion for an active lifestyle.',
    price: 149.99,
    discount: 25,
    category: 'electronics',
    subcategory: 'wearables',
    image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1682821/pexels-photo-1682821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    rating: 4.4,
    stock: 50,
    specifications: {
      'Display': '1.4" AMOLED touchscreen',
      'Water Resistance': '5 ATM',
      'Battery Life': 'Up to 7 days',
      'Sensors': 'Heart rate, accelerometer, gyroscope, GPS',
      'Compatibility': 'iOS 10.0+ and Android 5.0+',
      'Connectivity': 'Bluetooth 5.0, Wi-Fi',
      'Features': 'Activity tracking, sleep monitoring, notifications, music control',
      'Warranty': '1 year'
    }
  },
  {
    id: '7',
    title: 'Modern Coffee Table',
    description: 'Add a touch of elegance to your living room with this modern coffee table. The minimalist design features clean lines, a sturdy build, and a beautiful finish that complements any decor style. Perfect for hosting or displaying your favorite books and decorative items.',
    price: 299.99,
    discount: 0,
    category: 'home-kitchen',
    subcategory: 'furniture',
    image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/358572/pexels-photo-358572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    rating: 4.3,
    stock: 18,
    specifications: {
      'Material': 'Solid wood and tempered glass',
      'Dimensions': '47" L x 23.5" W x 16" H',
      'Weight Capacity': '100 lbs',
      'Assembly': 'Required, tools included',
      'Features': 'Lower shelf for storage',
      'Finish': 'Walnut, Oak, or Black',
      'Warranty': '3 years'
    }
  },
  {
    id: '8',
    title: 'Professional Kitchen Knife Set',
    description: 'Elevate your cooking experience with this professional-grade kitchen knife set. Crafted from high-carbon stainless steel, these precision-balanced knives offer exceptional sharpness and durability. The ergonomic handles ensure comfort and control while preparing your favorite meals.',
    price: 129.99,
    discount: 10,
    category: 'home-kitchen',
    subcategory: 'kitchen',
    image: 'https://images.pexels.com/photos/952478/pexels-photo-952478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/952478/pexels-photo-952478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/678641/pexels-photo-678641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6599635/pexels-photo-6599635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    rating: 4.7,
    stock: 35,
    specifications: {
      'Material': 'High-carbon stainless steel',
      'Includes': 'Chef\'s knife, bread knife, utility knife, paring knife, kitchen shears',
      'Handle': 'Ergonomic triple-riveted design',
      'Block': 'Acacia wood storage block',
      'Blade Hardness': '56+ Rockwell hardness',
      'Care': 'Hand wash recommended',
      'Warranty': 'Lifetime warranty against manufacturing defects'
    }
  },
  {
    id: '9',
    title: 'Premium Yoga Mat',
    description: 'Enhance your yoga practice with this premium, eco-friendly yoga mat. The non-slip surface provides excellent grip, while the optimal cushioning offers joint protection and comfort. Durable, easy to clean, and portable, this mat is perfect for yogis of all levels.',
    price: 79.99,
    discount: 15,
    category: 'sports-fitness',
    subcategory: 'yoga',
    image: 'https://images.pexels.com/photos/4498579/pexels-photo-4498579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/4498579/pexels-photo-4498579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4056531/pexels-photo-4056531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    rating: 4.6,
    stock: 40,
    specifications: {
      'Material': 'Eco-friendly TPE (Thermoplastic Elastomer)',
      'Dimensions': '72" L x 24" W x 6mm thick',
      'Weight': '2.5 lbs',
      'Features': 'Non-slip surface, closed-cell construction',
      'Care': 'Wipe clean with mild soap and water',
      'Includes': 'Carrying strap',
      'Colors Available': '6 options'
    }
  },
  {
    id: '10',
    title: 'Wireless Bluetooth Speaker',
    description: 'Experience powerful, room-filling sound with this portable Bluetooth speaker. Featuring rich bass, clear highs, and 360-degree audio, this waterproof speaker is perfect for any occasion. With 20 hours of battery life and quick connectivity, your music goes wherever you do.',
    price: 89.99,
    discount: 0,
    category: 'electronics',
    subcategory: 'audio',
    image: 'https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3394660/pexels-photo-3394660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6501750/pexels-photo-6501750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    rating: 4.5,
    stock: 55,
    specifications: {
      'Bluetooth Version': '5.0',
      'Battery Life': 'Up to 20 hours',
      'Water Resistance': 'IPX7 (waterproof)',
      'Audio': '360-degree sound with passive bass radiator',
      'Range': 'Up to 100 feet',
      'Charging': 'USB-C, 3 hours for full charge',
      'Dimensions': '3.5" x 3.5" x 7"',
      'Weight': '1.5 lbs'
    }
  },
  {
    id: '11',
    title: 'Slim Fit Dress Shirt',
    description: 'This versatile slim-fit dress shirt combines classic style with modern tailoring. Made from premium cotton with a touch of stretch for comfort, it transitions effortlessly from office to evening. The wrinkle-resistant fabric keeps you looking sharp all day long.',
    price: 59.99,
    discount: 20,
    category: 'clothing',
    subcategory: 'shirts',
    image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/45055/pexels-photo-45055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6214157/pexels-photo-6214157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    rating: 4.4,
    stock: 60,
    specifications: {
      'Material': '97% cotton, 3% elastane',
      'Fit': 'Slim fit',
      'Collar': 'Spread collar',
      'Cuffs': 'Adjustable button cuffs',
      'Care': 'Machine washable',
      'Sizes': 'S, M, L, XL, XXL',
      'Colors Available': 'White, Light Blue, Navy, Black, Pink'
    }
  },
  {
    id: '12',
    title: 'Stainless Steel Water Bottle',
    description: 'Stay hydrated in style with this premium stainless steel water bottle. Double-wall vacuum insulation keeps drinks cold for 24 hours or hot for 12 hours. Durable, leak-proof, and eco-friendly, this BPA-free bottle is perfect for the gym, office, or outdoor adventures.',
    price: 29.99,
    discount: 0,
    category: 'sports-fitness',
    subcategory: 'accessories',
    image: 'https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/296817/pexels-photo-296817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    rating: 4.8,
    stock: 70,
    specifications: {
      'Material': '18/8 food-grade stainless steel',
      'Capacity': '24 oz (710 ml)',
      'Insulation': 'Double-wall vacuum insulation',
      'Lid': 'Leak-proof screw cap',
      'Mouth': 'Wide mouth for easy filling and cleaning',
      'Features': 'BPA-free, sweat-proof, fits most cup holders',
      'Care': 'Hand wash recommended',
      'Colors Available': 'Silver, Black, Blue, Green, Red'
    }
  }
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