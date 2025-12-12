// frontend/components/TransactionForm.jsx
import { useState } from 'react'

export default function TransactionForm({ onSaved }){
  const [form, setForm] = useState({
    profileName: '',
    amount: '',
    interestRate: '12',
    interestType: 'Simple',
    frequency: 'Monthly',
    periodCount: '12',
    startDate: ''
  })
  const [msg, setMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setMsg(null)

    if (!form.profileName || !form.amount || Number(form.amount) <= 0) {
      setMsg({ type: 'error', text: 'Please enter profile name and a valid amount.' })
      return
    }

    setLoading(true)
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'

      const payload = {
        profileName: String(form.profileName).trim(),
        amount: Number(form.amount),
        interestRate: Number(form.interestRate),
        interestType: form.interestType,
        frequency: form.frequency,
        periodCount: Number(form.periodCount),
        startDate: form.startDate ? new Date(form.startDate).toISOString() : null
      }

      const res = await fetch(`${BACKEND}/api/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      let data = null
      try { data = await res.json() } catch (e) { data = { message: res.statusText || 'Unknown' } }

      if (!res.ok) {
        setMsg({ type: 'error', text: data.message || 'Save failed' })
      } else {
        setMsg({ type: 'success', text: 'Transaction saved ✔️' })
        setForm(f => ({ ...f, amount: '', profileName: '' }))
        // SWR listeners
        try { window.dispatchEvent(new Event('tx:created')) } catch(e){/*noop*/}
        if (typeof onSaved === 'function') onSaved(data)
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Network error — could not reach the backend' })
      console.error('TransactionForm submit error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4" aria-busy={loading}>
      <input name="profileName" value={form.profileName} onChange={onChange} placeholder="Profile name" className="w-full p-3 border rounded-md bg-white" required />
      <input name="amount" value={form.amount} onChange={onChange} placeholder="Amount" className="w-full p-3 border rounded-md bg-white" required />

      <div className="grid grid-cols-2 gap-3">
        <input name="interestRate" value={form.interestRate} onChange={onChange} placeholder="Interest %" className="p-3 border rounded-md bg-white" />
        <select name="interestType" value={form.interestType} onChange={onChange} className="p-3 border rounded-md bg-white">
          <option>Simple</option>
          <option>Compound</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <select name="frequency" value={form.frequency} onChange={onChange} className="p-3 border rounded-md bg-white">
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
        <input name="periodCount" value={form.periodCount} onChange={onChange} placeholder="Periods (months/years)" className="p-3 border rounded-md bg-white" />
      </div>

      <input name="startDate" value={form.startDate} onChange={onChange} type="date" className="p-3 border rounded-md bg-white w-full" />

      <div className="flex items-center gap-3">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-purple-700 text-white rounded-md">
          {loading ? 'Saving…' : 'Save'}
        </button>
        {msg && <div className={msg.type === 'error' ? 'text-red-600' : 'text-green-700'}>{msg.text}</div>}
      </div>
    </form>
  )
}
