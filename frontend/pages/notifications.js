// frontend/pages/notifications.js
import Head from 'next/head'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import useSWR from 'swr'
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'
const fetcher = (u)=> fetch(u).then(r => r.json())

export default function Notifications(){
  const { data: notifications } = useSWR(`${BACKEND}/api/notifications`, fetcher) // optional endpoint
  return (
    <>
      <Head><title>Notifications</title></Head>
      <div className="min-h-screen bg-[#F0F1F7]">
        <div className="max-w-3xl mx-auto px-4 pt-6 pb-28">
          <Header />
          <div className="bg-white rounded-2xl p-6 shadow-card mt-6">
            <h3 className="font-semibold">Notifications</h3>
            <div className="mt-4 text-gray-500">No notifications</div>
          </div>
        </div>
        <BottomNav />
      </div>
    </>
  )
}
