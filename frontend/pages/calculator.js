// pages/calculator.js
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Calculator(){
  const [amount, setAmount] = useState(50000)
  const [rate, setRate] = useState(10)
  const [period, setPeriod] = useState(12)
  const [type, setType] = useState('Simple')

  const totalInterest = type === 'Simple' ? (amount * (rate/100) * period) : (amount * (Math.pow((1 + (rate/100)), period) -1))
  const totalPayable = amount + totalInterest

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-[var(--card)] rounded-2xl p-6 shadow-[var(--card-shadow)]">
        <h2 className="text-2xl font-bold">Interest Calculator</h2>
        <p className="text-sm text-[var(--muted)]">Play with numbers</p>

        <div className="mt-6">
          <label className="block text-sm text-[var(--muted)]">Amount</label>
          <input type="range" min="1000" max="200000" value={amount} onChange={e=>setAmount(Number(e.target.value))} className="w-full" />
          <div className="mt-2 text-xl font-semibold">₹ {amount.toLocaleString()}</div>
        </div>

        <div className="mt-4">
          <label className="block text-sm text-[var(--muted)]">Rate (%)</label>
          <input type="range" min="1" max="30" value={rate} onChange={e=>setRate(Number(e.target.value))} className="w-full" />
          <div className="mt-2 text-lg font-semibold">{rate}%</div>
        </div>

        <div className="mt-4">
          <label className="block text-sm text-[var(--muted)]">Periods (months/years)</label>
          <input type="number" value={period} onChange={e=>setPeriod(Number(e.target.value))} className="w-full p-3 border rounded-lg" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button onClick={()=>setType('Simple')} className={`p-3 rounded-lg ${type==='Simple'? 'bg-[var(--accent)] text-white' : 'bg-gray-100'}`}>Simple</button>
          <button onClick={()=>setType('Compound')} className={`p-3 rounded-lg ${type==='Compound'? 'bg-[var(--accent)] text-white' : 'bg-gray-100'}`}>Compound</button>
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-[var(--muted)]">Interest Earned</div>
          <motion.div animate={{ scale: 1 }} className="text-2xl font-bold">₹ {Math.round(totalInterest).toLocaleString()}</motion.div>
          <div className="text-sm text-[var(--muted)]">Total Payable: ₹ {Math.round(totalPayable).toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}
