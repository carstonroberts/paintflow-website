import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import RateCalculator from './pages/RateCalculator'
import FiveMistakes from './pages/FiveMistakes'

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
      <Routes>
        {/* Landing has its own Nav and Footer built in */}
        <Route path="/" element={<Landing />} />
        {/* Resource pages use the shared Nav/Footer */}
        <Route path="/resources/rate-calculator" element={<ResourceLayout><RateCalculator /></ResourceLayout>} />
        <Route path="/resources/5-mistakes" element={<ResourceLayout><FiveMistakes /></ResourceLayout>} />
      </Routes>
    </BrowserRouter>
  )
}
