import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import type { Product, Brand } from '../types/database';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<(Product & { brand?: Brand })[]>([]);
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '254700000000';

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select(`
        *,
        brand:brands(*)
      `)
      .eq('featured', true)
      .limit(6);
    
    if (data) {
      setFeaturedProducts(data);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I'm interested in your luxury fragrance collection. Can you help me?");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/hero.jpg)' }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <img src="/logo.png" alt="Jowhara Collection" className="h-16 w-auto mx-auto mb-8 brightness-0 invert" />
          
          <h1 className="font-serif text-hero md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Luxury Beauty & Fragrance
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover our premium collection of beauty and fragrance products
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-gray-50 transition-all duration-300"
            >
              Shop Now
            </Link>
            
            <button
              onClick={handleWhatsAppClick}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-accent-whatsapp hover:border-accent-whatsapp transition-all duration-300"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              Order via WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-primary mb-4">
                Featured Products
              </h2>
              <p className="text-primary-muted text-lg">
                Discover our most popular luxury fragrances
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link
                to="/shop"
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-block"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;