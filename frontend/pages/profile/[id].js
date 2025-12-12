// frontend/pages/profile/[id].js
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Link from 'next/link'
import Head from 'next/head'

const fetcher = (u) => fetch(u).then(r => r.json())

export default function ProfileDetail() {
  const router = useRouter()
  const { id } = router.query

  // profile list (to get name) and transactions for this profile
  const { data: profiles } = useSWR('/api/profiles', fetcher)
  const { data: transactions, error: txError } = useSWR(id ? `/api/transactions?profileId=${id}` : null, fetcher)

  const profile = profiles?.find(p => p._id === id)

  if (!profiles || (id && !transactions && !txError)) return <div style={{ padding: 24 }}>Loading…</div>
  if (!id) return null

  return (
    <>
      <Head><title>{profile?.name ?? 'Profile'} — Interest App</title></Head>
      <div style={{ maxWidth: 900, margin: '24px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <h2 style={{ margin: 0 }}>{profile?.name ?? 'Profile'}</h2>
            <p style={{ color: '#6b7280', marginTop: 6 }}>{profile?.phone ?? ''}</p>
          </div>
          <Link href="/profiles" style={{ color: '#6b7280' }}>← Back</Link>
        </div>

        <section style={{ background: '#fff', padding: 16, borderRadius: 12, boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}>
          <h3 style={{ marginTop: 0 }}>Transactions</h3>
          {transactions && transactions.length === 0 && <div style={{ color: '#6b7280' }}>No transactions yet.</div>}
          <div style={{ display: 'grid', gap: 12 }}>
            {transactions && transactions.map(tx => {
              const paid = (tx.payments || []).reduce((s, p) => s + (p.amount || 0), 0)
              const outstanding = Math.max(0, (tx.totalPayable || 0) - paid)
              return (
                <div key={tx._id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: 12, borderRadius: 10, border: '1px solid #eef2f7'
                }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>₹{tx.amount} • {tx.interestType}</div>
                    <div style={{ color: '#6b7280', fontSize: 13 }}>{tx.startDate ? new Date(tx.startDate).toLocaleString() : '-'}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700 }}>Outstanding ₹{Math.round(outstanding)}</div>
                    <div style={{ color: outstanding === 0 ? '#10b981' : '#ef4444' }}>{outstanding === 0 ? 'Paid' : 'Due'}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </>
  )
}
