import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Play, Star, Quote } from 'lucide-react';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { cn } from '../lib/utils';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  useEffect(() => {
    setFeaturedProducts(productsData.products.filter(p => p.featured));
    setNewArrivals(productsData.products.filter(p => p.new_arrival));
  }, []);

  const reviews = [
    { id: 1, name: "Sarah Jenkins", text: "The quality of the wool overcoat is beyond my expectations. Truly a premium piece for a reasonable price.", rating: 5 },
    { id: 2, name: "Marcus Thorne", text: "Finally found a brand that understands minimalist streetwear. The fit of the oversized tee is perfect.", rating: 5 },
    { id: 3, name: "Elena Rodriguez", text: "Fast shipping and beautiful packaging. You can tell they care about every detail.", rating: 4 },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-on-a-runway-4115-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center text-white px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm uppercase tracking-[0.3em] font-medium mb-4"
          >
            Aura Collection 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-tight"
          >
            New Season <br /> <span className="italic">Collection</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-white text-ink px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gold hover:text-white transition-all duration-300"
            >
              Shop Now <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-gold text-xs font-bold uppercase tracking-widest mb-2">Editor's Choice</p>
            <h2 className="text-4xl font-serif font-bold">Featured Pieces</h2>
          </div>
          <Link to="/shop" className="text-sm font-bold uppercase tracking-widest border-b-2 border-ink pb-1 hover:text-gold hover:border-gold transition-all">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="bg-beige py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video bg-ink overflow-hidden relative group">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-80"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-woman-in-a-fashion-shoot-with-a-red-background-4116-large.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <Play size={24} className="fill-white" />
                </button>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/10 -z-10" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gold text-xs font-bold uppercase tracking-widest mb-4">Our Heritage</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">Crafting the Future of <span className="italic">Essential Wear</span></h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Founded in 2024, AURA was born out of a desire for simplicity. We believe that true luxury lies in the details—the weight of the fabric, the precision of the stitch, and the timelessness of the silhouette.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest group">
              Discover Our Story <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold text-xs font-bold uppercase tracking-widest mb-2">Just Landed</p>
          <h2 className="text-4xl font-serif font-bold">New Arrivals</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {newArrivals.slice(0, 3).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-ink text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Quote size={48} className="text-gold mx-auto mb-6 opacity-50" />
            <h2 className="text-4xl font-serif font-bold mb-4">What Our Community Says</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map(review => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 p-8 border border-white/10"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={cn(i < review.rating ? "fill-gold text-gold" : "text-white/20")} />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6 leading-relaxed">"{review.text}"</p>
                <p className="font-bold text-sm uppercase tracking-widest">— {review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">Join the Inner Circle</h2>
          <p className="text-gray-500 mb-10">Subscribe to get early access to new drops, exclusive events, and 10% off your first order.</p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-beige border-none py-4 px-6 focus:ring-2 focus:ring-gold outline-none transition-all"
            />
            <button className="bg-ink text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gold transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
