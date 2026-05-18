// Follow these steps to deploy the send-birthday-messages Edge Function:
//
// 1. Install the Supabase CLI if you haven't already:
//    npm install -g supabase
//
// 2. Log in to Supabase:
//    supabase login
//
// 3. Link your project (get project ref from Supabase dashboard URL):
//    supabase link --project-ref YOUR_PROJECT_REF
//
// 4. Set the required secrets:
//    supabase secrets set RESEND_API_KEY=re_xxxxx
//    (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are auto-injected)
//
// 5. Deploy the function:
//    supabase functions deploy send-birthday-messages
//
// 6. Set up the cron job in Supabase Dashboard:
//    - Go to Database → Extensions → Enable pg_cron and pg_net
//    - Go to SQL Editor and run:
//
//    SELECT cron.schedule(
//      'send-birthday-emails',           -- job name
//      '0 8 * * *',                       -- every day at 8 AM UTC
//      $$
//      SELECT net.http_post(
//        url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-birthday-messages',
//        headers := jsonb_build_object(
//          'Content-Type', 'application/json',
//          'Authorization', 'Bearer YOUR_ANON_KEY'
//        ),
//        body := '{}'::jsonb
//      ) AS request_id;
//      $$
//    );
//
// 7. To test manually, run:
//    supabase functions invoke send-birthday-messages
//
//    Or use curl:
//    curl -X POST https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-birthday-messages \
//      -H "Authorization: Bearer YOUR_ANON_KEY" \
//      -H "Content-Type: application/json"
