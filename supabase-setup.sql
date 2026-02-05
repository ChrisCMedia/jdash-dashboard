-- Create the posts table
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  platform text not null, -- 'LinkedIn Personal' or 'LinkedIn Company'
  date text not null, -- stored as YYYY-MM-DD string for simplicity
  status text not null, -- 'Draft', 'Review', 'Approved', 'Posted'
  hook text,
  content text,
  visuals_placeholder text,
  hashtags text,
  internal_notes text,
  image_url text,
  feedback text, -- For client review comments
  last_edited_by text -- Name of the user who last edited
);

-- Associate setting singleton row
create table if not exists settings (
  id bigint primary key generated always as identity,
  appTitle text default 'YT Content Cockpit',
  logoUrl text,
  linkedinProfileUrl text,
  linkedinCompanyUrl text,
  notifyOnFeedback boolean default true,
  notifyOnApproval boolean default true
);

-- Enable Row Level Security (RLS)
alter table posts enable row level security;
alter table settings enable row level security;

-- Create policies (Allow public access for MVP)
create policy "Allow public access posts" on posts for all using (true) with check (true);
create policy "Allow public access settings" on settings for all using (true) with check (true);

-- Create Storage Bucket for images
insert into storage.buckets (id, name, public) 
values ('post-images', 'post-images', true)
on conflict (id) do nothing;

create policy "Public Access to Images" on storage.objects
for all using ( bucket_id = 'post-images' );
