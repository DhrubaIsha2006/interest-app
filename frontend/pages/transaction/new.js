// frontend/pages/transaction/new.js
import Layout from '@/components/Layout'
import TransactionForm from '@/components/TransactionForm'

export default function NewTransaction() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-5 py-10">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Add Transaction</h2>
          <p className="text-sm text-gray-500 mb-4">Create a new lending / borrowing entry</p>
          <TransactionForm />
        </div>
      </div>
    </Layout>
  )
}
