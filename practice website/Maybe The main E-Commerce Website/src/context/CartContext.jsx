import axios from 'axios';
import React, { createContext, useState, useEffect, useRef } from 'react';
import { use } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  const navigate = useNavigate();
  const updateLocks = useRef({});

  const getAuthToken = () => {
    const tokenData = sessionStorage.getItem('currentUser');
    return tokenData ? JSON.parse(tokenData).token : null;
  };
  const [token, setToken] = useState(getAuthToken());

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(getAuthToken());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateToken = () => {
    setToken(getAuthToken());
  };

  const getCart = async () => {
    if (!token) {
      setCart([]);
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${apiUrl}/getCart`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.statusText === 'OK') {
        console.log(response.data, "cart data");
        setCart(response.data.items);
      } else {
        console.log('Failed to fetch cart');
      }
    } catch (error) {
      console.log(error, "error in getting cart");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    getCart();
  }, [token]);


  const addToCart = async (product, quantity = 1) => {
    try {
      updateToken()
      const response = await axios.post(`${apiUrl}/addToCart`,
        { productId: product._id, quantity },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log(response);

      if (response.status >= 200 && response.status < 300) {
        toast.success('Item added to cart!');

        setCart(prevCart => {
          const existingItem = prevCart.find(item => item.productId._id === product._id);
          if (existingItem) {
            // If item exists, increase quantity
            updateQuantity(product._id, existingItem.quantity + quantity);
            return prevCart.map(item =>
              item.productId._id === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            // If item doesn't exist, add new one
            return [...prevCart, { productId: product, quantity }];
          }
        });
      }
    } catch (error) {
      console.error('Failed to add to cart:', error.message);
      if (error.response && error.response.status === 401) {
        toast.error('Please log in to add items to your cart.');
        navigate('/login');
      } else {
        console.error('An error occurred while adding to cart:', error);
      }
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`${apiUrl}/deletedProduct/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setCart(prevCart =>
          prevCart.filter(item => item._id !== productId)
        );
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    console.log(productId, "productId in updateQuantity");

    if (updateLocks.current[productId]) {
      console.log(`Update in progress for product ${productId}, skipping...`);
      return;
    }
    updateLocks.current[productId] = true;

    try {
      console.log(productId, "productId in updateQuantity");

      const response = await axios.put(
        `${apiUrl}/updateCart/${productId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setCart(prevCart =>
          prevCart.map(item =>
            item.productId._id === productId
              ? { ...item, quantity }
              : item
          )
        );
        // toast.success('Cart updated successfully!');
      }
    } catch (err) {
      console.error("Failed to update cart quantity:", err);
    } finally {
      updateLocks.current[productId] = false;
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item?.productId?.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    loading,
    getCart,
    setCart,
    updateToken
  };

  return (
    <CartContext.Provider value={value}>
      {!loading && children}
    </CartContext.Provider>
  );
};