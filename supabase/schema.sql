-- ========================================
-- Sri Jewellers - Supabase Database Schema
-- ========================================
-- Run this in the Supabase SQL Editor.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- Categories
-- ========================================
CREATE TABLE categories (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_te TEXT DEFAULT '',
  name_hi TEXT DEFAULT '',
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- Products
-- ========================================
CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
  name_en TEXT NOT NULL,
  name_te TEXT DEFAULT '',
  name_hi TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  description_te TEXT DEFAULT '',
  description_hi TEXT DEFAULT '',
  material TEXT NOT NULL CHECK (material IN ('gold', 'silver')),
  purity TEXT NOT NULL,
  weight_grams NUMERIC(10,2) NOT NULL,
  image_urls TEXT[] DEFAULT '{}',
  is_visible BOOLEAN DEFAULT true,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- Inquiries
-- ========================================
CREATE TABLE inquiries (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_id BIGINT REFERENCES products(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  message TEXT DEFAULT '',
  channel TEXT DEFAULT 'email' CHECK (channel IN ('email', 'whatsapp')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- Analytics
-- ========================================
CREATE TABLE analytics (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
  event TEXT NOT NULL CHECK (event IN ('view', 'click', 'inquiry')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- Indexes
-- ========================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_material ON products(material);
CREATE INDEX idx_products_visible ON products(is_visible);
CREATE INDEX idx_analytics_product ON analytics(product_id);
CREATE INDEX idx_analytics_event ON analytics(event);
CREATE INDEX idx_analytics_created ON analytics(created_at);

-- ========================================
-- Row Level Security (RLS)
-- ========================================

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ policies
CREATE POLICY "Public can read categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read visible products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (is_visible = true);

-- Admin can read ALL products (including hidden)
CREATE POLICY "Admin can read all products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

-- PUBLIC INSERT policies (for inquiries and analytics)
CREATE POLICY "Anyone can create inquiries"
  ON inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can create analytics"
  ON analytics FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ADMIN WRITE policies
CREATE POLICY "Admin can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can manage products"
  ON products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can read inquiries"
  ON inquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can read analytics"
  ON analytics FOR SELECT
  TO authenticated
  USING (true);

-- ========================================
-- Storage Bucket
-- ========================================
-- Create a storage bucket for product images
-- (Run this separately in Supabase Dashboard > Storage)
-- Bucket name: product-images
-- Public: Yes (for CDN URLs)

-- ========================================
-- Seed Data (Optional)
-- ========================================
INSERT INTO categories (name_en, name_te, name_hi, slug) VALUES
  ('Necklaces', 'హారాలు', 'हार', 'necklaces'),
  ('Bangles', 'గాజులు', 'चूड़ियाँ', 'bangles'),
  ('Earrings', 'చెవి పోగులు', 'झुमके', 'earrings'),
  ('Rings', 'ఉంగరాలు', 'अंगूठी', 'rings'),
  ('Chains', 'చెయిన్లు', 'चेन', 'chains'),
  ('Pendants', 'లాకెట్లు', 'लॉकेट', 'pendants'),
  ('Anklets', 'కడియాలు', 'पायल', 'anklets'),
  ('Bracelets', 'బ్రేస్‌లెట్లు', 'कंगन', 'bracelets');
