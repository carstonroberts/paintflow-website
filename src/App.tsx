import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import posthog from 'posthog-js'
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
  return (
    <BrowserRouter>
      <PostHogPageview />
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
