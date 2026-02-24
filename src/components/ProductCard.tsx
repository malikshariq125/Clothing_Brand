import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { motion } from 'motion/react';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-beige mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.new_arrival && (
            <span className="bg-white text-ink text-[10px] font-bold uppercase tracking-widest px-3 py-1">New</span>
          )}
          {product.featured && (
            <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">Featured</span>
          )}
        </div>

        {/* Quick Add Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product, 1, product.sizes[0], product.colors[0]);
          }}
          className="absolute bottom-0 left-0 right-0 bg-ink text-white py-4 text-xs font-bold uppercase tracking-widest translate-y-full transition-transform duration-300 group-hover:translate-y-0 flex items-center justify-center gap-2"
        >
          <ShoppingBag size={16} /> Quick Add
        </button>
      </Link>

      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{product.category}</p>
          <Link to={`/product/${product.id}`} className="text-sm font-medium hover:text-gold transition-colors">
            {product.name}
          </Link>
          <div className="flex items-center gap-1 mt-1">
            <Star size={10} className="fill-gold text-gold" />
            <span className="text-[10px] text-gray-500">{product.rating} ({product.reviews})</span>
          </div>
        </div>
        <p className="text-sm font-bold">${product.price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
