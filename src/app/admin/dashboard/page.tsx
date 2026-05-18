import { createAdminClient } from '@/lib/supabase/admin'

export default async function AdminDashboardPage() {
  const supabase = createAdminClient()

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, full_name, email, phone, birth_date, role, created_at')
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

      {/* Users Table */}
      <div className="mt-10">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">All Users</h2>

        {error ? (
          <p className="text-red-600">Failed to load users: {error.message}</p>
        ) : !profiles?.length ? (
          <p className="text-gray-500">No users yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
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
                    <td className="whitespace-nowrap px-4 py-3 text-gray-900">
                      {p.full_name || <span className="text-gray-400">—</span>}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">{p.email}</td>
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
