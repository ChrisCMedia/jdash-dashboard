-- Create the table for posts
create table posts (
  id uuid default gen_random_uuid() primary key,
  date date not null,
  platform text not null check (platform in ('LinkedIn Personal', 'LinkedIn Company')),
  content text default '',
  status text not null default 'Draft' check (status in ('Draft', 'Review', 'Approved', 'Posted')),
  feedback text default '',
  created_at timestamptz default now()
);

-- Turn on Row Level Security
alter table posts enable row level security;

-- Create a policy that allows all operations for now (since we protect the app with a password)
-- In a real app with multiple users, you'd use Supabase Auth.
create policy "Enable all for anon" on posts for all using (true) with check (true);

-- Seed Data
insert into posts (date, platform, content, status) values 
('2026-02-02', 'LinkedIn Personnel', 'Markt-Update: Zinsen sind stabil...', 'Draft'),
('2026-02-04', 'LinkedIn Company', 'Wir haben eine neue Baustelle begonnen...', 'Review');
