import React from 'react';
import { Link } from 'react-router-dom';
import type { Product, Brand } from '../types/database';

interface ProductCardProps {
  product: Product & { brand?: Brand };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number | null) => {
    if (price === null || price === 0) return 'KSh 0';
    return `KSh ${price.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={product.image_url || '/images/placeholder.jpg'}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        {product.featured && (
          <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded text-xs font-medium">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-primary uppercase text-lg mb-1">
          {product.name}
        </h3>
        
        {product.brand && (
          <p className="text-primary-muted text-sm mb-2">
            {product.brand.name}
          </p>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </div>
          <div className="text-sm text-primary-muted">
            Stock: {product.stock || 0}
          </div>
        </div>
        
        <Link
          to={`/product/${product.slug}`}
          className="block w-full bg-primary text-white text-center py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;