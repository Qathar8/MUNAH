import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChatBubbleLeftRightIcon, HeartIcon, ShareIcon, StarIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { supabase } from '../lib/supabase';
import type { Product, Brand } from '../types/database';

const ProductDetail: React.FC = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<(Product & { brand?: Brand }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '254700000000';

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    setLoading(true);
    
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        brand:brands(*)
      `)
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
    } else if (data) {
      setProduct(data);
    }
    
    setLoading(false);
  };

  const handleWhatsAppOrder = () => {
    if (!product) return;
    
    const totalPrice = (product.price || 0) * quantity;
    const productUrl = window.location.href;
    const message = encodeURIComponent(
      `Hello, I want to order: ${product.name} (KSh ${product.price?.toLocaleString()}) - Qty: ${quantity}. Total: KSh ${totalPrice.toLocaleString()}. URL: ${productUrl}`
    );
    
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    const maxStock = product?.stock || 0;
    setQuantity(Math.min(newQuantity, maxStock));
  };

  const formatPrice = (price: number | null) => {
    if (price === null || price === 0) return 'KSh 0';
    return `KSh ${price.toLocaleString()}`;
  };

  const getProductImages = () => {
    const images = [product?.image_url].filter(Boolean);
    if (product?.gallery && Array.isArray(product.gallery)) {
      images.push(...(product.gallery as string[]));
    }
    return images;
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-primary-muted">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-2">Product Not Found</h1>
          <p className="text-primary-muted">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const images = getProductImages();

  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={images[selectedImage] || '/images/placeholder.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="font-serif text-4xl font-bold text-primary uppercase">
                  {product.name}
                </h1>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="p-2 text-primary-muted hover:text-red-500 transition-colors"
                  >
                    {isWishlisted ? (
                      <HeartIconSolid className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartIcon className="h-6 w-6" />
                    )}
                  </button>
                  <button className="p-2 text-primary-muted hover:text-primary transition-colors">
                    <ShareIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-primary-muted">(24 reviews)</span>
              </div>
              
              <div className="text-3xl font-bold text-primary mb-4">
                {formatPrice(product.price)}
              </div>
            </div>

            {product.description && (
              <div>
                <h3 className="font-semibold text-primary mb-2">Description</h3>
                <p className="text-primary-muted leading-relaxed">{product.description}</p>
              </div>
            )}

            {product.key_ingredients && (
              <div>
                <h3 className="font-semibold text-primary mb-2">Key Ingredients</h3>
                <p className="text-primary-muted leading-relaxed">{product.key_ingredients}</p>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <h3 className="font-semibold text-primary mb-2">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= (product.stock || 0)}
                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-primary-muted">
                  {product.stock || 0} in stock
                </span>
              </div>
            </div>

            {/* Order Button */}
            <div className="space-y-4">
              <button
                onClick={handleWhatsAppOrder}
                disabled={(product.stock || 0) === 0}
                className="w-full bg-accent-whatsapp text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
                <span>
                  Order Now - {formatPrice((product.price || 0) * quantity)}
                </span>
              </button>
              
              <div className="flex space-x-4">
                <button className="flex-1 border border-primary text-primary py-3 px-6 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors">
                  Add to Wishlist
                </button>
                <button className="flex-1 border border-gray-300 text-primary-muted py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Share Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;