'use client'

import Link from 'next/link'
import { useActionState, useState } from 'react'
import { createCampaignAction, type CampaignState } from '../actions'
import { SubmitButton } from '@/components/SubmitButton'

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#D4A373] focus:outline-none focus:ring-2 focus:ring-[#D4A373]/40'

export default function NewCampaignPage() {
  const [state, formAction] = useActionState<CampaignState, FormData>(
    createCampaignAction,
    null
  )
  const [channel, setChannel] = useState('email')

  const showEmail = channel === 'email' || channel === 'both'
  const showSMS = channel === 'sms' || channel === 'both'

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/campaigns"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
      >
        ← Back to campaigns
      </Link>

      <h1 className="mt-4 font-serif text-3xl text-gray-900">New Campaign</h1>
      <p className="mt-1 text-gray-600">
        Create a birthday or reminder campaign (email, SMS, or both).
      </p>

      <form action={formAction} className="mt-8 space-y-6">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
            Campaign name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="e.g. Birthday 2026"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="type" className="mb-1 block text-sm font-medium text-gray-700">
              Type
            </label>
            <select id="type" name="type" required className={inputClass}>
              <option value="birthday">Birthday</option>
              <option value="reminder">Reminder</option>
            </select>
          </div>

          <div>
            <label htmlFor="channel" className="mb-1 block text-sm font-medium text-gray-700">
              Channel
            </label>
            <select 
              id="channel" 
              name="channel" 
              required 
              className={inputClass}
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
            >
              <option value="email">📧 Email only</option>
              <option value="sms">📱 SMS only</option>
              <option value="both">📧📱 Both</option>
            </select>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          Birthday campaigns are sent automatically at 8 AM on user birthdays.
        </p>

        {/* Email Fields */}
        {showEmail && (
          <fieldset className="space-y-4 rounded-lg border border-gray-200 p-4">
            <legend className="px-2 text-sm font-medium text-gray-700">📧 Email Content</legend>
            
            <div>
              <label htmlFor="subject" className="mb-1 block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required={showEmail}
                placeholder="e.g. 🎂 Happy Birthday from Charis Belle!"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="body_html" className="mb-1 block text-sm font-medium text-gray-700">
                Body (HTML)
              </label>
              <textarea
                id="body_html"
                name="body_html"
                required={showEmail}
                rows={8}
                placeholder={`<h1>Happy Birthday, {{full_name}}!</h1>\n<p>Wishing you a wonderful day filled with joy...</p>`}
                className={inputClass + ' font-mono'}
              />
              <p className="mt-1 text-xs text-gray-500">
                Use <code className="rounded bg-gray-100 px-1">{'{{full_name}}'}</code> to insert the recipient's name.
              </p>
            </div>
          </fieldset>
        )}

        {/* SMS Fields */}
        {showSMS && (
          <fieldset className="space-y-4 rounded-lg border border-gray-200 p-4">
            <legend className="px-2 text-sm font-medium text-gray-700">📱 SMS Content</legend>
            
            <div>
              <label htmlFor="sms_body" className="mb-1 block text-sm font-medium text-gray-700">
                Message (max 160 chars recommended)
              </label>
              <textarea
                id="sms_body"
                name="sms_body"
                required={showSMS}
                rows={3}
                maxLength={320}
                placeholder="🎂 Happy Birthday {{full_name}}! Enjoy 20% off your next visit at Charis Belle. Book: yoursite.com/book"
                className={inputClass}
              />
              <p className="mt-1 text-xs text-gray-500">
                Keep it short! SMS messages over 160 characters may be split into multiple messages.
              </p>
            </div>
          </fieldset>
        )}

        {state?.error && (
          <p
            role="alert"
            className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200"
          >
            {state.error}
          </p>
        )}

        <div className="flex items-center gap-3">
          <SubmitButton pendingText="Creating…">Create Campaign</SubmitButton>
          <Link
            href="/admin/campaigns"
            className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
