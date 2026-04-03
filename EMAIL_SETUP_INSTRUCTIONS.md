# Email Notification Setup for Contact Form

## Goal
Send instant email notifications when someone submits the contact form:
- **Admin Email**: trovaafricalimited@gmail.com receives form details
- **User Confirmation**: The person who filled the form receives a confirmation email

## Prerequisites

1. Supabase project (already configured)
2. Resend account for sending emails

## Step-by-Step Setup

### Step 1: Create Resend Account (2 minutes)

1. Go to https://resend.com
2. Sign up with your email
3. Verify your email address
4. Get your API key from the dashboard (starts with `re_`)

### Step 2: Deploy Edge Function to Supabase

#### Option A: Using Supabase Dashboard (Recommended)

1. Go to https://supabase.com/dashboard
2. Select your project: `gyxggorprbulocjmwhgy`
3. Click **"Edge Functions"** in the left sidebar
4. Click **"New Function"**
5. Name: `send-contact-email`
6. Copy and paste the code from `supabase/functions/send-contact-email/index.ts`
7. Click **"Deploy"**

#### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link your project
supabase link --project-ref gyxggorprbulocjmwhgy

# Deploy the function
supabase functions deploy send-contact-email
```

### Step 3: Add Resend API Key Secret

1. In Supabase Dashboard, go to **"Edge Functions"**
2. Click on `send-contact-email`
3. Go to **"Secrets"** tab
4. Click **"Add Secret"**
5. Name: `RESEND_API_KEY`
6. Value: Your Resend API key (starts with `re_`)
7. Click **"Add"**

### Step 4: Run SQL to Enable Email Trigger

1. Go to Supabase Dashboard → **"SQL Editor"**
2. Click **"New Query"**
3. Copy and paste the contents of `supabase/setup-email-function.sql`
4. Click **"Run"**

This creates a database trigger that automatically calls the Edge Function when a new contact form is submitted.

### Step 5: Verify Domain (Optional but Recommended)

For emails to not go to spam, verify your domain in Resend:

1. In Resend Dashboard, go to **"Domains"**
2. Click **"Add Domain"**
3. Enter: `trovafrica.com`
4. Follow DNS verification steps
5. Or use the default `resend.dev` domain for testing

### Step 6: Test the Contact Form

1. Go to your website's Contact page
2. Fill out the form with your own email
3. Submit the form
4. Check:
   - Admin email at: trovaafricalimited@gmail.com
   - Your test email for the confirmation message

## Email Templates

### Admin Email (sent to trovaafricalimited@gmail.com)
```
Subject: New Contact Form Submission: [Subject]

Name: [Name]
Email: [Email]
Phone: [Phone]
Company: [Company]
Subject: [Subject]
Message: [Message]
Submitted at: [Timestamp]
```

### User Confirmation Email
```
Subject: We have received your message - Trova Africa

[Branded HTML email with Trova Africa logo]

Thank you for contacting us!

Dear [Name],

We have received your request regarding "[Subject]". 
Please note that a team member will keep in touch shortly.

Your message:
[Message]

Best regards,
The Trova Africa Team
```

## Troubleshooting

### Emails not sending?

1. Check Edge Function logs:
   - Supabase Dashboard → Edge Functions → send-contact-email → Logs

2. Verify RESEND_API_KEY is set correctly

3. Check if the database trigger exists:
   ```sql
   SELECT * FROM pg_trigger WHERE tgname = 'on_contact_submission_created';
   ```

4. Test the Edge Function manually in the Supabase Dashboard

### Emails going to spam?

1. Verify your domain in Resend
2. Use a professional "From" email address
3. Add SPF and DKIM records to your DNS

## Cost

- **Resend**: Free tier includes 3,000 emails/month
- **Supabase Edge Functions**: Free tier includes 500,000 invocations/month

## Support

- Resend: https://resend.com/support
- Supabase: https://supabase.com/support
