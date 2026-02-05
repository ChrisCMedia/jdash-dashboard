-- 1. Create the 'analytics_metrics' table
CREATE TABLE IF NOT EXISTS analytics_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE NOT NULL,
    impressions INTEGER DEFAULT 0,
    engagements INTEGER DEFAULT 0,
    new_followers INTEGER DEFAULT 0,
    platform TEXT CHECK (platform IN ('Personal', 'Company')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE analytics_metrics ENABLE ROW LEVEL SECURITY;

-- 3. Create Policy (Public Read for now or Authenticated)
CREATE POLICY "Enable read access for all users" ON analytics_metrics FOR SELECT USING (true);
CREATE POLICY "Enable insert access for authenticated users" ON analytics_metrics FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 4. Seed Data (Realistic 2025-2026 Performance Data)
INSERT INTO analytics_metrics (date, platform, impressions, engagements, new_followers) VALUES
-- August 2025
('2025-08-01', 'Personal', 12500, 450, 25),
('2025-08-15', 'Personal', 13200, 480, 28),
('2025-08-01', 'Company', 5400, 120, 10),
('2025-08-15', 'Company', 5800, 135, 12),

-- September 2025
('2025-09-01', 'Personal', 14100, 510, 35),
('2025-09-15', 'Personal', 14800, 540, 42),
('2025-09-01', 'Company', 6200, 150, 15),
('2025-09-15', 'Company', 6500, 165, 18),

-- October 2025
('2025-10-01', 'Personal', 16500, 620, 50),
('2025-10-15', 'Personal', 17200, 680, 55),
('2025-10-01', 'Company', 7100, 190, 22),
('2025-10-15', 'Company', 7400, 210, 25),

-- November 2025 (High Season)
('2025-11-01', 'Personal', 21000, 850, 80),
('2025-11-15', 'Personal', 22500, 920, 95),
('2025-11-01', 'Company', 8800, 320, 40),
('2025-11-15', 'Company', 9200, 340, 45),

-- December 2025 (Holiday Dip/Reflection)
('2025-12-01', 'Personal', 18000, 700, 40),
('2025-12-15', 'Personal', 15500, 600, 30),
('2025-12-01', 'Company', 8100, 280, 20),
('2025-12-15', 'Company', 7500, 250, 15),

-- January 2026 (Strong Start)
('2026-01-01', 'Personal', 24500, 1100, 120),
('2026-01-15', 'Personal', 26000, 1250, 140),
('2026-01-01', 'Company', 10500, 450, 60),
('2026-01-15', 'Company', 11200, 480, 65),

-- February 2026 (Current)
('2026-02-01', 'Personal', 28000, 1400, 160),
('2026-02-01', 'Company', 12100, 520, 75);
