# Manual Edge Function Deployment

Your Resend API key is ready: `re_MSR6GLkC_3J7U4Loxfe66mjRpYZwTCWYF`

## Option 1: Deploy via Supabase Dashboard (Recommended)

### Step 1: Create Edge Function

1. Go to https://supabase.com/dashboard
2. Select project: `gyxggorprbulocjmwhgy`
3. Click **"Edge Functions"** in left sidebar
4. Click **"New Function"**
5. Name: `send-contact-email`
6. Copy the code below and paste it:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM_EMAIL = 'Trova Africa <onboarding@resend.dev>'
const ADMIN_EMAIL = 'trovaafricalimited@gmail.com'

serve(async (req) => {
  try {
    const { record } = await req.json()
    
    // Email to admin
    const adminEmailPayload = {
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Contact Form Submission: ${record.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${record.name}</p>
        <p><strong>Email:</strong> ${record.email}</p>
        <p><strong>Phone:</strong> ${record.phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${record.company || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${record.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${record.message}</p>
        <hr>
        <p><em>Submitted at: ${new Date(record.created_at).toLocaleString()}</em></p>
      `,
    }

    // Email to user
    const userEmailPayload = {
      from: FROM_EMAIL,
      to: record.email,
      subject: 'We have received your message - Trova Africa',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ea580c, #dc2626); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Trova Africa</h1>
          </div>
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #111827;">Thank you for contacting us!</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              Dear ${record.name},
            </p>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              We have received your request regarding "${record.subject}". 
              Please note that a team member will keep in touch shortly.
            </p>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ea580c;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                <strong>Your message:</strong><br>
                ${record.message}
              </p>
            </div>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              Best regards,<br>
              <strong>The Trova Africa Team</strong>
            </p>
          </div>
          <div style="background: #1f2937; padding: 20px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © 2026 Trova Africa Ltd. All rights reserved.<br>
              Nairobi, Kenya
            </p>
          </div>
        </div>
      `,
    }

    // Send admin email
    const adminRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(adminEmailPayload),
    })

    // Send user confirmation email
    const userRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(userEmailPayload),
    })

    if (!adminRes.ok || !userRes.ok) {
      const adminError = await adminRes.text()
      const userError = await userRes.text()
      console.error('Email send failed:', { adminError, userError })
      return new Response(
        JSON.stringify({ error: 'Failed to send emails' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Emails sent successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in edge function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
```

7. Click **"Deploy"**

### Step 2: Add Resend API Key Secret

1. After deployment, click on the `send-contact-email` function
2. Go to **"Secrets"** tab
3. Click **"Add Secret"**
4. Name: `RESEND_API_KEY`
5. Value: `re_MSR6GLkC_3J7U4Loxfe66mjRpYZwTCWYF`
6. Click **"Add"**

### Step 3: Run SQL Trigger

1. Go to **"SQL Editor"** in left sidebar
2. Click **"New Query"**
3. Paste this SQL:

```sql
-- Enable HTTP extension
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create function to handle new submissions
CREATE OR REPLACE FUNCTION public.handle_new_contact_submission()
RETURNS TRIGGER AS $$
DECLARE
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
  
  -- Call the Edge Function
  PERFORM
    net.http_post(
      url := 'https://gyxggorprbulocjmwhgy.supabase.co/functions/v1/send-contact-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || service_key
      ),
      body := jsonb_build_object('record', row_to_json(NEW))
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS on_contact_submission_created ON public.contact_submissions;
CREATE TRIGGER on_contact_submission_created
  AFTER INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_contact_submission();

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.handle_new_contact_submission() TO anon;
GRANT EXECUTE ON FUNCTION public.handle_new_contact_submission() TO authenticated;
```

4. Click **"Run"**

## Option 2: Using Supabase CLI (Alternative)

If you have the Supabase CLI installed via scoop or another method:

```bash
# Login
supabase login

# Link project
supabase link --project-ref gyxggorprbulocjmwhgy

# Set secret
supabase secrets set RESEND_API_KEY=re_MSR6GLkC_3J7U4Loxfe66mjRpYZwTCWYF

# Deploy function
supabase functions deploy send-contact-email
```

## Testing

1. Go to your website's Contact page
2. Fill out the form with your email
3. Submit
4. Check:
   - **trovaafricalimited@gmail.com** for admin notification
   - Your email for confirmation message

## Troubleshooting

- Check Edge Function logs in Supabase Dashboard
- Verify the secret is set correctly
- Ensure the SQL trigger was executed successfully
