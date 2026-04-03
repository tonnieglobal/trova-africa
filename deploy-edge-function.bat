@echo off
echo ==========================================
echo Deploy Edge Function to Supabase
echo ==========================================
echo.

set PROJECT_REF=gyxggorprbulocjmwhgy
set RESEND_API_KEY=re_MSR6GLkC_3J7U4Loxfe66mjRpYZwTCWYF

echo Step 1: Checking Supabase CLI...
supabase --version >nul 2>&1
if errorlevel 1 (
    echo Installing Supabase CLI...
    npm install -g supabase
)

echo.
echo Step 2: Logging in to Supabase...
supabase login

echo.
echo Step 3: Linking project...
supabase link --project-ref %PROJECT_REF%

echo.
echo Step 4: Setting Resend API key secret...
supabase secrets set RESEND_API_KEY=%RESEND_API_KEY%

echo.
echo Step 5: Deploying Edge Function...
supabase functions deploy send-contact-email

echo.
echo ==========================================
echo Deployment Complete!
echo ==========================================
echo.
echo Next steps:
echo 1. Run the SQL trigger in Supabase SQL Editor
echo 2. Test the contact form
echo.
pause
