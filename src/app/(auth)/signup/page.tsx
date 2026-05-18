'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { signupAction, type AuthState } from '../actions'
import { SubmitButton } from '@/components/SubmitButton'

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#D4A373] focus:outline-none focus:ring-2 focus:ring-[#D4A373]/40'

export default function SignupPage() {
  const [state, formAction] = useActionState<AuthState, FormData>(
    signupAction,
    null
  )

  return (
    <div>
      <h1 className="mb-1 font-serif text-2xl text-gray-900">Create your account</h1>
      <p className="mb-6 text-sm text-gray-600">
        Join Charis Belle to receive birthday treats and reminders.
      </p>

      <form action={formAction} className="space-y-4">
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
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="At least 8 characters"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="confirm" className="mb-1 block text-sm font-medium text-gray-700">
            Confirm password
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="Re-enter password"
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

        {state?.message && (
          <p
            role="status"
            className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-800 ring-1 ring-green-200"
          >
            {state.message}
          </p>
        )}

        <SubmitButton pendingText="Creating account…">Sign up</SubmitButton>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-[#247245] hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}
