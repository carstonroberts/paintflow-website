const RAILWAY_URL = 'https://paintflow-crm-production.up.railway.app'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const upstream = await fetch(`${RAILWAY_URL}/api/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    })
    const data = await upstream.json()
    res.status(upstream.status).json(data)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
