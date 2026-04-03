-- Supabase Database Schema for Trova Africa Website

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Contact Form Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_read BOOLEAN DEFAULT FALSE
);

-- Newsletter Subscriptions Table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Portfolio Projects Table (for dynamic content)
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  results TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_featured BOOLEAN DEFAULT FALSE
);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Create policies for contact_submissions
CREATE POLICY "Allow anonymous insert" ON contact_submissions
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated select" ON contact_submissions
  FOR SELECT TO authenticated USING (true);

-- Create policies for newsletter_subscriptions
CREATE POLICY "Allow anonymous insert" ON newsletter_subscriptions
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated select" ON newsletter_subscriptions
  FOR SELECT TO authenticated USING (true);

-- Create policies for portfolio_projects
CREATE POLICY "Allow public read" ON portfolio_projects
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow authenticated insert/update/delete" ON portfolio_projects
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_is_read ON contact_submissions(is_read);
CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_portfolio_category ON portfolio_projects(category);

-- Insert sample portfolio projects
INSERT INTO portfolio_projects (title, client, category, description, image_url, results, tags, is_featured) VALUES
('SafariCom 5G Launch', 'SafariCom', 'OOH Campaign', 'Nationwide billboard campaign for the launch of 5G network across Kenya', 'https://images.unsplash.com/photo-1770825874964-108c4f0cad4e?w=800', '+150% Brand Awareness', ARRAY['OOH', 'Digital', 'Brand Strategy'], true),
('Equity Bank Digital Transformation', 'Equity Bank', 'Digital Campaign', 'Multi-channel digital marketing campaign promoting mobile banking solutions', 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800', '+200K App Downloads', ARRAY['Digital Marketing', 'Social Media', 'Content'], true),
('KenOil Brand Refresh', 'KenOil', 'Rebranding', 'Complete brand identity redesign and rollout for leading energy company', 'https://images.unsplash.com/photo-1754663186288-814432d4e3a9?w=800', '+85% Positive Sentiment', ARRAY['Branding', 'Design', 'Strategy'], true);
