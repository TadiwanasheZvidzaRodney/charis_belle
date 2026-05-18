```markdown
# Charis Belle – Beauty Expert CRM & Automation Platform

A full-stack platform for Charis Belle to collect client details, manage profiles, and send automated birthday messages and reminders.

## 🎯 Objective
Build a web app where:
- Users can sign up, log in, and fill in their personal profile (name, birth date, email, phone, preferences).
- Charis Belle (admin) can view all users, create message campaigns (birthday and reminders), and send manual or automated emails.
- The system automatically sends personalised birthday emails every morning at 8 AM.

## ⚙️ Tech Stack
- **Frontend & Backend**: [Next.js 14 (App Router)](https://nextjs.org/) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL, built-in auth, row‑level security, edge functions)
- **Email**: [Resend](https://resend.com/) (developer‑friendly, generous free tier)
- **Scheduling**: Supabase Cron (pg_cron) triggering an Edge Function
- **Hosting**: Vercel (connected to GitHub for automatic deploys)

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js 18+
- A Supabase account (free tier)
- A Resend account (free tier)

### 1. Clone & Install
```bash
npx create-next-app@latest charis-belle --typescript --tailwind --app
cd charis-belle
npm install @supabase/supabase-js @supabase/ssr resend
npm install -D @types/node
```

### 2. Environment Variables
Create a `.env.local` file:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...       # keep secret, used only in server/edge
RESEND_API_KEY=re_...
```

### 3. Database Setup
In your Supabase SQL editor, run the following:

```sql
-- Enable the pg_cron extension (for scheduled jobs)
create extension if not exists pg_cron;

-- Profiles table (extending auth.users)
create table public.profiles (
  id            uuid primary key references auth.users on delete cascade,
  full_name     text,
  birth_date    date,
  phone         text,
  email         text, -- denormalized for easy querying
  preferences   jsonb default '{}'::jsonb, -- e.g., {"channel":"email"}
  role          text default 'user' check (role in ('user','admin')),
  created_at    timestamptz default now()
);

-- Campaigns table
create table public.campaigns (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  type          text not null check (type in ('birthday','reminder')),
  subject       text not null,
  body_html     text not null,
  is_active     boolean default true,
  created_at    timestamptz default now()
);

-- Log of sent messages
create table public.message_logs (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references public.profiles(id),
  campaign_id   uuid references public.campaigns(id),
  sent_at       timestamptz default now(),
  status        text check (status in ('sent','failed'))
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.campaigns enable row level security;
alter table public.message_logs enable row level security;

-- Profiles: users can read/update only their own profile
create policy "Users read own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles
  for update using (auth.uid() = id);
create policy "Users insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Admins can do everything (policy using a custom claim or role column)
create policy "Admins full access profiles" on public.profiles
  for all using ( (select role from public.profiles where id = auth.uid()) = 'admin' );

-- Campaigns: only admin can manage (same pattern)
create policy "Admins manage campaigns" on public.campaigns
  for all using ( (select role from public.profiles where id = auth.uid()) = 'admin' );

-- Message logs: admin can view, users can see their own
create policy "Admins view all logs" on public.message_logs
  for select using ( (select role from public.profiles where id = auth.uid()) = 'admin' );
create policy "Users view own logs" on public.message_logs
  for select using ( user_id = auth.uid() );

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### 4. Run the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you’ll see a blank Next.js app, ready to build.

---

## 📁 Project Structure (Suggested)
```
src/
├── app/
│   ├── layout.tsx         (global layout with providers)
│   ├── page.tsx           (landing page)
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── profile/page.tsx
│   ├── admin/
│   │   ├── dashboard/page.tsx
│   │   └── campaigns/
│   │       ├── new/page.tsx
│   │       └── [id]/page.tsx
│   ├── api/
│   │   └── send-manual/route.ts
│   └── protected/...      (any other protected routes)
├── components/
│   ├── ui/                (shadcn/ui components)
│   ├── AuthForm.tsx
│   ├── ProfileForm.tsx
│   ├── CampaignCard.tsx
│   └── AdminUserList.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── admin.ts       (service role client)
│   └── resend.ts
└── utils/
    └── helpers.ts
```

---

## 🧩 Implementation Plan (Just follow the numbered tasks)

Each task is a unit that your AI assistant can help you build step‑by‑step.

### PHASE 1 – Auth & User Profile

- [ ] **1.1** Set up Supabase client helpers for client, server, and admin (service role)
- [ ] **1.2** Build `/login` and `/signup` pages using Supabase Auth UI or custom forms (use `supabase.auth.signInWithPassword`, etc.)
- [ ] **1.3** Create a middleware to protect routes (check session, redirect to /login)
- [ ] **1.4** Build the profile page (`/profile`) with a form that upserts into `public.profiles` (fields: full_name, birth_date, phone, preferences)
- [ ] **1.5** Add an admin flag: after creating your own account, manually set `role = 'admin'` in the Supabase table editor, then test that the admin dashboard is only accessible to you.

### PHASE 2 – Admin Dashboard & Campaigns

- [ ] **2.1** Create an admin layout that checks the user’s role (server component) and shows a sidebar
- [ ] **2.2** Build the `/admin/dashboard` page: display a table of all profiles (fetched with service role client, server‑side)
- [ ] **2.3** Build campaign creation form (`/admin/campaigns/new`): fields – name, type (birthday/reminder), subject, HTML body. Insert into `campaigns` table.
- [ ] **2.4** List existing campaigns on `/admin/campaigns` with toggle to activate/deactivate.

### PHASE 3 – Automated Birthday Messages (Edge Function + Cron)

- [ ] **3.1** Write the Supabase Edge Function `send-birthday-messages` (use the provided code below)
- [ ] **3.2** Deploy the function (via Supabase CLI or dashboard)
- [ ] **3.3** Set up a cron job in Supabase to call the function every day at 8 AM (`0 8 * * *`)
- [ ] **3.4** Test it by temporarily setting a user’s birth_date to today’s date and triggering manually.

### PHASE 4 – Manual Reminders / Ad‑Hoc Sending

- [ ] **4.1** Add checkboxes to the admin user list, a “Send Campaign” dropdown, and a submit button
- [ ] **4.2** Create a server action (or API route) that takes user IDs and a campaign ID, loops, and sends via Resend
- [ ] **4.3** Log each sent message in `message_logs`

### PHASE 5 – Polish & Brand

- [ ] **5.1** Apply Charis Belle’s brand colors, fonts, and logo (Tailwind config)
- [ ] **5.2** Add a simple landing page explaining the service
- [ ] **5.3** Add loading states, error toasts (shadcn Sonner)
- [ ] **5.4** Deploy to Vercel and connect custom domain

---

## 🔧 Edge Function: `send-birthday-messages`

Create a file `supabase/functions/send-birthday-messages/index.ts`:

```ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'https://esm.sh/resend'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)
const resend = new Resend(Deno.env.get('RESEND_API_KEY')!)

Deno.serve(async () => {
  try {
    const today = new Date()
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const day = today.getDate().toString().padStart(2, '0')
    const dateString = `${today.getFullYear()}-${month}-${day}`

    // Users with birthday today
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('id, full_name, email')
      .eq('birth_date', dateString)

    if (usersError) throw usersError
    if (!users?.length) return new Response('No birthdays today')

    // Active birthday campaign
    const { data: campaign, error: campError } = await supabase
      .from('campaigns')
      .select('*')
      .eq('type', 'birthday')
      .eq('is_active', true)
      .maybeSingle()

    if (campError || !campaign) {
      console.log('No active birthday campaign')
      return new Response('No active birthday campaign')
    }

    for (const user of users) {
      if (!user.email) continue
      const html = campaign.body_html.replaceAll('{{full_name}}', user.full_name)
      try {
        await resend.emails.send({
          from: 'Charis Belle <hello@yourdomain.com>',
          to: user.email,
          subject: campaign.subject,
          html,
        })
        await supabase.from('message_logs').insert({
          user_id: user.id,
          campaign_id: campaign.id,
          status: 'sent',
        })
      } catch (emailError) {
        console.error(`Failed to send to ${user.email}`, emailError)
        await supabase.from('message_logs').insert({
          user_id: user.id,
          campaign_id: campaign.id,
          status: 'failed',
        })
      }
    }

    return new Response(`Sent ${users.length} birthday emails`)
  } catch (err) {
    console.error(err)
    return new Response('Internal Server Error', { status: 500 })
  }
})
```

Deploy this function and set the cron schedule in your Supabase dashboard.

---

## 🎨 Quick Branding Notes (for your designer hat)
- Font: `Playfair Display` for headings, `Inter` for body.
- Primary color: `#D4A373` (warm honey), secondary: `#247245`, ascent: `#FAEDCD`.
- Logo: replace the default Next.js logo with Charis Belle’s logo in the layout.

---

## 📦 Deliverables to Client
- Live URL (Vercel)
- Admin credentials (set a strong password and notify Charis)
- A short Loom video showing how to add a campaign and how the birthday email is triggered
- Optional: email templates (birthday + “book your next appointment” reminder)

---

## 🤖 How to Use This with an AI Coding Assistant
1. Copy this entire README into your project root.
2. Open your AI assistant (ChatGPT, Cursor, Copilot) and say:
   > “I’m building this project according to the README. Please help me implement task 1.1: set up Supabase client helpers for Next.js.”
3. The assistant will understand the context, tech stack, and next steps without back‑and‑forth.

---

## ✅ Success Criteria
- [ ] User can sign up, log in, and fill out profile
- [ ] Admin can view all users, create a birthday campaign
- [ ] System sends birthday emails at 8 AM to users whose birthday is today
- [ ] Admin can manually send a reminder to selected users
- [ ] Mobile‑friendly design with Charis Belle’s branding

**Start building now — the foundation is ready.**
```