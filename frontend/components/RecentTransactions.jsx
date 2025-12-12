// RecentTransactions.jsx
export default function RecentTransactions({ items }) {
  const sample = [
    { id: 1, name: 'Riya', time: 'Today, 10:15 AM', amount: -1200 },
    { id: 2, name: 'Alu', time: 'Dec 9, 3:45 PM', amount: -5000 },
    { id: 3, name: 'Salary', time: 'Dec 8, 9:00 AM', amount: 20000 },
  ]
  const list = items || sample

  return (
    <section className="mt-8">
      <div className="bg-[var(--card)] rounded-2xl shadow-[var(--card-shadow)] p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">Recent Transactions</h4>
          <div className="text-sm text-[var(--muted)]">Latest</div>
        </div>

        <div className="divide-y">
          {list.map(tx => (
            <div key={tx.id} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 grid place-items-center text-gray-600">{String(tx.name).charAt(0)}</div>
                <div>
                  <div className="font-medium">{tx.name}</div>
                  <div className="text-sm text-[var(--muted)]">{tx.time}</div>
                </div>
              </div>
              <div className={`font-semibold ${tx.amount < 0 ? 'text-[var(--danger)]' : 'text-[var(--success)]'}`}>
                {tx.amount < 0 ? `-₹${Math.abs(tx.amount).toLocaleString()}` : `+₹${tx.amount.toLocaleString()}`}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-[var(--muted)] mt-4">
          Show All
        </div>
      </div>
    </section>
  )
}
