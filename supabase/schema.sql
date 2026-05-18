-- ============================================
-- Charis Belle CRM - Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable required extensions
-- Note: pg_cron requires Pro plan, skip if on free tier
-- create extension if not exists pg_cron;

-- ============================================
-- 1. PROFILES TABLE (extends auth.users)
-- ============================================
create table if not exists public.profiles (
  id            uuid primary key references auth.users on delete cascade,
  full_name     text,
  birth_date    date,
  phone         text,
  email         text,
  preferences   jsonb default '{}'::jsonb,
  role          text default 'user' check (role in ('user','admin')),
  created_at    timestamptz default now()
);

-- Add comment for documentation
comment on table public.profiles is 'User profiles extending Supabase auth.users';

-- ============================================
-- 2. CAMPAIGNS TABLE
-- ============================================
create table if not exists public.campaigns (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  type          text not null check (type in ('birthday','reminder')),
  channel       text not null default 'email' check (channel in ('email','sms','both')),
  subject       text,  -- For email only
  body_html     text,  -- For email only
  sms_body      text,  -- For SMS only (max 160 chars recommended)
  is_active     boolean default true,
  created_at    timestamptz default now()
);

comment on table public.campaigns is 'Email campaign templates (birthday, reminder)';

-- ============================================
-- 3. MESSAGE LOGS TABLE
-- ============================================
create table if not exists public.message_logs (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references public.profiles(id) on delete set null,
  campaign_id   uuid references public.campaigns(id) on delete set null,
  channel       text not null default 'email' check (channel in ('email','sms')),
  sent_at       timestamptz default now(),
  status        text check (status in ('sent','failed')),
  message_id    text  -- External ID from Resend/Twilio
);

comment on table public.message_logs is 'Log of all sent messages for tracking';

-- ============================================
-- 4. ENABLE ROW LEVEL SECURITY
-- ============================================
alter table public.profiles enable row level security;
alter table public.campaigns enable row level security;
alter table public.message_logs enable row level security;

-- ============================================
-- 5. RLS POLICIES FOR PROFILES
-- ============================================

-- Users can read their own profile
create policy "Users read own profile" 
  on public.profiles for select 
  using (auth.uid() = id);

-- Users can update their own profile
create policy "Users update own profile" 
  on public.profiles for update 
  using (auth.uid() = id);

-- Users can insert their own profile
create policy "Users insert own profile" 
  on public.profiles for insert 
  with check (auth.uid() = id);

-- Admins can do everything on profiles
create policy "Admins full access profiles" 
  on public.profiles for all 
  using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================
-- 6. RLS POLICIES FOR CAMPAIGNS
-- ============================================

-- Anyone can read active campaigns (for displaying in emails)
create policy "Anyone can read active campaigns"
  on public.campaigns for select
  using (is_active = true);

-- Admins can manage all campaigns
create policy "Admins manage campaigns" 
  on public.campaigns for all 
  using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================
-- 7. RLS POLICIES FOR MESSAGE LOGS
-- ============================================

-- Users can view their own message logs
create policy "Users view own logs" 
  on public.message_logs for select 
  using (user_id = auth.uid());

-- Admins can view and insert all logs
create policy "Admins full access logs" 
  on public.message_logs for all 
  using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- Service role can insert logs (for Edge Functions)
create policy "Service role insert logs"
  on public.message_logs for insert
  with check (true);

-- ============================================
-- 8. TRIGGER: Auto-create profile on signup
-- ============================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$;

-- Drop trigger if exists (for re-running)
drop trigger if exists on_auth_user_created on auth.users;

-- Create the trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- 9. INDEXES FOR PERFORMANCE
-- ============================================
create index if not exists idx_profiles_email on public.profiles(email);
create index if not exists idx_profiles_birth_date on public.profiles(birth_date);
create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_campaigns_type on public.campaigns(type);
create index if not exists idx_campaigns_is_active on public.campaigns(is_active);
create index if not exists idx_message_logs_user_id on public.message_logs(user_id);
create index if not exists idx_message_logs_campaign_id on public.message_logs(campaign_id);
create index if not exists idx_message_logs_sent_at on public.message_logs(sent_at);

-- ============================================
-- 10. SAMPLE DATA (Optional - for testing)
-- ============================================

-- Insert a sample birthday campaign (email + SMS)
insert into public.campaigns (name, type, channel, subject, body_html, sms_body, is_active)
values (
  'Birthday Wishes 2026',
  'birthday',
  'both',
  '🎂 Happy Birthday from Charis Belle!',
  '<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #247245; font-size: 28px; margin: 0;">Happy Birthday, {{full_name}}! 🎉</h1>
    </div>
    <p style="color: #333; font-size: 16px; line-height: 1.8;">
      Wishing you a day filled with joy, beauty, and all the wonderful things you deserve!
    </p>
    <p style="color: #333; font-size: 16px; line-height: 1.8;">
      As our special birthday gift to you, enjoy <strong style="color: #D4A373;">20% off</strong> your next treatment when you book within the next 30 days.
    </p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://yoursite.com/book" style="display: inline-block; background-color: #D4A373; color: white; padding: 15px 30px; text-decoration: none; border-radius: 30px; font-weight: bold;">
        Book Your Birthday Treat
      </a>
    </div>
    <p style="color: #666; font-size: 14px; text-align: center;">
      With love,<br>
      <strong style="color: #247245;">The Charis Belle Team</strong>
    </p>
  </div>',
  '🎂 Happy Birthday {{full_name}}! Enjoy 20% off your next treatment at Charis Belle. Book now: yoursite.com/book - With love, The Charis Belle Team 💖',
  true
)
on conflict do nothing;

-- Insert a sample reminder campaign (email + SMS)
insert into public.campaigns (name, type, channel, subject, body_html, sms_body, is_active)
values (
  'Appointment Reminder',
  'reminder',
  'both',
  '💌 We Miss You at Charis Belle!',
  '<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #247245; font-size: 28px; margin: 0;">Hi {{full_name}}, We Miss You! 💖</h1>
    </div>
    <p style="color: #333; font-size: 16px; line-height: 1.8;">
      It''s been a while since your last visit, and we''d love to see you again!
    </p>
    <p style="color: #333; font-size: 16px; line-height: 1.8;">
      Whether you''re due for a refresh or want to try something new, we''re here to help you look and feel your best.
    </p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://yoursite.com/book" style="display: inline-block; background-color: #247245; color: white; padding: 15px 30px; text-decoration: none; border-radius: 30px; font-weight: bold;">
        Book Your Appointment
      </a>
    </div>
    <p style="color: #666; font-size: 14px; text-align: center;">
      See you soon!<br>
      <strong style="color: #247245;">The Charis Belle Team</strong>
    </p>
  </div>',
  'Hi {{full_name}}! 💖 We miss you at Charis Belle. Book your next appointment: yoursite.com/book - See you soon!',
  true
)
on conflict do nothing;

-- ============================================
-- DONE! Your database is ready.
-- ============================================
-- Next steps:
-- 1. Sign up a user through your app
-- 2. Go to Table Editor → profiles → find your user
-- 3. Change their 'role' from 'user' to 'admin'
-- 4. Now that user can access /admin routes
