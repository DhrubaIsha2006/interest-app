// ReadyCard.jsx
export default function ReadyCard({ balance = 45857.10, interest = 289.42, historyCount = 12 }) {
  return (
    <section className="bg-[var(--bg)] rounded-2xl p-6 md:p-8 shadow-none">
      <div className="bg-[var(--card)] rounded-2xl px-6 py-8 shadow-[var(--card-shadow)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="text-sm text-[var(--muted)] mb-2">Ready to Redeem</div>
          <div className="text-4xl font-bold tracking-tight">₹ {balance.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}</div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="text-sm text-[var(--muted)]">Total Interest</div>
              <div className="text-lg font-semibold text-[var(--accent)]">₹ {interest.toLocaleString()}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-[var(--muted)]">History</div>
              <div className="text-lg font-semibold">{historyCount} records</div>
            </div>
          </div>
        </div>

        <div>
          <button className="inline-block mt-3 md:mt-0 bg-[var(--accent)] text-white rounded-full px-6 py-3 uppercase font-semibold shadow">
            Redeem Now
          </button>
        </div>
      </div>
    </section>
  )
}
