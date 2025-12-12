// frontend/components/PaymentForm.jsx
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function PaymentForm(){
  const [form, setForm] = useState({
    profileName: '', amount: '', interestRate: '12', interestType: 'Simple', frequency: 'Monthly', periodCount: '12', startDate: ''
  })
  const [filePreview, setFilePreview] = useState(null)
  const router = useRouter()

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const onFile = (e) => {
    const f = e.target.files && e.target.files[0]
    if (f) {
      const url = URL.createObjectURL(f)
      setFilePreview(url)
      // optionally upload to backend or keep base64 to pass to review, skipping for now
    }
  }

  const goReview = (e) => {
    e.preventDefault()
    // encode form in query or sessionStorage and send to /review
    sessionStorage.setItem('txDraft', JSON.stringify({ ...form, screenshot: filePreview }))
    router.push('/review')
  }

  return (
    <form onSubmit={goReview} className="space-y-3">
      <input name="profileName" value={form.profileName} onChange={onChange} placeholder="Profile name" className="w-full p-3 border rounded-md" required />
      <input name="amount" value={form.amount} onChange={onChange} placeholder="Amount" className="w-full p-3 border rounded-md" required />
      <div className="grid grid-cols-2 gap-3">
        <input name="interestRate" value={form.interestRate} onChange={onChange} className="p-3 border rounded-md" />
        <select name="interestType" value={form.interestType} onChange={onChange} className="p-3 border rounded-md">
          <option>Simple</option>
          <option>Compound</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <select name="frequency" value={form.frequency} onChange={onChange} className="p-3 border rounded-md">
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
        <input name="periodCount" value={form.periodCount} onChange={onChange} placeholder="Periods" className="p-3 border rounded-md" />
      </div>

      <div className="flex items-center gap-3">
        <label className="p-2 border rounded-md cursor-pointer bg-white">📷 Upload
          <input onChange={onFile} type="file" accept="image/*" className="hidden" />
        </label>
        {filePreview && <img src={filePreview} className="w-16 h-16 object-cover rounded-md" alt="preview" />}
      </div>

      <div className="flex gap-3">
        <button type="submit" className="px-4 py-2 bg-[#5B5FC7] text-white rounded-md">Review & Confirm</button>
        <a href="/" className="px-4 py-2 border rounded-md">Cancel</a>
      </div>
    </form>
  )
}
