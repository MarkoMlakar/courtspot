-- Drop all policies first
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
DROP POLICY IF EXISTS "Anyone can view locations" ON locations;
DROP POLICY IF EXISTS "Only authenticated users can create locations" ON locations;
DROP POLICY IF EXISTS "Only location creators can update locations" ON locations;
DROP POLICY IF EXISTS "Anyone can view courts" ON courts;
DROP POLICY IF EXISTS "Only authenticated users can create courts" ON courts;
DROP POLICY IF EXISTS "Only court creators can update courts" ON courts;
DROP POLICY IF EXISTS "Only court creators can delete courts" ON courts;
DROP POLICY IF EXISTS "Anyone can view court images" ON court_images;
DROP POLICY IF EXISTS "Only court creators can add images" ON court_images;
DROP POLICY IF EXISTS "Only court creators can delete images" ON court_images;
DROP POLICY IF EXISTS "Anyone can view comments" ON comments;
DROP POLICY IF EXISTS "Only authenticated users can create comments" ON comments;
DROP POLICY IF EXISTS "Only comment authors can update comments" ON comments;
DROP POLICY IF EXISTS "Only comment authors can delete comments" ON comments;
DROP POLICY IF EXISTS "Users can view their own favorites" ON favorites;
DROP POLICY IF EXISTS "Users can add to their own favorites" ON favorites;
DROP POLICY IF EXISTS "Users can remove from their own favorites" ON favorites;
DROP POLICY IF EXISTS "Anyone can view sightings" ON sightings;
DROP POLICY IF EXISTS "Only authenticated users can create sightings" ON sightings;
DROP POLICY IF EXISTS "Only sighting creators can update sightings" ON sightings;
DROP POLICY IF EXISTS "Only sighting creators can delete sightings" ON sightings;

-- Disable RLS on all tables
ALTER TABLE IF EXISTS users DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS locations DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS courts DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS court_images DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS favorites DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS sightings DISABLE ROW LEVEL SECURITY;

-- Drop triggers
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_courts_updated_at ON courts;
DROP TRIGGER IF EXISTS update_locations_updated_at ON locations;
DROP TRIGGER IF EXISTS update_comments_updated_at ON comments;

-- Drop the trigger function
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop tables in reverse order of dependencies
DROP TABLE IF EXISTS sightings;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS court_images;
DROP TABLE IF EXISTS courts;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS users;

-- Drop the UUID extension if you want to remove it completely
-- DROP EXTENSION IF EXISTS "uuid-ossp"; 