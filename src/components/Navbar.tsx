import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'New Arrivals', path: '/shop?filter=new' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled || isMobileMenuOpen ? 'bg-white shadow-sm py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 -ml-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold tracking-widest text-ink">AURA</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                'text-sm font-medium tracking-wide transition-colors hover:text-gold',
                location.pathname === item.path ? 'text-gold' : 'text-ink/80'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:text-gold transition-colors hidden sm:block">
            <Search size={20} />
          </button>
          <button className="p-2 hover:text-gold transition-colors hidden sm:block">
            <User size={20} />
          </button>
          <Link to="/cart" className="p-2 hover:text-gold transition-colors relative">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-gold text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 p-6 lg:hidden shadow-xl"
          >
            <div className="flex flex-col gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-ink"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-gray-100 flex gap-4">
                <button className="flex items-center gap-2 text-sm font-medium text-ink/60">
                  <Search size={18} /> Search
                </button>
                <button className="flex items-center gap-2 text-sm font-medium text-ink/60">
                  <User size={18} /> Account
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
