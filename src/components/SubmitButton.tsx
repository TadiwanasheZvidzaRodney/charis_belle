'use client'

import { useFormStatus } from 'react-dom'

type Props = {
  children: React.ReactNode
  pendingText?: string
}

/**
 * Submit button that reads the parent <form>'s pending state automatically.
 * Used by the login & signup forms.
 */
export function SubmitButton({ children, pendingText = 'Please wait…' }: Props) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-[#D4A373] py-2.5 px-4 font-medium text-white shadow-sm transition hover:bg-[#c08f5e] focus:outline-none focus:ring-2 focus:ring-[#247245] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? pendingText : children}
    </button>
  )
}
