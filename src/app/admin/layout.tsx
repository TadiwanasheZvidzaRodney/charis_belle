import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import { getCurrentUserProfile } from '@/lib/auth'
import { logoutAction } from '@/app/profile/actions'

export const metadata = {
  title: 'Admin · Charis Belle',
}

const navLinks = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/campaigns', label: 'Campaigns' },
]

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const profile = await getCurrentUserProfile()

  // Not logged in → login
  if (!profile) redirect('/login?redirectTo=/admin/dashboard')

  // Logged in but not admin → access denied
  if (profile.role !== 'admin') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAEDCD] px-4 text-center">
        <Image
          src="/CharisBelleLogo.webp"
          alt="Charis Belle"
          width={80}
          height={80}
          className="mb-6 rounded-full shadow-md"
        />
        <h1 className="font-serif text-3xl text-gray-900">Access Denied</h1>
        <p className="mt-2 max-w-sm text-gray-600">
          This area is restricted to administrators. If you believe you should
          have access, please contact support.
        </p>
        <Link
          href="/profile"
          className="mt-6 rounded-lg bg-[#247245] px-5 py-2.5 font-medium text-white shadow transition hover:bg-[#1b5c36]"
        >
          Go to your profile
        </Link>
      </div>
    )
  }

  // Admin OK → render layout
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center gap-2 border-b border-gray-100 px-4">
          <Image
            src="/CharisBelleLogo.webp"
            alt="Charis Belle"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-serif text-lg text-[#247245]">Admin</span>
        </div>

        <nav className="flex flex-col gap-1 p-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-[#FAEDCD]/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-gray-100 p-3">
          <p className="mb-2 truncate text-xs text-gray-500">{profile.email}</p>
          <Link
            href="/profile"
            className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Your profile
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="mt-1 w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              Log out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-[#FAEDCD]/30 p-8">{children}</main>
    </div>
  )
}
