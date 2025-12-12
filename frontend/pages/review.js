// frontend/pages/review.js
import Head from 'next/head'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'

export default function Review(){
  const router = useRouter()
  const [draft, setDraft] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(()=> {
    const d = sessionStorage.getItem('txDraft')
    if (d) setDraft(JSON.parse(d))
  }, [])

  if (!draft) return (
    <>
      <Head><title>Review</title></Head>
      <div className="p-6">No draft. <a href="/payment" className="text-purple-700">Create</a></div>
    </>
  )

  // compute totals
  const compute = () => {
    const amount = Number(draft.amount || 0)
    const rate = Number(draft.interestRate || 0)/100
    const periods = Number(draft.periodCount || 0)
    if (draft.interestType === 'Simple') {
      const monthlyRate = draft.frequency === 'Monthly' ? rate/12 : rate
      const totalInterest = amount * monthlyRate * periods
      const totalPayable = amount + totalInterest
      return { totalInterest: totalInterest.toFixed(2), totalPayable: totalPayable.toFixed(2) }
    } else {
      const r = draft.frequency === 'Monthly' ? rate/12 : rate
      const totalPayable = amount * Math.pow(1 + r, periods)
      return { totalInterest: (totalPayable - amount).toFixed(2), totalPayable: totalPayable.toFixed(2) }
    }
  }

  const totals = compute()

  const confirm = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/api/transactions`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft)
      })
      if (!res.ok) throw new Error('Save failed')
      const data = await res.json()
      // clear draft
      sessionStorage.removeItem('txDraft')
      // notify global
      window.dispatchEvent(new Event('tx:created'))
      router.push(`/profile/${data.profileId || data._id}`)
    } catch (err) {
      alert('Could not save: ' + err.message)
    } finally { setLoading(false) }
  }

  return (
    <>
      <Head><title>Review Transaction</title></Head>
      <div className="min-h-screen bg-[#F0F1F7]">
        <div className="max-w-2xl mx-auto px-4 pt-6 pb-28">
          <Header />
          <div className="bg-white p-6 rounded-2xl shadow-card mt-6">
            <h3 className="font-semibold">Review & Confirm</h3>
            <div className="mt-4 space-y-2">
              <div><strong>Profile:</strong> {draft.profileName}</div>
              <div><strong>Amount:</strong> ₹ {Number(draft.amount).toLocaleString()}</div>
              <div><strong>Interest Type:</strong> {draft.interestType} — {draft.interestRate}%</div>
              <div><strong>Duration:</strong> {draft.periodCount} {draft.frequency}</div>
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <div>Total Interest: ₹ {totals.totalInterest}</div>
                <div className="font-semibold">Total Payable: ₹ {totals.totalPayable}</div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={confirm} disabled={loading} className="px-4 py-2 bg-[#5B5FC7] text-white rounded-md">{loading ? 'Saving…' : 'Confirm & Save'}</button>
              <a href="/payment" className="px-4 py-2 border rounded-md">Edit</a>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </>
  )
}
