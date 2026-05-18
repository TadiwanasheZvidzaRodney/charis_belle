import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'https://esm.sh/resend'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const resendApiKey = Deno.env.get('RESEND_API_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceKey)
const resend = new Resend(resendApiKey)

// Configure your "from" address here. Must be verified in Resend.
// Use "onboarding@resend.dev" for testing (only sends to your own email).
const FROM_EMAIL = 'Charis Belle <onboarding@resend.dev>'

Deno.serve(async (req) => {
  // Optional: Add a secret header check for extra security
  // const authHeader = req.headers.get('Authorization')
  // if (authHeader !== `Bearer ${Deno.env.get('CRON_SECRET')}`) {
  //   return new Response('Unauthorized', { status: 401 })
  // }

  try {
    const today = new Date()
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const day = today.getDate().toString().padStart(2, '0')
    
    // Match birthdays by month and day only (ignore year)
    // This requires a slightly different query approach
    const monthDay = `${month}-${day}`

    console.log(`Checking for birthdays on ${monthDay}...`)

    // Fetch users whose birth_date ends with the current month-day
    // e.g., birth_date LIKE '%-05-18' for May 18th
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('id, full_name, email, birth_date')
      .like('birth_date', `%-${monthDay}`)

    if (usersError) {
      console.error('Error fetching users:', usersError)
      throw usersError
    }

    console.log(`Found ${users?.length ?? 0} users with birthdays today`)

    if (!users?.length) {
      return new Response(JSON.stringify({ message: 'No birthdays today' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Get the active birthday campaign
    const { data: campaign, error: campError } = await supabase
      .from('campaigns')
      .select('*')
      .eq('type', 'birthday')
      .eq('is_active', true)
      .maybeSingle()

    if (campError) {
      console.error('Error fetching campaign:', campError)
      throw campError
    }

    if (!campaign) {
      console.log('No active birthday campaign found')
      return new Response(
        JSON.stringify({ message: 'No active birthday campaign' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Using campaign: ${campaign.name}`)

    const results = { sent: 0, failed: 0 }

    for (const user of users) {
      if (!user.email) {
        console.log(`Skipping user ${user.id}: no email`)
        continue
      }

      // Replace placeholders in the email body
      const personalizedHtml = campaign.body_html
        .replaceAll('{{full_name}}', user.full_name || 'Valued Customer')
        .replaceAll('{{email}}', user.email)

      try {
        console.log(`Sending birthday email to ${user.email}...`)

        const { error: emailError } = await resend.emails.send({
          from: FROM_EMAIL,
          to: user.email,
          subject: campaign.subject,
          html: personalizedHtml,
        })

        if (emailError) {
          throw emailError
        }

        // Log successful send
        await supabase.from('message_logs').insert({
          user_id: user.id,
          campaign_id: campaign.id,
          status: 'sent',
        })

        results.sent++
        console.log(`✓ Sent to ${user.email}`)
      } catch (emailError) {
        console.error(`✗ Failed to send to ${user.email}:`, emailError)

        // Log failed send
        await supabase.from('message_logs').insert({
          user_id: user.id,
          campaign_id: campaign.id,
          status: 'failed',
        })

        results.failed++
      }
    }

    const summary = `Birthday emails: ${results.sent} sent, ${results.failed} failed`
    console.log(summary)

    return new Response(JSON.stringify({ message: summary, ...results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Edge function error:', err)
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', details: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
