import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, HeartIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { supabase } from '../lib/supabase';
import type { Brand, Category } from '../types/database';
import BrandDropdown from './BrandDropdown';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*');
    if (data) setCategories(data);
  };

  const fetchBrands = async () => {
    const { data } = await supabase.from('brands').select('*');
    if (data) setBrands(data);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="/logo.png" alt="Jowhara Collection" className="h-8 w-auto" />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-primary hover:text-primary-muted transition-colors">
              Home
            </Link>
            
            {/* Browse by Category Dropdown */}
            <div className="relative">
              <button
                className="flex items-center text-primary hover:text-primary-muted transition-colors"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              >
                Browse by Category
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              {showCategoryDropdown && (
                <div className="absolute top-full mt-1 w-48 bg-white rounded-lg shadow-lg border py-2 z-10">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/shop?category=${category.id}`}
                      className="block px-4 py-2 text-sm text-primary hover:bg-gray-50"
                      onClick={() => setShowCategoryDropdown(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Browse by Brand Dropdown */}
            <div className="relative">
              <button
                className="flex items-center text-primary hover:text-primary-muted transition-colors"
                onClick={() => setShowBrandDropdown(!showBrandDropdown)}
              >
                Browse by Brand
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              {showBrandDropdown && (
                <BrandDropdown 
                  brands={brands} 
                  onClose={() => setShowBrandDropdown(false)} 
                />
              )}
            </div>

            <Link to="/shop" className="text-primary hover:text-primary-muted transition-colors">
              Shop
            </Link>
            <a href="#about" className="text-primary hover:text-primary-muted transition-colors">
              About
            </a>
            <a href="#contact" className="text-primary hover:text-primary-muted transition-colors">
              Contact
            </a>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-primary hover:text-primary-muted transition-colors">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
            <button className="p-2 text-primary hover:text-primary-muted transition-colors">
              <ShoppingCartIcon className="h-5 w-5" />
            </button>
            <button className="p-2 text-primary hover:text-primary-muted transition-colors">
              <HeartIcon className="h-5 w-5" />
            </button>
            <Link to="/login" className="p-2 text-primary hover:text-primary-muted transition-colors">
              <UserIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;