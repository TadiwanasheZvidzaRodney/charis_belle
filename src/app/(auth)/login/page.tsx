'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useActionState, Suspense } from 'react'
import { loginAction, type AuthState } from '../actions'
import { SubmitButton } from '@/components/SubmitButton'

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#D4A373] focus:outline-none focus:ring-2 focus:ring-[#D4A373]/40'

function LoginForm() {
  const [state, formAction] = useActionState<AuthState, FormData>(
    loginAction,
    null
  )
  const redirectTo = useSearchParams().get('redirectTo') ?? ''

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          className={inputClass}
        />
      </div>

      {state?.error && (
        <p
          role="alert"
          className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200"
        >
          {state.error}
        </p>
      )}

      <SubmitButton pendingText="Logging in…">Log in</SubmitButton>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div>
      <h1 className="mb-1 font-serif text-2xl text-gray-900">Welcome back</h1>
      <p className="mb-6 text-sm text-gray-600">
        Log in to manage your profile and preferences.
      </p>

      <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100 rounded-lg" />}>
        <LoginForm />
      </Suspense>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="font-medium text-[#247245] hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}
