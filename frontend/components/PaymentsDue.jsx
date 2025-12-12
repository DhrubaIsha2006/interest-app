// frontend/components/PaymentsDue.jsx
import useSWR from 'swr'
import Link from 'next/link'
import { useMemo } from 'react'

const fetcher = (url) => fetch(url).then(r => r.json())

export default function PaymentsDue() {
  // fetch transactions and profiles
  const { data: profiles } = useSWR('/api/profiles', fetcher)
  const { data: transactions } = useSWR('/api/transactions', fetcher)

  // Build per-profile outstanding summary
  const summary = useMemo(() => {
    if (!profiles || !transactions) return []
    const map = {}
    for (const p of profiles) map[p._id] = { profile: p, outstanding: 0, soonestDays: null, latestTx: null }
    for (const t of transactions) {
      const pid = t.profileId && t.profileId._id ? t.profileId._id : (typeof t.profileId === 'string' ? t.profileId : null)
      if (!pid) continue
      const paid = (t.payments || []).reduce((s, p) => s + (p.amount || 0), 0)
      const outstanding = Math.max(0, (t.totalPayable || 0) - paid)
      if (!map[pid]) map[pid] = { profile: { _id: pid, name: (t.profileId && t.profileId.name) || 'Unknown' }, outstanding: 0, soonestDays: null, latestTx: null }
      map[pid].outstanding = (map[pid].outstanding || 0) + outstanding
      // compute days till startDate (approx)
      const sd = t.startDate ? new Date(t.startDate) : null
      if (sd) {
        const days = Math.ceil((sd - new Date()) / (1000 * 60 * 60 * 24))
        if (map[pid].soonestDays === null || (typeof days === 'number' && days < map[pid].soonestDays)) map[pid].soonestDays = days
      }
    }
    // convert to array and sort by soonestDays
    return Object.values(map).sort((a,b) => (a.soonestDays ?? 999) - (b.soonestDays ?? 999))
  }, [profiles, transactions])

  if (!profiles || !transactions) {
    return <div className="py-6 text-gray-500">Loading payments…</div>
  }

  return (
    <section className="my-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Payments Due</h3>
        <div className="text-sm text-gray-400">Upcoming</div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {summary.map(item => {
          const name = item.profile?.name || 'Unknown'
          const initial = (name || 'U')[0].toUpperCase()
          const shortAmount = Math.round(item.outstanding || 0)
          const days = item.soonestDays
          const badge = typeof days === 'number' ? `${Math.max(0, days)} days left` : 'No date'
          return (
            <Link key={item.profile._id} href={`/profile/${item.profile._id}`} legacyBehavior>
              <a className="min-w-[220px] bg-white rounded-2xl p-4 shadow-sm hover:shadow-md inline-block">
                <div className="text-xs text-red-500 font-semibold">{badge}</div>
                <div className="flex items-center gap-3 mt-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-medium">
                    {initial}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{name}</div>
                    <div className="text-sm text-gray-500">₹ {shortAmount.toLocaleString()}</div>
                  </div>
                </div>
              </a>
            </Link>
          )
        })}

        {/* Add transaction card */}
        <div className="min-w-[220px] inline-block">
          <Link href="/transaction/new" legacyBehavior>
            <a className="w-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-md flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-2xl text-gray-400">
                +
              </div>
              <div className="text-sm text-gray-600">Add Transaction</div>
            </a>
          </Link>
        </div>
      </div>
    </section>
  )
}
