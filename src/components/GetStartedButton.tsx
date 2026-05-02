import { useState } from 'react'

const API_BASE = ''  // same-origin — Vercel routes /api/checkout to serverless function

interface Props {
  className?: string
  label?: string
  plan?: 'monthly' | 'annual'
}

export default function GetStartedButton({ className = '', label = 'Get Started — $99/mo', plan = 'monthly' }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const { url, error } = await res.json()
      if (url) window.location.href = url
      else { console.error(error); setLoading(false) }
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  return (
    <button onClick={handleClick} disabled={loading} className={`cursor-pointer disabled:opacity-70 ${className}`}>
      {loading ? 'Redirecting...' : label}
    </button>
  )
}
