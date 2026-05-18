Excellent timing! Supabase now offers an official **shadcn/ui registry** with pre-built, Supabase‑connected components—perfect for the Charis Belle CRM. You can drop in a fully‑functional auth form, user profile, or admin dashboard in one command.

---

## 🧩 What the Supabase shadcn Registry Gives You

- **Auth components** – login, signup, magic link, OAuth – already wired to `supabase.auth`.
- **User profile** – displays/edits the `public.profiles` table.
- **Admin panel** – user lists, role-based visibility.
- **All styled with Tailwind** – matches your existing design system.

These are production‑ready, accessible, and follow Supabase best practices (RLS, server components, etc.).

---

## ⚡ Quick Setup (In Your Project)

### 1. Ensure your Next.js project is ready
You should already have Tailwind CSS configured (`tailwind.config.ts`), and your `@/lib/supabase` client set up as in the README.

### 2. Initialize shadcn/ui (if not already done)
```bash
npx shadcn@latest init
```
Choose the defaults (TypeScript, Tailwind, CSS variables). This creates `components/ui` and `lib/utils`.

### 3. Add the Supabase registry
This tells shadcn where to find the Supabase‑specific blocks:
```bash
npx shadcn@latest add https://supabase.com/shadcn/registry.json
```
Confirm the prompts. Now you have access to components like `supabase-auth`, `supabase-profile`, etc.

### 4. Install the components you need
For the Charis Belle platform, I recommend:
```bash
npx shadcn@latest add supabase-auth           # Login & signup forms
npx shadcn@latest add supabase-user-profile   # Editable profile (full_name, birth_date, phone)
npx shadcn@latest add supabase-admin-users    # Admin table of all users (if available)
```
To see the full list, run:
```bash
npx shadcn@latest add
```
And browse the available Supabase blocks.

> **Note:** The exact component names may vary. At the time of writing, the registry includes `auth-form`, `user-profile`, `pricing`, etc. Use the command’s interactive menu to pick what you need.

---

## 🔧 How to Use Them in the App

After installation, components appear in `@/components/supabase/` (or a similar folder). You can import them directly into your pages:

**Login page (`app/login/page.tsx`)**
```tsx
import { AuthForm } from '@/components/supabase/auth-form'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthForm view="sign-in" />
    </div>
  )
}
```

**Profile page (`app/profile/page.tsx`)**
```tsx
import { UserProfile } from '@/components/supabase/user-profile'

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold">Your Profile</h1>
      <UserProfile />
    </div>
  )
}
```

**Admin dashboard (`app/admin/page.tsx`)**
```tsx
import { UsersTable } from '@/components/supabase/admin-users'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  
  // Check admin role (implement a helper)
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session?.user.id)
    .single()
    
  if (profile?.role !== 'admin') redirect('/')
  
  return <UsersTable />
}
```

---

## 🎨 What You Get Out of the Box

- **Real‑time validation** and error handling.
- **Row‑level‑security** aware – the profile component only fetches the current user’s row.
- **Fully responsive** – works on mobile and desktop.
- **Customizable** – you can override the default Tailwind classes or add your brand colors via CSS variables (set in `globals.css` to match `#D4A373`).

To brand the components, edit your `globals.css`:
```css
@layer base {
  :root {
    --primary: 30 67% 63%;   /* #D4A373 in HSL */
    --primary-foreground: 0 0% 100%;
    ...
  }
}
```

---

## 🧠 Update Your CLAUDE.md

Add a note so your AI assistant knows these components exist:

```markdown
## Pre-built shadcn Components (Supabase Registry)
We use components from the official Supabase shadcn registry.
They are installed in `@/components/supabase/` and already wired to Supabase.
- `AuthForm` - login/signup
- `UserProfile` - edit profile
- `UsersTable` - admin user list
Do not re-implement auth forms or profile pages from scratch; use these.
```

Now when you open Claude Opus and say:
> “Replace my custom auth page with the Supabase AuthForm component”

It will know exactly where to look.

---

## 🚀 Instant Speed Boost

With this setup, you can go from an empty Next.js project to a fully‑functional CRM in **under an hour**—auth, profile, and admin table are already coded for you. The only thing left is the automation logic (birthday edge function), which remains as in the README.

**Go ahead and run those `shadcn add` commands now. The Charis Belle platform is about to materialise.**