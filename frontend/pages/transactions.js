// frontend/pages/transactions.js
import useSWR from 'swr'
import Card from '../components/Card'
import Link from 'next/link'

const fetcher = (url) => fetch(url).then(r => r.json())

export default function TransactionsPage(){
  const { data } = useSWR('/api/transactions', fetcher)
  if(!data) return <div className="card">Loading…</div>

  const rows = data.map(tx=>{
    const paid = (tx.payments||[]).reduce((s,p)=>s+(p.amount||0),0)
    const outstanding = Math.max(0,(tx.totalPayable||0)-paid)
    return {...tx, paid, outstanding}
  }).sort((a,b)=>b.outstanding - a.outstanding)

  const downloadCSV = (onlyOutstanding=false) => {
    const params = new URLSearchParams()
    if (onlyOutstanding) params.set('outstanding','true')
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/transactions/export?${params.toString()}`
    window.open(url, '_blank')
  }

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <h1 className="title-xl">Transactions</h1>
          <div className="subtle">All transactions — sorted by outstanding</div>
        </div>

        <div style={{display:'flex', gap:8}}>
          <button className="button" onClick={()=>downloadCSV(false)}>Export all</button>
          <button className="button" onClick={()=>downloadCSV(true)}>Export outstanding</button>
        </div>
      </div>

      <div className="mt-6">
        <Card>
          <div style={{display:'flex', flexDirection:'column', gap:10}}>
            {rows.map(r => (
              <div key={r._id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderBottom:'1px solid #f4f5f7'}}>
                <div>
                  <div style={{fontWeight:700}}>₹{r.amount} — {r.interestType} ({r.interestRate}%)</div>
                  <div className="small-muted">{r.profileId?.name || ''}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontWeight:700}}>₹{Math.round(r.outstanding)}</div>
                  <Link href={`/profile/${r.profileId?._id}`} legacyBehavior><a style={{color:'var(--brand)', fontWeight:600}}>View</a></Link>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
