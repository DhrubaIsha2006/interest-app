// frontend/pages/payment.js
import Head from 'next/head'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import PaymentForm from '../components/PaymentForm' // we'll add component below

export default function PaymentPage(){
  return (
    <>
      <Head><title>Payment — Interest App</title></Head>
      <div className="min-h-screen bg-[#F0F1F7]">
        <div className="max-w-2xl mx-auto px-4 pt-6 pb-28">
          <Header />
          <div className="mt-6 bg-white p-6 rounded-2xl shadow-card">
            <h2 className="text-xl font-semibold">New Transaction</h2>
            <p className="text-sm text-gray-500 mb-4">Enter transaction details</p>
            <PaymentForm />
          </div>
        </div>

        <BottomNav />
      </div>
    </>
  )
}
