import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/home/HomePage';
import ProductsPage from './pages/products/ProductsPage';
import ProductDetailPage from './pages/products/ProductDetailPage';
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/profile/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import { DataProvider } from './context/DataContext';
import { Toaster } from 'react-hot-toast';



function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <DataProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Toaster
                position="top-center"
                toastOptions={{
                  duration: 2000,
                  style: {
                    background: '#222',          // dark background
                    color: '#f0f0f0',           // light text
                    fontWeight: '600',
                    fontSize: '1rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    padding: '16px 24px',
                    maxWidth: '400px',
                    backdropFilter: 'blur(10px)',  // subtle blur behind toast
                  },
                  success: {
                    iconTheme: {
                      primary: '#10B981',         // bright green icon color
                      secondary: '#ffffff',
                    },
                    style: {
                      background: '#047857',      // richer green background
                      color: '#d1fae5',           // light green text
                      boxShadow: '0 4px 12px rgba(4, 120, 87, 0.5)',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#EF4444',         // bright red icon color
                      secondary: '#ffffff',
                    },
                    style: {
                      background: '#B91C1C',      // deep red background
                      color: '#fee2e2',           // light red text
                      boxShadow: '0 4px 12px rgba(185, 28, 28, 0.5)',
                    },
                  },
                  loading: {
                    style: {
                      background: '#2563EB',      // blue loading background
                      color: '#DBEAFE',           // light blue text
                      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.5)',
                    },
                  },
                }}
              />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:category" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route
                  path="/checkout"
                  element={
                    <PrivateRoute>
                      <CheckoutPage />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  }
                />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </DataProvider>
      </AuthProvider>
    </CartProvider>
  );
}


export default App;