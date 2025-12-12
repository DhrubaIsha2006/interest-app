// frontend/components/Header.jsx
import { useRouter } from 'next/router'
import { CalendarDaysIcon, BellIcon } from '@heroicons/react/24/outline'

export default function Header({ userName = 'Dhrubo' }) {
  const router = useRouter()

  return (
    <header className="w-full bg-[color:var(--bg)]">
      <div className="max-w-6xl mx-auto px-5 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold">
            {userName?.[0] || 'D'}
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">Hello {userName}</div>
            <div className="text-sm text-gray-500">Welcome back</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Calendar icon routes to /calendar */}
          <button
            aria-label="Calendar"
            onClick={() => router.push('/calendar')}
            className="p-3 rounded-xl bg-white shadow-sm hover:shadow-md"
            style={{ minWidth: 44, minHeight: 44 }}
          >
            <CalendarDaysIcon className="w-5 h-5 text-gray-700" />
          </button>

          {/* Notifications icon routes to /notifications */}
          <button
            aria-label="Notifications"
            onClick={() => router.push('/notifications')}
            className="p-3 rounded-xl bg-white shadow-sm hover:shadow-md"
            style={{ minWidth: 44, minHeight: 44 }}
          >
            <BellIcon className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  )
}
