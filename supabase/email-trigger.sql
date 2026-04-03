-- SQL to set up email trigger for contact form submissions
-- Run this in your Supabase SQL Editor

-- Enable the pg_net extension for HTTP requests (if not already enabled)
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a function that will be triggered after insert on contact_submissions
CREATE OR REPLACE FUNCTION public.handle_new_contact_submission()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the Edge Function using pg_net
  PERFORM
    net.http_post(
      url := CONCAT(current_setting('app.settings.supabase_url'), '/functions/v1/send-contact-email'),
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', CONCAT('Bearer ', current_setting('app.settings.service_role_key'))
      ),
      body := jsonb_build_object('record', row_to_json(NEW))
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS on_contact_submission_created ON public.contact_submissions;
CREATE TRIGGER on_contact_submission_created
  AFTER INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_contact_submission();

-- Alternative: Use supabase_realtime to trigger the edge function
-- This requires setting up the edge function separately

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.handle_new_contact_submission() TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_contact_submission() TO anon;
