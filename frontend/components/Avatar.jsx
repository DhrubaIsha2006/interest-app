// frontend/components/Avatar.jsx
export default function Avatar({ name = 'U', src = null, size = 40 }) {
  const initials = (name || '').split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase()
  return (
    <div style={{ width: size, height: size }} className="rounded-full bg-white ring-2 ring-white flex items-center justify-center shadow-avatar overflow-hidden">
      {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : (
        <div style={{ width: size - 8, height: size - 8 }} className="rounded-full bg-purple-50 text-purple-800 flex items-center justify-center font-semibold">
          {initials}
        </div>
      )}
    </div>
  )
}
