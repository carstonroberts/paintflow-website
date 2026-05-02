import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const { pathname } = useLocation()
  const isResource = pathname.startsWith('/resources')

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/10 h-15">
      <div className="max-w-4xl mx-auto px-6 h-full flex items-center justify-between">
        <Link
          to="/"
          className="font-[Syne] font-extrabold text-xl tracking-tight text-[#0f1117]"
        >
          Paint<span className="text-[#2563eb]">Flow</span>
        </Link>

        <div className="flex items-center gap-4">
          {!isResource && (
            <Link
              to="/resources/rate-calculator"
              className="text-sm text-[#5a5f72] hover:text-[#0f1117] transition-colors hidden sm:block"
            >
              Free Rate Sheet
            </Link>
          )}
          <a
            href="https://calendly.com/carstonroberts/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0f1117] text-white text-sm font-medium px-5 py-2 rounded-lg hover:opacity-85 transition-opacity"
          >
            Schedule a Demo
          </a>
        </div>
      </div>
    </nav>
  )
}
