-- Seed data for Jowhara Collection

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
  ('Men''s Fragrances', 'Premium fragrances designed for men'),
  ('Women''s Fragrances', 'Luxury fragrances for women'),
  ('Unisex Fragrances', 'Gender-neutral luxury scents'),
  ('Body Care', 'Premium body care products'),
  ('Gift Sets', 'Curated fragrance gift collections');

-- Insert sample brands
INSERT INTO brands (name, description, logo_url) VALUES
  ('Tom Ford', 'Luxury American fashion house known for sophisticated fragrances', 'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Versace', 'Italian luxury fashion company with iconic fragrances', 'https://images.pexels.com/photos/1040161/pexels-photo-1040161.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Oud Ignite', 'Premium Middle Eastern fragrance house', 'https://images.pexels.com/photos/1040162/pexels-photo-1040162.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('Jowhara Collection', 'Our signature luxury fragrance line', 'https://images.pexels.com/photos/1040163/pexels-photo-1040163.jpeg?auto=compress&cs=tinysrgb&w=200');

-- Insert sample products
INSERT INTO products (
  name, 
  slug, 
  description, 
  key_ingredients, 
  price, 
  stock, 
  category_id, 
  brand_id, 
  featured, 
  image_url
) VALUES
  (
    'IGNITE',
    'ignite',
    'A captivating blend of oriental spices and woody notes that ignites the senses with its bold and sophisticated character.',
    'Oud, Sandalwood, Rose, Amber, Vanilla',
    2500,
    33,
    (SELECT id FROM categories WHERE name = 'Unisex Fragrances' LIMIT 1),
    (SELECT id FROM brands WHERE name = 'Oud Ignite' LIMIT 1),
    true,
    'https://images.pexels.com/photos/1961797/pexels-photo-1961797.jpeg?auto=compress&cs=tinysrgb&w=400'
  ),
  (
    'ROYAL OUD',
    'royal-oud',
    'An opulent fragrance featuring the finest oud wood, creating an aura of luxury and elegance.',
    'Premium Oud, Cedar, Bergamot, Musk',
    3500,
    25,
    (SELECT id FROM categories WHERE name = 'Unisex Fragrances' LIMIT 1),
    (SELECT id FROM brands WHERE name = 'Jowhara Collection' LIMIT 1),
    true,
    'https://images.pexels.com/photos/1961798/pexels-photo-1961798.jpeg?auto=compress&cs=tinysrgb&w=400'
  ),
  (
    'NOIR EXTREME',
    'noir-extreme',
    'A mysterious and seductive fragrance with deep, rich notes that leave a lasting impression.',
    'Black Pepper, Cardamom, Oud, Leather, Patchouli',
    4200,
    18,
    (SELECT id FROM categories WHERE name = 'Men''s Fragrances' LIMIT 1),
    (SELECT id FROM brands WHERE name = 'Tom Ford' LIMIT 1),
    true,
    'https://images.pexels.com/photos/1961799/pexels-photo-1961799.jpeg?auto=compress&cs=tinysrgb&w=400'
  ),
  (
    'CRYSTAL ESSENCE',
    'crystal-essence',
    'A fresh and luminous fragrance that captures the essence of crystal-clear waters and blooming gardens.',
    'Jasmine, Water Lily, White Musk, Citrus',
    2800,
    40,
    (SELECT id FROM categories WHERE name = 'Women''s Fragrances' LIMIT 1),
    (SELECT id FROM brands WHERE name = 'Versace' LIMIT 1),
    false,
    'https://images.pexels.com/photos/1961800/pexels-photo-1961800.jpeg?auto=compress&cs=tinysrgb&w=400'
  ),
  (
    'GOLDEN SANDS',
    'golden-sands',
    'Inspired by desert sunsets, this warm fragrance combines amber and spice for an unforgettable experience.',
    'Amber, Saffron, Frankincense, Myrrh, Vanilla',
    3200,
    22,
    (SELECT id FROM categories WHERE name = 'Unisex Fragrances' LIMIT 1),
    (SELECT id FROM brands WHERE name = 'Jowhara Collection' LIMIT 1),
    true,
    'https://images.pexels.com/photos/1961801/pexels-photo-1961801.jpeg?auto=compress&cs=tinysrgb&w=400'
  ),
  (
    'VELVET ROSE',
    'velvet-rose',
    'A romantic and elegant fragrance featuring the finest Bulgarian roses in a luxurious composition.',
    'Bulgarian Rose, Velvet Petals, Sandalwood, White Musk',
    2900,
    35,
    (SELECT id FROM categories WHERE name = 'Women''s Fragrances' LIMIT 1),
    (SELECT id FROM brands WHERE name = 'Jowhara Collection' LIMIT 1),
    false,
    'https://images.pexels.com/photos/1961802/pexels-photo-1961802.jpeg?auto=compress&cs=tinysrgb&w=400'
  );