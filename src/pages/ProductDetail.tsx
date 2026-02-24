import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShoppingBag, Heart, ChevronRight, ChevronLeft, Play, X } from 'lucide-react';
import productsData from '../data/products.json';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { cn } from '../lib/utils';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const foundProduct = productsData.products.find(p => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[0]);
      setSelectedColor(foundProduct.colors[0]);
      setSelectedImage(0);
      
      // Related products (same category, excluding current)
      const related = productsData.products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="pt-24 pb-24 px-6 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest mb-12">
        <Link to="/" className="hover:text-gold">Home</Link>
        <ChevronRight size={12} />
        <Link to="/shop" className="hover:text-gold">Shop</Link>
        <ChevronRight size={12} />
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Product Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] bg-beige overflow-hidden zoom-container">
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={product.images[selectedImage]}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover zoom-image"
            />
            {product.video && (
              <button
                onClick={() => setIsVideoOpen(true)}
                className="absolute bottom-6 right-6 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <Play size={20} className="fill-ink" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={cn(
                  "aspect-square bg-beige overflow-hidden border-2 transition-all",
                  selectedImage === idx ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <p className="text-gold text-xs font-bold uppercase tracking-widest mb-2">{product.category}</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={cn(i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-gray-200")} />
              ))}
            </div>
            <span className="text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</span>
          </div>

          <p className="text-2xl font-bold mb-8">${product.price.toFixed(2)}</p>
          
          <p className="text-gray-600 leading-relaxed mb-10">{product.description}</p>

          {/* Options */}
          <div className="space-y-8 mb-10">
            {/* Colors */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4">Color: <span className="text-gray-500 font-normal">{selectedColor}</span></p>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all",
                      selectedColor === color ? "border-gold scale-110" : "border-transparent"
                    )}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4">Size: <span className="text-gray-500 font-normal">{selectedSize}</span></p>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "min-w-[50px] h-12 flex items-center justify-center px-4 text-xs font-bold border transition-all",
                      selectedSize === size ? "bg-ink text-white border-ink" : "bg-white text-ink border-gray-200 hover:border-ink"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4">Quantity</p>
              <div className="flex items-center w-32 border border-gray-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-12 flex items-center justify-center hover:bg-gray-50"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="flex-1 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-12 flex items-center justify-center hover:bg-gray-50"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => addToCart(product, quantity, selectedSize, selectedColor)}
              className="flex-1 bg-ink text-white py-5 text-sm font-bold uppercase tracking-widest hover:bg-gold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} /> Add to Cart
            </button>
            <button className="w-16 h-16 border border-gray-200 flex items-center justify-center hover:border-ink transition-colors">
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-serif font-bold mb-12">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && product.video && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6"
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-8 right-8 text-white hover:text-gold transition-colors"
            >
              <X size={32} />
            </button>
            <div className="w-full max-w-5xl aspect-video bg-black">
              <video controls autoPlay className="w-full h-full">
                <source src={product.video} type="video/mp4" />
              </video>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;
