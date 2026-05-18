'use client'

import { useActionState } from 'react'
import { sendCampaignAction, type SendCampaignState } from './actions'
import { SubmitButton } from '@/components/SubmitButton'

type Profile = {
  id: string
  full_name: string | null
  email: string | null
  phone: string | null
  birth_date: string | null
  role: string
  created_at: string
}

type Campaign = {
  id: string
  name: string
  type: string
  is_active: boolean
}

type Props = {
  profiles: Profile[]
  campaigns: Campaign[]
}

export function UserTableWithSend({ profiles, campaigns }: Props) {
  const [state, formAction] = useActionState<SendCampaignState, FormData>(
    sendCampaignAction,
    null
  )

  const activeCampaigns = campaigns.filter((c) => c.is_active)

  return (
    <form action={formAction}>
      {/* Action Bar */}
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
        <label htmlFor="campaignId" className="text-sm font-medium text-gray-700">
          Send Campaign:
        </label>
        <select
          id="campaignId"
          name="campaignId"
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#D4A373] focus:outline-none focus:ring-2 focus:ring-[#D4A373]/40"
        >
          <option value="">Select a campaign…</option>
          {activeCampaigns.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.type})
            </option>
          ))}
        </select>
        <SubmitButton pendingText="Sending…">Send to Selected</SubmitButton>

        {state?.error && (
          <p className="w-full text-sm text-red-600 sm:w-auto">{state.error}</p>
        )}
        {state?.success && (
          <p className="w-full text-sm text-green-600 sm:w-auto">{state.success}</p>
        )}
      </div>

      {/* Users Table */}
      {!profiles.length ? (
        <p className="text-gray-500">No users yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const checkboxes = document.querySelectorAll<HTMLInputElement>(
                        'input[name="userIds"]'
                      )
                      checkboxes.forEach((cb) => (cb.checked = e.target.checked))
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-[#D4A373] focus:ring-[#D4A373]"
                    aria-label="Select all users"
                  />
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Email</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Phone</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Birthday</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Role</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {profiles.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      name="userIds"
                      value={p.id}
                      disabled={!p.email}
                      className="h-4 w-4 rounded border-gray-300 text-[#D4A373] focus:ring-[#D4A373] disabled:opacity-40"
                      aria-label={`Select ${p.full_name || p.email}`}
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-900">
                    {p.full_name || <span className="text-gray-400">—</span>}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                    {p.email || <span className="text-gray-400">No email</span>}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                    {p.phone || <span className="text-gray-400">—</span>}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                    {p.birth_date || <span className="text-gray-400">—</span>}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        p.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {p.role}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                    {new Date(p.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </form>
  )
}
