// frontend/pages/investor.js
import Head from 'next/head'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import useSWR from 'swr'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'
const fetcher = (u)=> fetch(u).then(r => r.json())

export default function Investor(){
  const { data: summary } = useSWR(`${BACKEND}/api/summary`, fetcher)
  return (
    <>
      <Head><title>Investor Panel</title></Head>
      <div className="min-h-screen bg-[#F0F1F7]">
        <div className="max-w-4xl mx-auto px-4 pt-6 pb-28">
          <Header />
          <div className="mt-6 bg-white p-6 rounded-2xl shadow-card">
            <h2 className="font-semibold">Investor Dashboard</h2>
            <div className="mt-4">Total Capital: ₹ {Number(summary?.totalOutstanding || 0).toLocaleString()}</div>
            <div className="mt-4">Portfolio Health: <strong>Good</strong></div>
          </div>
        </div>
        <BottomNav />
      </div>
    </>
  )
}
