import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Sidebar() {
  const router = useRouter()

  const isActive = (path) => router.pathname === path

  return (
    <div className="sidebar-menu">
      <Link href="/" className={isActive('/') ? 'side-item active' : 'side-item'}>
        Dashboard
      </Link>

      <Link href="/profiles" className={isActive('/profiles') ? 'side-item active' : 'side-item'}>
        Profiles
      </Link>

      <Link href="/transactions" className={isActive('/transactions') ? 'side-item active' : 'side-item'}>
        Transactions
      </Link>
    </div>
  )
}
