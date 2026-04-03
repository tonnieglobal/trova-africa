# Supabase Email Notification Setup Guide

This guide will help you set up automatic email notifications for the contact form.

## Overview

When someone submits the contact form:
1. **Admin Email**: Sent to `trovaafricalimited@gmail.com` with form details
2. **User Confirmation**: Sent to the person who filled the form

## Prerequisites

1. Supabase project created
2. Resend account (for sending emails) - https://resend.com

## Step 1: Set Up Resend

1. Sign up at https://resend.com
2. Verify your domain (trovafrica.com) or use the default resend.dev domain
3. Get your API key from the Resend dashboard

## Step 2: Deploy the Edge Function

### Option A: Using Supabase CLI

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Set the Resend API key as a secret
supabase secrets set RESEND_API_KEY=your_resend_api_key_here

# Deploy the function
supabase functions deploy send-contact-email
```

### Option B: Using Supabase Dashboard

1. Go to your Supabase Dashboard → Edge Functions
2. Click "New Function"
3. Name it `send-contact-email`
4. Copy the code from `supabase/functions/send-contact-email/index.ts`
5. Add the `RESEND_API_KEY` secret in Function Settings

## Step 3: Set Up Database Trigger (Optional but Recommended)

Run the SQL in `supabase/email-trigger.sql` in your Supabase SQL Editor:

1. Go to Supabase Dashboard → SQL Editor
2. Create a "New Query"
3. Copy and paste the contents of `supabase/email-trigger.sql`
4. Click "Run"

This will automatically trigger emails when new submissions are inserted.

## Step 4: Update Environment Variables

Add to your `.env` file:

```env
# Supabase (already configured)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Optional: For local testing
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Step 5: Test the Contact Form

1. Start your development server: `npm run dev`
2. Go to the Contact page
3. Fill out and submit the form
4. Check:
   - Admin email at: trovaafricalimited@gmail.com
   - User email at: the email you used in the form

## Email Templates

### Admin Email
- **To**: trovaafricalimited@gmail.com
- **Subject**: New Contact Form Submission: [Subject]
- **Content**: All form fields with submission timestamp

### User Confirmation Email
- **To**: User's email from the form
- **Subject**: We have received your message - Trova Africa
- **Content**: 
  - Thank you message
  - Confirmation that a team member will contact them
  - Copy of their submitted message
  - Trova Africa branding

## Troubleshooting

### Emails not sending

1. Check Resend API key is set correctly
2. Verify domain is verified in Resend (or use resend.dev for testing)
3. Check Edge Function logs in Supabase Dashboard
4. Ensure the contact_submissions table exists

### Edge Function errors

1. Check function logs: Supabase Dashboard → Edge Functions → send-contact-email → Logs
2. Verify RESEND_API_KEY secret is set
3. Test the function manually in the Dashboard

### Database trigger not working

1. Check if pg_net extension is enabled
2. Verify the trigger exists: `SELECT * FROM pg_trigger WHERE tgname = 'on_contact_submission_created'`
3. Check database logs for errors

## Security Notes

- The Edge Function uses `verify_jwt = false` to allow anonymous form submissions
- The RESEND_API_KEY is stored securely as a Supabase secret
- Email addresses are validated by the contact form before submission

## Customization

To customize the email templates, edit:
- `supabase/functions/send-contact-email/index.ts`

Update the HTML in `adminEmailPayload` and `userEmailPayload` objects.

## Support

For issues with:
- **Supabase**: https://supabase.com/support
- **Resend**: https://resend.com/support
- **This project**: Check the README.md or create an issue on GitHub
