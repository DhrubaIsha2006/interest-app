// frontend/pages/portfolio.js
import useSWR from 'swr'
import Layout from '@/components/Layout'
const fetcher = (url) => fetch(url).then(r => r.json())

export default function PortfolioPage() {
  const { data: summary } = useSWR('/api/summary', fetcher)
  const { data: profiles } = useSWR('/api/profiles', fetcher)
  const { data: transactions } = useSWR('/api/transactions', fetcher)

  // compute simple metrics
  const totalOutstanding = summary?.totalOutstanding ?? 0
  const totalProfiles = summary?.profilesCount ?? 0
  const totalTx = summary?.transactionsCount ?? 0

  // compute a very simple 'collection ratio': (paid / payable) * 100
  let collected = 0
  let payable = 0
  if (transactions) {
    for (const t of transactions) {
      payable += (t.totalPayable || 0)
      const paid = (t.payments || []).reduce((s, p) => s + (p.amount || 0), 0)
      collected += paid
    }
  }
  const collectionRatio = payable ? Math.round((collected / payable) * 100) : 100

  // top performers by outstanding ascending (lower outstanding = better)
  const top = (profiles || []).map(p => {
    const pTx = (transactions || []).filter(t => (t.profileId && (t.profileId._id || t.profileId) ) === p._id || (typeof t.profileId === 'string' && t.profileId === p._id))
    const outstanding = pTx.reduce((s, t) => s + Math.max(0,(t.totalPayable||0) - (t.payments || []).reduce((s2,p2)=>s2+(p2.amount||0),0)), 0)
    return { profile: p, outstanding }
  }).sort((a,b)=>a.outstanding - b.outstanding).slice(0,6)

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-5 py-8">
        <h1 className="text-2xl font-semibold mb-4">Investor Portfolio</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-gray-500">Total Capital Deployed</div>
                <div className="text-2xl font-bold">₹ {Number(totalOutstanding).toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Profiles</div>
                <div className="font-semibold">{totalProfiles}</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm text-gray-500 mb-2">Collection Ratio</div>
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div style={{ width: `${collectionRatio}%` }} className="h-4 rounded-full bg-purple-600" />
              </div>
              <div className="text-xs mt-2 text-gray-500">{collectionRatio}% collected</div>
            </div>
          </div>

          <aside className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-2">Quick Stats</div>
            <div className="text-lg font-semibold">Tx: {totalTx}</div>
            <div className="text-lg font-semibold mt-2">Outstanding: ₹ {totalOutstanding.toLocaleString()}</div>
          </aside>
        </div>

        <section className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-medium mb-4">Top Performing Accounts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {top.map(t => (
              <div key={t.profile._id} className="p-4 rounded-xl border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium">
                      { (t.profile.name || 'U')[0] }
                    </div>
                    <div>
                      <div className="font-medium">{t.profile.name}</div>
                      <div className="text-sm text-gray-500">Net outstanding: ₹ {t.outstanding}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Status</div>
                    <div className="mt-1 text-sm font-semibold text-green-600">On-time</div>
                  </div>
                </div>
              </div>
            ))}
            {top.length === 0 && <div className="text-gray-500">No accounts yet.</div>}
          </div>
        </section>
      </div>
    </Layout>
  )
}
