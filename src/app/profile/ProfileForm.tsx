'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { updateProfileAction, type ProfileState } from './actions'
import { SubmitButton } from '@/components/SubmitButton'

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#D4A373] focus:outline-none focus:ring-2 focus:ring-[#D4A373]/40'

type Profile = {
  full_name: string | null
  birth_date: string | null
  phone: string | null
  role?: string | null
  preferences: { channel?: string; marketing_opt_in?: boolean } | null
}

export function ProfileForm({ profile }: { profile: Profile }) {
  const router = useRouter()
  const [state, formAction] = useActionState<ProfileState, FormData>(
    updateProfileAction,
    null
  )

  // Show toast notifications and redirect on success
  useEffect(() => {
    if (state?.success) {
      toast.success(state.success)
      // Redirect after a short delay
      setTimeout(() => {
        if (profile.role === 'admin') {
          router.push('/admin/dashboard')
        } else {
          router.push('/')
        }
      }, 1000)
    }
    if (state?.error) {
      toast.error(state.error)
    }
  }, [state, router, profile.role])

  const channel = profile.preferences?.channel ?? 'email'
  const marketingOptIn = profile.preferences?.marketing_opt_in ?? true

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="full_name" className="mb-1 block text-sm font-medium text-gray-700">
          Full name
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          autoComplete="name"
          defaultValue={profile.full_name ?? ''}
          placeholder="Jane Doe"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="birth_date" className="mb-1 block text-sm font-medium text-gray-700">
            Birth date
          </label>
          <input
            id="birth_date"
            name="birth_date"
            type="date"
            defaultValue={profile.birth_date ?? ''}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-gray-500">
            Used to send you a little something on your birthday 🎂
          </p>
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={profile.phone ?? ''}
            placeholder="+263 77 123 4567"
            className={inputClass}
          />
        </div>
      </div>

      <fieldset className="rounded-lg border border-gray-200 p-4">
        <legend className="px-2 text-sm font-medium text-gray-700">
          Preferences
        </legend>

        <div className="space-y-3">
          <div>
            <label htmlFor="channel" className="mb-1 block text-sm text-gray-700">
              Preferred contact channel
            </label>
            <select
              id="channel"
              name="channel"
              defaultValue={channel}
              className={inputClass}
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>

          <label className="flex items-start gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="marketing_opt_in"
              defaultChecked={marketingOptIn}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#D4A373] focus:ring-[#D4A373]"
            />
            <span>
              Send me birthday treats, reminders and occasional offers from
              Charis Belle.
            </span>
          </label>
        </div>
      </fieldset>

      {state?.error && (
        <p
          role="alert"
          className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200"
        >
          {state.error}
        </p>
      )}
      {state?.success && (
        <p
          role="status"
          className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-800 ring-1 ring-green-200"
        >
          {state.success}
        </p>
      )}

      <SubmitButton pendingText="Saving…">Save profile</SubmitButton>
    </form>
  )
}
