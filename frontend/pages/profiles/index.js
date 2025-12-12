// frontend/pages/profiles/index.js
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'

const fetcher = (u) => fetch(u).then(r => r.json())

export default function ProfilesPage() {
  const { data: profiles, error } = useSWR('/api/profiles', fetcher)

  return (
    <>
      <Head>
        <title>Profiles — Interest App</title>
      </Head>

      <div style={{ maxWidth: 1100, margin: '24px auto', padding: '0 20px' }}>
        <header style={{ marginBottom: 20 }}>
          <h1 style={{ margin: 0, fontSize: 28 }}>Profiles</h1>
          <p style={{ color: '#6b7280', marginTop: 6 }}>List of people and outstanding balances</p>
        </header>

        <main>
          <section style={{ marginBottom: 18 }}>
            <Link href="/transaction/new" style={{
              display: 'inline-block',
              padding: '10px 14px',
              borderRadius: 10,
              border: '1px solid #d1d5db',
              color: '#374151',
              textDecoration: 'none'
            }}>
              + Add Transaction
            </Link>
          </section>

          <section>
            {error && <div style={{ color: 'red' }}>Failed to load profiles</div>}
            {!profiles && !error && <div>Loading…</div>}
            {profiles && profiles.length === 0 && (
              <div style={{ color: '#6b7280' }}>No profiles yet. Add a transaction to create the first profile.</div>
            )}
            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginTop: 12 }}>
              {profiles && profiles.map(p => (
                <article key={p._id} style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: 16,
                  boxShadow: '0 6px 18px rgba(15,23,42,0.06)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 999, background: '#eef2ff',
                        display: 'grid', placeItems: 'center', fontWeight: 600, color: '#4f46e5'
                      }}>
                        {p.name ? p.name.charAt(0).toUpperCase() : 'P'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{p.name}</div>
                        <div style={{ color: '#6b7280', fontSize: 13 }}>Joined {new Date(p.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <Link href={`/profile/${p._id}`} style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600 }}>
                        View
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
