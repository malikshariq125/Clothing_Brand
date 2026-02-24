import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-ink text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <h3 className="font-serif text-2xl font-bold tracking-widest mb-6">AURA</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Redefining modern fashion with a focus on minimalism, quality, and sustainable craftsmanship. Join us in our journey to create a more conscious wardrobe.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-lg mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/shop" className="hover:text-gold transition-colors">All Collections</Link></li>
              <li><Link to="/shop?filter=new" className="hover:text-gold transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop?category=Outerwear" className="hover:text-gold transition-colors">Outerwear</Link></li>
              <li><Link to="/shop?category=Hoodies" className="hover:text-gold transition-colors">Hoodies & Sweats</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-gold transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="hover:text-gold transition-colors">FAQs</Link></li>
              <li><Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-medium text-lg mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-none py-3 px-4 text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gold hover:text-white transition-colors"
              >
                <Mail size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 AURA Fashion Brand. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Payment Methods:</span>
            <span className="text-gray-400">Visa, Mastercard, Amex, PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
