import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

// Initialize Twilio client
const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

interface SendSMSParams {
  to: string;
  message: string;
}

interface SMSResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send an SMS message via Twilio
 */
export async function sendSMS({ to, message }: SendSMSParams): Promise<SMSResult> {
  if (!client || !twilioPhone) {
    console.error('Twilio not configured. Check environment variables.');
    return { success: false, error: 'Twilio not configured' };
  }

  // Format phone number (ensure it has country code)
  const formattedPhone = formatPhoneNumber(to);
  
  if (!formattedPhone) {
    return { success: false, error: 'Invalid phone number' };
  }

  try {
    const result = await client.messages.create({
      body: message,
      from: twilioPhone,
      to: formattedPhone,
    });

    console.log(`SMS sent to ${formattedPhone}: ${result.sid}`);
    return { success: true, messageId: result.sid };
  } catch (error) {
    console.error('Twilio SMS error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Format phone number to E.164 format
 * Assumes US numbers if no country code provided
 */
function formatPhoneNumber(phone: string): string | null {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  if (digits.length === 0) return null;
  
  // If it starts with 1 and has 11 digits (US)
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  
  // If it's 10 digits (US without country code)
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  
  // If it already has a country code (12+ digits)
  if (digits.length >= 11) {
    return `+${digits}`;
  }
  
  // Invalid number
  return null;
}

/**
 * Send bulk SMS messages
 */
export async function sendBulkSMS(
  recipients: { phone: string; message: string }[]
): Promise<{ sent: number; failed: number; results: SMSResult[] }> {
  const results: SMSResult[] = [];
  let sent = 0;
  let failed = 0;

  for (const recipient of recipients) {
    const result = await sendSMS({ 
      to: recipient.phone, 
      message: recipient.message 
    });
    
    results.push(result);
    if (result.success) sent++;
    else failed++;
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return { sent, failed, results };
}
