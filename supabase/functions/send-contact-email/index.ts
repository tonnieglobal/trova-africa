import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM_EMAIL = 'Trova Africa <noreply@trovafrica.com>'
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
