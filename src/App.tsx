import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import RateCalculator from './pages/RateCalculator'
import FiveMistakes from './pages/FiveMistakes'

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/resources/rate-calculator" element={<RateCalculator />} />
          <Route path="/resources/5-mistakes" element={<FiveMistakes />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
