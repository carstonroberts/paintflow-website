import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#f5f4f0] border-t border-black/10 py-8 px-6 text-center">
      <Link to="/" className="font-extrabold text-lg text-[#0f1117] tracking-tight">
        Paint<span className="text-[#2563eb]">Stride</span>
      </Link>
      <p className="text-sm text-[#5a5f72] mt-1">Built by a painting contractor, for painting contractors.</p>
      <div className="flex items-center justify-center gap-6 mt-4 text-sm text-[#5a5f72]">
        <Link to="/resources/rate-calculator" className="hover:text-[#0f1117] transition-colors">Free Rate Sheet</Link>
        <Link to="/resources/5-mistakes" className="hover:text-[#0f1117] transition-colors">5 Mistakes Guide</Link>
        <a href="/privacy" className="hover:text-[#0f1117] transition-colors">Privacy</a>
      </div>
      <p className="text-xs text-[#5a5f72] mt-4">© {new Date().getFullYear()} PaintStride. All rights reserved.</p>
    </footer>
  )
}
