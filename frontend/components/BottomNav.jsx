// frontend/components/BottomNav.jsx
import { useRouter } from 'next/router'
import { HomeIcon, ChartBarIcon, UserIcon, BriefcaseIcon, PlusIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export default function BottomNav() {
  const router = useRouter()
  return (
    <nav className="fixed bottom-6 left-0 right-0 flex justify-center pointer-events-auto">
      <div className="bg-white/90 backdrop-blur rounded-full shadow-xl px-6 py-3 flex items-center gap-6 max-w-xl w-full mx-4 justify-between">
        <button onClick={() => router.push('/')} className="flex flex-col items-center text-sm text-gray-600">
          <HomeIcon className="w-6 h-6" />
          <span>Home</span>
        </button>

        <button onClick={() => router.push('/portfolio')} className="flex flex-col items-center text-sm text-gray-600">
          <BriefcaseIcon className="w-6 h-6" />
          <span>Portfolio</span>
        </button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/transaction/new')}
          className="bg-purple-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg -mt-8"
          aria-label="Add transaction"
        >
          <PlusIcon className="w-6 h-6" />
        </motion.button>

        <button onClick={() => router.push('/calculator')} className="flex flex-col items-center text-sm text-gray-600">
          <ChartBarIcon className="w-6 h-6" />
          <span>Reports</span>
        </button>

        <button onClick={() => router.push('/profile')} className="flex flex-col items-center text-sm text-gray-600">
          <UserIcon className="w-6 h-6" />
          <span>Profile</span>
        </button>
      </div>
    </nav>
  )
}
