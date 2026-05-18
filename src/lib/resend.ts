import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY

if (!resendApiKey) {
  console.warn('RESEND_API_KEY is not set. Email sending will fail.')
}

export const resend = new Resend(resendApiKey)

/**
 * The "from" address for all emails.
 * Must be verified in Resend, or use "onboarding@resend.dev" for testing.
 */
export const FROM_EMAIL = 'Charis Belle <onboarding@resend.dev>'
