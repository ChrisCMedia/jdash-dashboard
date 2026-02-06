-- Content Series Module - Database Migration
-- Run this in your Supabase SQL Editor to create the series table and update posts

-- ===========================================
-- 1. CREATE SERIES TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS series (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    color TEXT NOT NULL DEFAULT '#D4AF37',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE series ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users (adjust as needed)
CREATE POLICY "Allow all operations for authenticated users" ON series
    FOR ALL USING (true);

-- ===========================================
-- 2. UPDATE POSTS TABLE - Add series_id column
-- ===========================================
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS series_id UUID REFERENCES series(id) ON DELETE SET NULL;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_posts_series_id ON posts(series_id);

-- ===========================================
-- 3. INSERT YOUR TIMES CONTENT SERIES
-- ===========================================
INSERT INTO series (id, title, description, color) VALUES
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'The Asset Check', 'Company-Fokus: Expertise in technischen Details und Rendite-Hebeln. ESG, Performance und Asset Management.', '#D4AF37'),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Macher-Mittwoch', 'Judith-Fokus: Nah am Geschehen, Exekutionsstärke zeigen. Baustellen-Updates und Projektentwicklung.', '#F59E0B'),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Demografie-Radar', 'Company-Fokus: Spezialwissen im Wachstumsmarkt Healthcare Real Estate und Seniorenwohnen.', '#10B981'),
    ('d4e5f6a7-b8c9-0123-defa-234567890123', 'The Human Factor', 'Judith-Fokus: Vertrauen und Netzwerk als Basis für Off-Market Deals. People Business.', '#EC4899')
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    color = EXCLUDED.color;

-- ===========================================
-- VERIFICATION QUERIES (Optional - run to verify)
-- ===========================================
-- SELECT * FROM series;
-- SELECT p.id, p.hook, s.title as series_title FROM posts p LEFT JOIN series s ON p.series_id = s.id;
