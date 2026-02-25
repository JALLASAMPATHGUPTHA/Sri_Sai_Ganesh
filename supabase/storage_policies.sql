-- ========================================
-- Storage Bucket Policies (product-images)
-- ========================================

-- IMPORTANT: Ensure the bucket 'product-images' is created in the 
-- Storage section of your Supabase Dashboard and set to "Public" before running this.

-- 1. Policy: Allow anyone to view/read public images
CREATE POLICY "Public Access" 
  ON storage.objects FOR SELECT 
  TO public
  USING (bucket_id = 'product-images');

-- 2. Policy: Allow authenticated users (Admins) to upload images
CREATE POLICY "Admin Upload Access" 
  ON storage.objects FOR INSERT 
  TO authenticated 
  WITH CHECK (bucket_id = 'product-images');

-- 3. Policy: Allow authenticated users (Admins) to update their images
CREATE POLICY "Admin Update Access" 
  ON storage.objects FOR UPDATE 
  TO authenticated 
  USING (bucket_id = 'product-images');

-- 4. Policy: Allow authenticated users (Admins) to delete images
CREATE POLICY "Admin Delete Access" 
  ON storage.objects FOR DELETE 
  TO authenticated 
  USING (bucket_id = 'product-images');

