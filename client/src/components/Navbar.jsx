import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Store } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartItemCount } = useCart();
  const location = useLocation();
  const cartItemCount = getCartItemCount();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white font-bold text-xl hover:text-blue-200 transition-colors"
            >
              <Store className="h-8 w-8" />
              <span>ShopHub</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/products"
                  className={`text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/products')}`}
                >
                  Products
                </Link>
                
                <Link
                  to="/cart"
                  className={`text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${isActive('/cart')}`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart</span>
                  {cartItemCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-1">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                <div className="flex items-center space-x-2 text-white">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{user?.name}</span>
                </div>

                <button
                  onClick={logout}
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/login')}`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`bg-blue-800 text-white hover:bg-blue-900 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/signup')}`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};