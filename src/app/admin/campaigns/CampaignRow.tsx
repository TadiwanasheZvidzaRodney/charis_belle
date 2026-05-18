'use client'

import { useTransition } from 'react'
import { toggleCampaignAction, deleteCampaignAction } from './actions'

type Campaign = {
  id: string
  name: string
  type: 'birthday' | 'reminder'
  channel?: 'email' | 'sms' | 'both'
  subject?: string | null
  body_html?: string | null
  sms_body?: string | null
  is_active: boolean
  created_at: string
}

const channelLabels = {
  email: '📧 Email',
  sms: '📱 SMS',
  both: '📧📱 Both',
}

export function CampaignRow({ campaign }: { campaign: Campaign }) {
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    startTransition(() => {
      toggleCampaignAction(campaign.id, campaign.is_active)
    })
  }

  const handleDelete = () => {
    if (!confirm(`Delete campaign "${campaign.name}"? This cannot be undone.`)) {
      return
    }
    startTransition(() => {
      deleteCampaignAction(campaign.id)
    })
  }

  const channel = campaign.channel || 'email'

  return (
    <div
      className={`rounded-xl border bg-white p-5 shadow-sm transition ${
        isPending ? 'opacity-60' : ''
      } ${campaign.is_active ? 'border-gray-200' : 'border-gray-100 bg-gray-50'}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-lg font-semibold text-gray-900">
              {campaign.name}
            </h3>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                campaign.type === 'birthday'
                  ? 'bg-pink-100 text-pink-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {campaign.type}
            </span>
            <span className="shrink-0 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
              {channelLabels[channel]}
            </span>
            {!campaign.is_active && (
              <span className="shrink-0 rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                Inactive
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-600">
            <span className="font-medium">Subject:</span> {campaign.subject}
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Created {new Date(campaign.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={handleToggle}
            disabled={isPending}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              campaign.is_active
                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {campaign.is_active ? 'Deactivate' : 'Activate'}
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Preview of content */}
      <div className="mt-4 space-y-2">
        {campaign.body_html && (
          <details>
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              📧 Preview email body
            </summary>
            <div
              className="mt-2 max-h-48 overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm"
              dangerouslySetInnerHTML={{ __html: campaign.body_html }}
            />
          </details>
        )}

        {campaign.sms_body && (
          <details>
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              📱 Preview SMS message
            </summary>
            <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
              {campaign.sms_body}
              <span className="mt-2 block text-xs text-gray-400">
                {campaign.sms_body.length} characters
              </span>
            </div>
          </details>
        )}
      </div>
    </div>
  )
}
