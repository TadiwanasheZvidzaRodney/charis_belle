import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProfileForm } from './ProfileForm'
import { logoutAction } from './actions'

export const metadata = {
  title: 'Your profile · Charis Belle',
}

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Defence in depth — middleware should have already redirected, but just in case.
  if (!user) redirect('/login?redirectTo=/profile')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, birth_date, phone, preferences, role')
    .eq('id', user.id)
    .maybeSingle()

  const isAdmin = profile?.role === 'admin'

  return (
    <div className="min-h-screen bg-[#FAEDCD]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/CharisBelleLogo.webp"
              alt="Charis Belle"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="font-serif text-lg text-[#247245]">Charis Belle</span>
          </Link>

          <div className="flex items-center gap-3 text-sm">
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="font-medium text-[#247245] hover:underline"
              >
                Admin
              </Link>
            )}
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-md px-3 py-1.5 text-gray-700 ring-1 ring-gray-300 transition hover:bg-gray-50"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5">
          <h1 className="font-serif text-3xl text-gray-900">Your profile</h1>
          <p className="mt-1 text-sm text-gray-600">
            Signed in as <span className="font-medium">{user.email}</span>
          </p>

          <hr className="my-6 border-gray-200" />

          <ProfileForm
            profile={{
              full_name: profile?.full_name ?? null,
              birth_date: profile?.birth_date ?? null,
              phone: profile?.phone ?? null,
              preferences:
                (profile?.preferences as {
                  channel?: string
                  marketing_opt_in?: boolean
                } | null) ?? null,
            }}
          />
        </div>
      </main>
    </div>
  )
}
