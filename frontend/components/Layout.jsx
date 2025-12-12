// Layout.jsx
import Header from './Header'
import BottomNav from './BottomNav'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] font-sans text-gray-800">
      <Header />
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
