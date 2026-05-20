'use server'

import { resend, FROM_EMAIL } from '@/lib/resend'

export type ContactFormState = {
  success?: string
  error?: string
} | null

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name')?.toString().trim()
  const email = formData.get('email')?.toString().trim()
  const phone = formData.get('phone')?.toString().trim()
  const service = formData.get('service')?.toString().trim()
  const message = formData.get('message')?.toString().trim()

  // Validation
  if (!name || name.length < 2) {
    return { error: 'Please enter your name.' }
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Please enter a valid email address.' }
  }

  if (!message || message.length < 5) {
    return { error: 'Please enter a message.' }
  }

  // Build the email content
  const serviceName = service || 'Not specified'
  const phoneNumber = phone || 'Not provided'

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #247245; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">New Booking Request</h1>
      </div>
      <div style="padding: 30px; background: #f9f9f9;">
        <h2 style="color: #247245; margin-top: 0;">Contact Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Name:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
              <a href="mailto:${email}" style="color: #247245;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
              ${phone ? `<a href="tel:${phone}" style="color: #247245;">${phoneNumber}</a>` : phoneNumber}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Service:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${serviceName}</td>
          </tr>
        </table>
        
        <h2 style="color: #247245; margin-top: 30px;">Message</h2>
        <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #eee;">
          <p style="margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
        
        <div style="margin-top: 30px; padding: 15px; background: #FAEDCD; border-radius: 8px;">
          <p style="margin: 0; font-size: 14px;">
            <strong>Quick Actions:</strong><br>
            ${phone ? `<a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #247245;">Reply on WhatsApp</a> | ` : ''}
            <a href="mailto:${email}" style="color: #247245;">Reply by Email</a>
          </p>
        </div>
      </div>
      <div style="background: #333; color: #999; padding: 15px; text-align: center; font-size: 12px;">
        This message was sent from the Charis Belle website contact form.
      </div>
    </div>
  `

  try {
    // Send email to the business
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: 'tadiwarodneyzvidza@gmail.com', // Change this to your actual business email
      replyTo: email,
      subject: `New Booking Request from ${name} - ${serviceName}`,
      html: emailHtml,
    })

    if (error) {
      console.error('Failed to send contact form email:', error)
      return { error: 'Failed to send message. Please try again or contact us directly.' }
    }

    // Optionally send a confirmation email to the customer
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'We received your booking request - Charis Belle',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #247245; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Thank You, ${name}!</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <p>We've received your booking request and will get back to you shortly.</p>
            
            <div style="background: #FAEDCD; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #247245; margin-top: 0;">Your Request Details</h3>
              <p><strong>Service:</strong> ${serviceName}</p>
              <p><strong>Message:</strong> ${message}</p>
            </div>
            
            <p>In the meantime, feel free to:</p>
            <ul>
              <li>Follow us on <a href="https://instagram.com/charis_belle_expert/" style="color: #247245;">Instagram</a></li>
              <li>WhatsApp us at <a href="https://wa.me/263719227377" style="color: #247245;">+263 71 922 7377</a></li>
            </ul>
            
            <p style="margin-top: 30px;">
              Looking forward to making you look amazing!<br>
              <strong>— The Charis Belle Team</strong>
            </p>
          </div>
          <div style="background: #333; color: #999; padding: 15px; text-align: center; font-size: 12px;">
            Charis Belle | Second Street & George Silundika, Harare
          </div>
        </div>
      `,
    })

    return { success: 'Thank you! Your message has been sent. We\'ll get back to you soon!' }
  } catch (err) {
    console.error('Contact form error:', err)
    return { error: 'Something went wrong. Please try again or contact us on WhatsApp.' }
  }
}
