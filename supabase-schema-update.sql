-- Enable the PostGIS extension if you haven't (just good practice, though not needed for this)
-- create extension if not exists postgis;

-- 1. Add new columns to the 'posts' table
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS last_edited_by TEXT,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE;

-- 2. Create the Storage Bucket for Images
-- Note: You usually do this in the Supabase Dashboard, but here is the SQL equivalent if you have appropriate permissions/extensions
INSERT INTO storage.buckets (id, name, public) 
VALUES ('post-images', 'post-images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Set up Storage Policy (Allow public read access)
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'post-images' );

-- 4. Set up Storage Policy (Allow authenticated uploads - assuming you want all logged in users to upload)
CREATE POLICY "Authenticated Uploads" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'post-images' AND auth.role() = 'authenticated' );

-- 5. Set up Storage Policy (Allow owners to update/delete - simplified to authenticated for this team app)
CREATE POLICY "Authenticated Update" 
ON storage.objects FOR UPDATE
USING ( bucket_id = 'post-images' AND auth.role() = 'authenticated' );
