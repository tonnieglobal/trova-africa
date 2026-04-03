-- SQL to set up email notifications via database trigger
-- This works with the Edge Function deployed to Supabase

-- Enable HTTP extension for calling external services
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create the function to handle new contact submissions
CREATE OR REPLACE FUNCTION public.handle_new_contact_submission()
RETURNS TRIGGER AS $$
DECLARE
  supabase_url TEXT := 'https://gyxggorprbulocjmwhgy.supabase.co';
  service_key TEXT;
BEGIN
  -- Get service role key safely
  BEGIN
    service_key := current_setting('app.settings.service_role_key', true);
  EXCEPTION WHEN OTHERS THEN
    service_key := NULL;
  END;
  
  -- Skip if no service key available
  IF service_key IS NULL OR service_key = '' THEN
    RETURN NEW;
  END IF;
  
  -- Call the Edge Function to send emails
  PERFORM
    net.http_post(
      url := supabase_url || '/functions/v1/send-contact-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || service_key
      ),
      body := jsonb_build_object('record', row_to_json(NEW))
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_contact_submission_created ON public.contact_submissions;

-- Create trigger to call function after insert
CREATE TRIGGER on_contact_submission_created
  AFTER INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_contact_submission();

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.handle_new_contact_submission() TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_contact_submission() TO anon;

-- Enable realtime for contact_submissions (optional)
BEGIN
  -- Check if the table is already in the publication
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'contact_submissions'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE contact_submissions;
  END IF;
END;
