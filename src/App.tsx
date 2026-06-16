import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import posthog from 'posthog-js'
import { trackMeta } from './lib/metaPixel'
import { preloadCalendly } from './lib/demo'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import RateCalculator from './pages/RateCalculator'
import FiveMistakes from './pages/FiveMistakes'
import ComparePaintScout from './pages/ComparePaintScout'
import CompareDripJobs from './pages/CompareDripJobs'
import Refund from './pages/Refund'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'

// SPA route changes don't trigger PostHog's automatic pageview (it only fires
// on initial load), so capture one manually on every location change.
function PostHogPageview() {
  const location = useLocation()
  const isFirstRender = useRef(true)
  useEffect(() => {
    // The initial pageview is captured by posthog.init (capture_pageview: true);
    // only capture subsequent client-side route changes here.
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (import.meta.env.VITE_POSTHOG_KEY) {
      posthog.capture('$pageview')
    }
  }, [location])
  return null
}

// The Meta pixel is initialised WITHOUT an automatic PageView, so we fire one on
// every route change — including the initial load. A ref keyed on the path
// dedupes StrictMode's double-invoked effect so the initial PageView fires once.
function MetaPixelPageview() {
  const location = useLocation()
  const lastPath = useRef<string | null>(null)
  useEffect(() => {
    const path = location.pathname + location.search
    if (lastPath.current === path) return
    lastPath.current = path
    trackMeta('PageView')
  }, [location])
  return null
}

// Layout with shared Nav/Footer for resource pages
function ResourceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default function App() {
  // Calendly demo bookings: preload the widget assets, then listen for the
  // popup's completion message and fire 'Schedule' to Meta + PostHog for parity.
  // Demo CTAs site-wide route through openDemo() (src/lib/demo.ts) so this single
  // listener captures every booking.
  useEffect(() => {
    preloadCalendly()
    function onMessage(e: MessageEvent) {
      if (typeof e.origin === 'string' && !e.origin.includes('calendly.com')) return
      const data = e.data as { event?: string } | null
      if (data?.event !== 'calendly.event_scheduled') return
      trackMeta('Schedule', { content_name: 'demo' })
      if (import.meta.env.VITE_POSTHOG_KEY) {
        posthog.capture('demo_scheduled', { content_name: 'demo' })
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <BrowserRouter>
      <PostHogPageview />
      <MetaPixelPageview />
      <Routes>
        {/* Landing has its own Nav and Footer built in */}
        <Route path="/" element={<Landing />} />
        {/* Resource pages use the shared Nav/Footer */}
        <Route path="/resources/rate-calculator" element={<ResourceLayout><RateCalculator /></ResourceLayout>} />
        <Route path="/resources/5-mistakes" element={<ResourceLayout><FiveMistakes /></ResourceLayout>} />
        {/* Compare pages have their own Nav/Footer built in */}
        <Route path="/compare/paintscout" element={<ComparePaintScout />} />
        <Route path="/compare/dripjobs" element={<CompareDripJobs />} />
        {/* Legal pages */}
        <Route path="/refund" element={<ResourceLayout><Refund /></ResourceLayout>} />
        <Route path="/terms" element={<ResourceLayout><Terms /></ResourceLayout>} />
        <Route path="/privacy" element={<ResourceLayout><Privacy /></ResourceLayout>} />
      </Routes>
    </BrowserRouter>
  )
}
