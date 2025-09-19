/*
  # Initial Schema for Jowhara Collection E-commerce

  ## Overview
  This migration sets up the complete database schema for the luxury fragrance e-commerce platform.

  ## New Tables
  1. `brands` - Store brand information with logo URLs
  2. `categories` - Product categories for organization
  3. `products` - Main product catalog with pricing, stock, and metadata
  4. `orders` - Customer orders placed via WhatsApp
  5. `app_users` - Admin user management with role-based access

  ## Security
  - Enable RLS on all tables
  - Public can read products, brands, categories
  - Only admins can modify data
  - Customers can insert orders

  ## Features
  - UUID primary keys for all tables
  - Automatic timestamps
  - Product slug generation for SEO-friendly URLs
  - JSON gallery field for multiple product images
  - Stock tracking and featured product flags
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Brands table
CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  logo_url text,
  created_at timestamptz DEFAULT now()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE,
  description text,
  key_ingredients text,
  price numeric DEFAULT 0,
  stock integer DEFAULT 0,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  brand_id uuid REFERENCES brands(id) ON DELETE SET NULL,
  featured boolean DEFAULT false,
  image_url text,
  gallery jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id uuid REFERENCES products(id),
  customer_name text,
  phone text,
  quantity integer DEFAULT 1,
  total_price numeric,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- App users table for admin role management
CREATE TABLE IF NOT EXISTS app_users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_uid uuid UNIQUE,
  email text UNIQUE,
  role text DEFAULT 'customer',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;

-- Public read access for brands
CREATE POLICY "Public can read brands" ON brands
  FOR SELECT USING (true);

-- Admin full access for brands
CREATE POLICY "Admins can manage brands" ON brands
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM app_users 
      WHERE app_users.auth_uid = auth.uid() 
      AND app_users.role = 'admin'
    )
  );

-- Public read access for categories
CREATE POLICY "Public can read categories" ON categories
  FOR SELECT USING (true);

-- Admin full access for categories
CREATE POLICY "Admins can manage categories" ON categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM app_users 
      WHERE app_users.auth_uid = auth.uid() 
      AND app_users.role = 'admin'
    )
  );

-- Public read access for products
CREATE POLICY "Public can read products" ON products
  FOR SELECT USING (true);

-- Admin full access for products
CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM app_users 
      WHERE app_users.auth_uid = auth.uid() 
      AND app_users.role = 'admin'
    )
  );

-- Customers can insert orders
CREATE POLICY "Anyone can create orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Admin full access for orders
CREATE POLICY "Admins can manage orders" ON orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM app_users 
      WHERE app_users.auth_uid = auth.uid() 
      AND app_users.role = 'admin'
    )
  );

-- Admin access for app_users
CREATE POLICY "Admins can manage app_users" ON app_users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM app_users as admin_user
      WHERE admin_user.auth_uid = auth.uid() 
      AND admin_user.role = 'admin'
    )
  );

-- Users can read their own data
CREATE POLICY "Users can read own data" ON app_users
  FOR SELECT USING (auth_uid = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS products_slug_idx ON products(slug);
CREATE INDEX IF NOT EXISTS products_featured_idx ON products(featured);
CREATE INDEX IF NOT EXISTS products_category_idx ON products(category_id);
CREATE INDEX IF NOT EXISTS products_brand_idx ON products(brand_id);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at);