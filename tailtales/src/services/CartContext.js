// src/services/CartContext.js
import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { auth } from './firebase';

// Define initial state
const initialState = {
  items: [],
  total: 0
};

// Create context
const CartContext = createContext();

// Cart reducer function to handle different actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );
      
      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      } else {
        // New item, add with quantity 1
        const newItem = { ...action.payload, quantity: 1 };
        return {
          ...state,
          items: [...state.items, newItem],
          total: calculateTotal([...state.items, newItem])
        };
      }
    
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        total: calculateTotal(filteredItems)
      };
    
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item => 
        item.id === action.payload.id 
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    
    case 'CLEAR_CART':
      return initialState;
    
    case 'LOAD_CART':
      return {
        ...action.payload,
        total: calculateTotal(action.payload.items)
      };
      
    default:
      return state;
  }
};

// Helper function to calculate total price
const calculateTotal = (items) => {
  return items.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return total + (price * item.quantity);
  }, 0);
};

// Cart Provider component
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  const [currentUserId, setCurrentUserId] = useState(null);
  
  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      const newUserId = user ? user.uid : 'guest';
      
      // If user ID changed, we need to load the appropriate cart
      if (newUserId !== currentUserId) {
        setCurrentUserId(newUserId);
        
        // Load cart data for this specific user
        const cartKey = `cart_${newUserId}`;
        const savedCart = localStorage.getItem(cartKey);
        
        if (savedCart) {
          // Load saved cart
          dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
        } else {
          // Initialize with empty cart
          dispatch({ type: 'CLEAR_CART' });
        }
      }
    });
    
    return () => unsubscribe();
  }, [currentUserId]);
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    if (currentUserId) {
      const cartKey = `cart_${currentUserId}`;
      localStorage.setItem(cartKey, JSON.stringify(cart));
    }
  }, [cart, currentUserId]);
  
  // Create context value
  const contextValue = {
    cart,
    addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
    removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
    updateQuantity: (id, quantity) => 
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' })
  };
  
  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};