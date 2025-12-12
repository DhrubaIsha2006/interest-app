// frontend/pages/calendar.js
import Head from 'next/head'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function Calendar(){
  return (
    <>
      <Head><title>Calendar</title></Head>
      <div className="min-h-screen bg-[#F0F1F7]">
        <div className="max-w-3xl mx-auto px-4 pt-6 pb-28">
          <Header />
          <div className="bg-white rounded-2xl p-6 shadow-card mt-6">
            <h3 className="font-semibold">Calendar</h3>
            <div className="mt-4 text-gray-500">Calendar placeholder</div>
          </div>
        </div>
        <BottomNav />
      </div>
    </>
  )
}
