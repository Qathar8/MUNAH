import React from 'react';
import { Link } from 'react-router-dom';
import type { Brand } from '../types/database';

interface BrandDropdownProps {
  brands: Brand[];
  onClose: () => void;
}

const BrandDropdown: React.FC<BrandDropdownProps> = ({ brands, onClose }) => {
  return (
    <div className="absolute top-full mt-1 w-80 bg-white rounded-lg shadow-lg border py-2 z-10">
      {brands.map((brand) => (
        <Link
          key={brand.id}
          to={`/shop?brand=${brand.id}`}
          className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
          onClick={onClose}
        >
          {brand.logo_url && (
            <img
              src={brand.logo_url}
              alt={brand.name}
              className="w-12 h-12 object-cover rounded mr-3"
            />
          )}
          <div>
            <div className="font-semibold text-primary">{brand.name}</div>
            {brand.description && (
              <div className="text-sm text-primary-muted">{brand.description}</div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BrandDropdown;