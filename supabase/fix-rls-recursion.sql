-- ============================================
-- FIX: Infinite recursion in profiles RLS
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Create a security definer function to check admin status
-- This bypasses RLS and prevents recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Step 2: Drop the problematic policies
DROP POLICY IF EXISTS "Admins full access profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users insert own profile" ON public.profiles;

-- Step 3: Recreate policies using the function

-- Users can read their own profile
CREATE POLICY "Users read own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

-- Users can update their own profile (non-admin fields only)
CREATE POLICY "Users update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users insert own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Admins can SELECT all profiles (using the safe function)
CREATE POLICY "Admins read all profiles" 
  ON public.profiles FOR SELECT 
  USING (public.is_admin());

-- Admins can UPDATE all profiles
CREATE POLICY "Admins update all profiles" 
  ON public.profiles FOR UPDATE 
  USING (public.is_admin());

-- Admins can DELETE profiles
CREATE POLICY "Admins delete profiles" 
  ON public.profiles FOR DELETE 
  USING (public.is_admin());

-- Step 4: Also fix campaigns and message_logs policies
DROP POLICY IF EXISTS "Admins manage campaigns" ON public.campaigns;
CREATE POLICY "Admins manage campaigns" 
  ON public.campaigns FOR ALL 
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins full access logs" ON public.message_logs;
CREATE POLICY "Admins full access logs" 
  ON public.message_logs FOR ALL 
  USING (public.is_admin());

-- ============================================
-- DONE! The infinite recursion is fixed.
-- ============================================
