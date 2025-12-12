// pages/index.js
import ReadyCard from '@/components/ReadyCard'
import PaymentsDue from '@/components/PaymentsDue'
import RecentTransactions from '@/components/RecentTransactions'

export default function Home(){
  return (
    <div>
      <ReadyCard />
      <PaymentsDue />
      <RecentTransactions />
    </div>
  )
}
