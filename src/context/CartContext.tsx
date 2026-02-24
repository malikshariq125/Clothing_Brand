import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (id: number, size: string, color: string) => void;
  updateQuantity: (id: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  shipping: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('aura_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    setCart(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingItemIndex > -1) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }

      return [...prev, { ...product, quantity, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (id: number, size: string, color: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size && item.selectedColor === color)));
  };

  const updateQuantity = (id: number, size: string, color: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => 
      (item.id === id && item.selectedSize === size && item.selectedColor === color) 
        ? { ...item, quantity } 
        : item
    ));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, shipping, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
