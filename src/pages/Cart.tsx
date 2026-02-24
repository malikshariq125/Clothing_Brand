import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, shipping, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto text-center">
        <div className="bg-beige w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag size={40} className="text-gray-400" />
        </div>
        <h1 className="text-4xl font-serif font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-10">Looks like you haven't added anything to your cart yet.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-ink text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gold transition-colors"
        >
          Start Shopping <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-serif font-bold">Shopping Cart</h1>
        <Link to="/shop" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-ink flex items-center gap-2">
          <ChevronLeft size={16} /> Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex gap-6 pb-8 border-b border-gray-100"
              >
                <Link to={`/product/${item.id}`} className="w-24 sm:w-32 aspect-[3/4] bg-beige overflow-hidden flex-shrink-0">
                  <img src={item.images[0]} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
                </Link>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <Link to={`/product/${item.id}`} className="font-serif text-lg font-bold hover:text-gold transition-colors">
                        {item.name}
                      </Link>
                      <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
                      {item.selectedColor} / {item.selectedSize}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                      className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-widest"
                    >
                      <Trash2 size={16} /> <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-beige p-8 sticky top-32">
            <h2 className="text-xl font-serif font-bold mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-[10px] text-gold font-bold uppercase tracking-widest">
                  Add ${(150 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}
            </div>

            <div className="pt-6 border-t border-gray-200 flex justify-between items-end mb-10">
              <span className="text-lg font-serif font-bold">Total</span>
              <span className="text-2xl font-bold">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-ink text-white py-5 text-sm font-bold uppercase tracking-widest hover:bg-gold transition-all duration-300 flex items-center justify-center gap-2"
            >
              Checkout Now <ArrowRight size={18} />
            </button>
            
            <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest mt-6">
              Secure Checkout Powered by AURA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
