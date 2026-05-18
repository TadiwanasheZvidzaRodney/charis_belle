import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { CampaignRow } from './CampaignRow'

export default async function CampaignsPage() {
  const supabase = createAdminClient()

  const { data: campaigns, error } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-gray-900">Campaigns</h1>
          <p className="mt-1 text-gray-600">
            Manage birthday and reminder email campaigns.
          </p>
        </div>
        <Link
          href="/admin/campaigns/new"
          className="rounded-lg bg-[#247245] px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-[#1b5c36]"
        >
          + New Campaign
        </Link>
      </div>

      <div className="mt-8">
        {error ? (
          <p className="text-red-600">Failed to load campaigns: {error.message}</p>
        ) : !campaigns?.length ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
            <p className="text-gray-500">No campaigns yet.</p>
            <Link
              href="/admin/campaigns/new"
              className="mt-3 inline-block text-sm font-medium text-[#247245] hover:underline"
            >
              Create your first campaign →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <CampaignRow key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
