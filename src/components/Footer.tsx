import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src="/logo.png" alt="Jowhara Collection" className="h-8 w-auto mb-4 brightness-0 invert" />
            <p className="text-gray-300 text-sm">
              Discover our premium collection of luxury beauty and fragrance products.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="text-gray-300 hover:text-white transition-colors">Shop</Link></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Customer Care</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#shipping" className="text-gray-300 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#returns" className="text-gray-300 hover:text-white transition-colors">Returns</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#instagram" className="text-gray-300 hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#facebook" className="text-gray-300 hover:text-white transition-colors">Facebook</a></li>
              <li><a href="#whatsapp" className="text-gray-300 hover:text-white transition-colors">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2025 Jowhara Collection. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;