// frontend/pages/profile/index.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function ProfileIndex() {
  const router = useRouter()
  useEffect(() => {
    // Replace so user doesn't keep /profile in history
    router.replace('/profiles')
  }, [router])

  return (
    <>
      <Head><title>Profile — Interest App</title></Head>
      <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
        <div style={{
          background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 6px 24px rgba(0,0,0,0.06)'
        }}>
          <h2 style={{ margin: 0 }}>Redirecting…</h2>
          <p style={{ color: '#6b7280', marginTop: 8 }}>
            Redirecting you to the Profiles list. If the redirect does not happen, <a href="/profiles">click here</a>.
          </p>
        </div>
      </div>
    </>
  )
}
