import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI, itemsAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      refreshCart();
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated]);

  const refreshCart = async () => {
    try {
      const cartResponse = await cartAPI.getCart();
      const cartData = cartResponse.data;

      if (cartData.length === 0) {
        setCartItems([]);
        return;
      }

      // Fetch item details for each cart item
      const cartItemsWithDetails = await Promise.all(
        cartData.map(async (cartItem) => {
          try {
            const itemResponse = await itemsAPI.getItem(cartItem.itemId);
            const item = itemResponse.data;
            return {
              ...cartItem,
              name: item.name,
              price: item.price,
              image: item.image,
            };
          } catch (error) {
            console.error(`Error fetching item ${cartItem.itemId}:`, error);
            return null;
          }
        })
      );

      setCartItems(cartItemsWithDetails.filter(Boolean));
    } catch (error) {
      console.error('Error refreshing cart:', error);
    }
  };

  const addToCart = async (itemId, quantity = 1) => {
    try {
      await cartAPI.addToCart(itemId, quantity);
      await refreshCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      await cartAPI.updateCart(itemId, quantity);
      await refreshCart();
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await cartAPI.removeFromCart(itemId);
      await refreshCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    getCartItemCount,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};