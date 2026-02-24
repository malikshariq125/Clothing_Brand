import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import productsData from '../data/products.json';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { cn } from '../lib/utils';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categories = ['All', ...new Set(productsData.products.map(p => p.category))];

  useEffect(() => {
    setProducts(productsData.products);
    
    // Initial filter from URL
    const catParam = searchParams.get('category');
    const filterParam = searchParams.get('filter');
    
    if (catParam) setActiveCategory(catParam);
    if (filterParam === 'new') setSortBy('newest');
  }, [searchParams]);

  useEffect(() => {
    let result = [...products];

    // Category Filter
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    // New Arrivals Filter (if specifically requested via URL or sorting)
    if (searchParams.get('filter') === 'new' && activeCategory === 'All') {
       result = result.filter(p => p.new_arrival);
    }

    // Sorting
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    setFilteredProducts(result);
  }, [products, activeCategory, sortBy, searchParams]);

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-serif font-bold mb-4">Collections</h1>
          <p className="text-gray-500">Discover our curated selection of premium essentials.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-gray-200 px-6 py-3 text-xs font-bold uppercase tracking-widest hover:border-ink transition-colors"
          >
            <Filter size={16} /> Filters
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 md:flex-none border border-gray-200 px-6 py-3 text-xs font-bold uppercase tracking-widest outline-none focus:border-ink transition-colors appearance-none bg-white cursor-pointer"
          >
            <option value="newest">Sort: Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-gray-500 italic">No products found in this collection.</p>
          <button
            onClick={() => setActiveCategory('All')}
            className="mt-4 text-gold font-bold uppercase tracking-widest text-xs border-b border-gold pb-1"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Filter Sidebar */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isSidebarOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 z-[60] w-full max-w-md bg-white shadow-2xl p-8 overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl font-serif font-bold">Filters</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:text-gold transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-12">
          {/* Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <SlidersHorizontal size={14} /> Category
            </h3>
            <div className="flex flex-col gap-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "text-left text-sm transition-colors hover:text-gold",
                    activeCategory === cat ? "text-gold font-bold" : "text-gray-500"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range (Mock) */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Price Range</h3>
            <div className="space-y-4">
              <div className="h-1 bg-gray-100 relative rounded-full">
                <div className="absolute inset-y-0 left-0 right-1/4 bg-gold rounded-full" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-white border-2 border-gold rounded-full shadow-sm" />
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-4 h-4 bg-white border-2 border-gold rounded-full shadow-sm" />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="w-full bg-ink text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-gold transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </motion.div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-[55] bg-black/20 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Shop;
