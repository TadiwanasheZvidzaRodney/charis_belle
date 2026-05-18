import { createAdminClient } from '@/lib/supabase/admin'
import { UserTableWithSend } from './UserTableWithSend'

export default async function AdminDashboardPage() {
  const supabase = createAdminClient()

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, full_name, email, phone, birth_date, role, created_at')
    .order('created_at', { ascending: false })

  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('id, name, type, is_active')
    .order('created_at', { ascending: false })

  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  const { count: totalCampaigns } = await supabase
    .from('campaigns')
    .select('*', { count: 'exact', head: true })

  const { count: messagesSent } = await supabase
    .from('message_logs')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'sent')

  return (
    <div>
      <h1 className="font-serif text-3xl text-gray-900">Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Overview of users, campaigns, and messages.
      </p>

      {/* Stats Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Users" value={totalUsers ?? 0} />
        <StatCard label="Campaigns" value={totalCampaigns ?? 0} />
        <StatCard label="Messages Sent" value={messagesSent ?? 0} />
      </div>

      {/* Users Table with Send Campaign */}
      <div className="mt-10">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">All Users</h2>

        {error ? (
          <p className="text-red-600">Failed to load users: {error.message}</p>
        ) : (
          <UserTableWithSend
            profiles={profiles ?? []}
            campaigns={campaigns ?? []}
          />
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
    </div>
  )
}
