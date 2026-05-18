import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'

type Props = {
  params: Promise<{ id: string }>
}

const channelLabels: Record<string, string> = {
  email: '📧 Email only',
  sms: '📱 SMS only',
  both: '📧📱 Email & SMS',
}

export default async function CampaignDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = createAdminClient()

  const { data: campaign, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error || !campaign) {
    notFound()
  }

  const channel = (campaign as { channel?: string }).channel || 'email'

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/campaigns"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
      >
        ← Back to campaigns
      </Link>

      <h1 className="mt-4 font-serif text-3xl text-gray-900">{campaign.name}</h1>

      <div className="mt-6 space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="font-medium capitalize text-gray-900">{campaign.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Channel</p>
            <p className="font-medium text-gray-900">{channelLabels[channel]}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status</p>
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
              campaign.is_active
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {campaign.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Email Content */}
        {(channel === 'email' || channel === 'both') && campaign.subject && (
          <>
            <div>
              <p className="text-sm text-gray-500">Email Subject</p>
              <p className="font-medium text-gray-900">{campaign.subject}</p>
            </div>
            <div>
              <p className="mb-2 text-sm text-gray-500">📧 Email Body</p>
              <div
                className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm"
                dangerouslySetInnerHTML={{ __html: campaign.body_html || '' }}
              />
            </div>
          </>
        )}

        {/* SMS Content */}
        {(channel === 'sms' || channel === 'both') && (campaign as { sms_body?: string }).sms_body && (
          <div>
            <p className="mb-2 text-sm text-gray-500">📱 SMS Message</p>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
              {(campaign as { sms_body?: string }).sms_body}
              <span className="mt-2 block text-xs text-gray-400">
                {((campaign as { sms_body?: string }).sms_body || '').length} characters
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
