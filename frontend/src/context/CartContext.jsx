import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize state by trying to load from localStorage first
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCartItems = localStorage.getItem('cartItems');
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    } catch (error) {
      console.error('Error parsing cart items from localStorage', error);
      return [];
    }
  });

  const [shippingAddress, setShippingAddress] = useState(() => {
    try {
      const storedShippingAddress = localStorage.getItem('shippingAddress');
      return storedShippingAddress ? JSON.parse(storedShippingAddress) : {};
    } catch (error) {
      console.error('Error parsing shipping address from localStorage', error);
      return {};
    }
  });

  const [paymentMethod, setPaymentMethod] = useState(() => {
    try {
      const storedPaymentMethod = localStorage.getItem('paymentMethod');
      return storedPaymentMethod ? JSON.parse(storedPaymentMethod) : '';
    } catch (error) {
      console.error('Error parsing payment method from localStorage', error);
      return '';
    }
  });

  const addToCart = (product, qty) => {
    const exist = cartItems.find((x) => x._id === product._id);
    let newCartItems;
    if (exist) {
      newCartItems = cartItems.map((x) =>
        x._id === product._id ? { ...exist, qty } : x
      );
    } else {
      newCartItems = [...cartItems, { ...product, qty }];
    }
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const removeFromCart = (id) => {
    const newCartItems = cartItems.filter((x) => x._id !== id);
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const saveShippingAddress = (data) => {
    setShippingAddress(data);
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };

  const savePaymentMethod = (data) => {
    setPaymentMethod(data);
    localStorage.setItem('paymentMethod', JSON.stringify(data));
  };

  const clearCart = () => {
    setCartItems([]);
    // We only clear cartItems, leaving shipping/payment info in case user wants to reorder
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        shippingAddress,
        paymentMethod,
        addToCart,
        removeFromCart,
        saveShippingAddress,
        savePaymentMethod,
        clearCart, // Export the new function
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};