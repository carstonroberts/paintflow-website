import { StrictMode } from 'react'
import posthog from 'posthog-js'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { captureUtms } from './lib/appLink'

// First-touch UTM capture — must run before render so app CTAs carry attribution.
captureUtms()

// Set VITE_POSTHOG_KEY in Vercel production env vars before deploy.
// Same PostHog project key as the CRM app.
const phKey = import.meta.env.VITE_POSTHOG_KEY
const phHost = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com'
if (phKey) {
  posthog.init(phKey, {
    api_host: phHost,
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    persistence: 'localStorage',
    person_profiles: 'identified_only',
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Analytics />
    <SpeedInsights />
  </StrictMode>,
)
