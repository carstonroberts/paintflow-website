import { Link } from 'react-router-dom'

const FEATURES = [
  { icon: '💰', color: 'bg-[#eff6ff]', title: 'Real Job Costing', desc: 'Compare estimated vs actual hours, materials, and supplies on every job. See your real margin — not just what you hoped for.' },
  { icon: '⏱', color: 'bg-[#e4f5ec]', title: 'Live Labor Tracking', desc: 'Crew clocks in from their phone. See who\'s on site and how many hours are burned vs budgeted in real time.' },
  { icon: '📋', color: 'bg-[#fff3d6]', title: 'Smart Estimating', desc: 'Set your labor rate, paint coverage, and target margin. The estimator calculates hours, gallons, and final price automatically.' },
  { icon: '📊', color: 'bg-[#e8e8ef]', title: 'Crew Efficiency Scores', desc: 'Track which estimators and lead painters consistently hit their hour targets. Find out where your margin is actually going.' },
  { icon: '🔁', color: 'bg-[#eff6ff]', title: 'Pipeline Management', desc: 'Move jobs through 9 stages. Gmail sync pulls leads straight into your funnel automatically.' },
  { icon: '🧾', color: 'bg-[#e4f5ec]', title: 'Invoicing & Payments', desc: 'Send deposit and final invoices from the app. Deposit status gates scheduling so jobs can\'t be booked before you\'re paid.' },
  { icon: '📱', color: 'bg-[#fff3d6]', title: 'Text & Email Automations', desc: 'Follow-up sequences, estimate reminders, and job confirmations — sent automatically so nothing slips.' },
  { icon: '📄', color: 'bg-[#e8e8ef]', title: 'Digital Crew Sheets', desc: 'Print-ready job sheets with colors, notes, and hours — financials hidden. Your crew gets what they need, nothing they shouldn\'t.' },
]

const COMPARE_ROWS = [
  { feature: 'Job costing & margin tracking',  pf: true,  ps: false, dj: false },
  { feature: 'Live labor budget health',        pf: true,  ps: false, dj: false },
  { feature: 'Crew efficiency scoring',         pf: true,  ps: false, dj: false },
  { feature: 'Gmail lead sync',                 pf: true,  ps: true,  dj: false },
  { feature: 'Text & email automations',        pf: true,  ps: true,  dj: true  },
  { feature: 'Invoicing with deposit logic',    pf: true,  ps: true,  dj: true  },
]

function Check({ val }: { val: boolean }) {
  return val
    ? <span className="text-[#1d7a4a] font-bold">✓</span>
    : <span className="text-[#ccc]">—</span>
}

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-[#eff6ff] text-[#2563eb] text-xs font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-[#2563eb] rounded-full" />
          Built by a painting contractor
        </div>
        <h1 className="font-[Syne] text-5xl font-extrabold leading-[1.08] tracking-[-0.03em] text-[#0f1117] mb-5">
          Finally know if your<br />
          <em className="not-italic text-[#2563eb]">jobs are profitable.</em>
        </h1>
        <p className="text-[#5a5f72] font-light text-lg max-w-lg mx-auto mb-9 leading-relaxed">
          PaintFlow is the CRM built from scratch for painting contractors — with real job costing, live labor tracking, and the tools you actually need to run a crew.
        </p>
        <a
          href="https://calendly.com/carstonroberts/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#2563eb] text-white font-medium text-base px-7 py-3.5 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all"
        >
          Schedule a Free Demo
        </a>
        <p className="text-sm text-[#5a5f72] mt-3">30 minutes. No pressure. See exactly how it works.</p>
        <div className="inline-flex items-center gap-2 bg-[#e4f5ec] text-[#1d7a4a] text-sm font-medium px-4 py-1.5 rounded-full mt-5">
          Early access pricing — $99/month
        </div>
      </div>

      {/* App Preview */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-[#f5f4f0] border border-black/10 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 text-xs text-[#5a5f72] font-medium">PaintFlow — Job Pipeline</span>
          </div>
          {/* Pipeline columns */}
          <div className="grid grid-cols-4 gap-2.5 mb-3">
            {[
              { label: 'New Lead', count: 3, cards: [{ name: 'Henderson Exterior', val: '~$4,200', tag: 'Estimate Needed', tagClass: 'bg-[#eff6ff] text-[#2563eb]' }, { name: 'Maple St. Interior', val: '~$2,800', tag: 'From Gmail', tagClass: 'bg-[#eff6ff] text-[#2563eb]' }] },
              { label: 'Estimate Sent', count: 2, cards: [{ name: 'Park Ridge HOA', val: '$18,500', tag: 'Following Up', tagClass: 'bg-[#fff3d6] text-[#a06000]' }] },
              { label: 'In Production', count: 2, cards: [{ name: 'Whitmore Residence', val: '$6,400', tag: 'On Budget', tagClass: 'bg-[#e4f5ec] text-[#1d7a4a]' }, { name: 'Cedar Ln. Cabinets', val: '$3,100', tag: 'Watch Labor', tagClass: 'bg-[#fff3d6] text-[#a06000]' }] },
              { label: 'Complete', count: 4, cards: [{ name: 'Tanner Home', val: '$5,200', tag: '42% Margin', tagClass: 'bg-[#e4f5ec] text-[#1d7a4a]' }] },
            ].map(col => (
              <div key={col.label} className="bg-white border border-black/10 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#5a5f72]">{col.label}</span>
                  <span className="text-[10px] bg-[#f5f4f0] text-[#5a5f72] px-2 py-0.5 rounded-full">{col.count}</span>
                </div>
                {col.cards.map(card => (
                  <div key={card.name} className="bg-[#f5f4f0] rounded-lg p-2.5 mb-2 last:mb-0">
                    <div className="text-[11px] font-medium text-[#0f1117] mb-0.5">{card.name}</div>
                    <div className="text-[11px] text-[#5a5f72]">{card.val}</div>
                    <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mt-1 ${card.tagClass}`}>{card.tag}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: 'Realized Margin', val: '41%', sub: '+6% vs estimate', subColor: 'text-[#1d7a4a]', fillColor: 'bg-[#1d7a4a]', fillW: 'w-[68%]' },
              { label: 'Labor Budget', val: '88%', sub: 'Cedar Ln. nearing limit', subColor: 'text-[#a06000]', fillColor: 'bg-[#f0a500]', fillW: 'w-[88%]' },
              { label: 'Active Crew', val: '3', sub: 'On site now', subColor: 'text-[#1d7a4a]', fillColor: 'bg-[#1d7a4a]', fillW: 'w-[60%]' },
            ].map(s => (
              <div key={s.label} className="bg-white border border-black/10 rounded-xl px-3.5 py-3">
                <div className="text-[10px] uppercase tracking-wider font-semibold text-[#5a5f72] mb-1.5">{s.label}</div>
                <div className="font-[Syne] text-2xl font-bold tracking-tight text-[#0f1117]">{s.val}</div>
                <div className={`text-[11px] mt-0.5 ${s.subColor}`}>{s.sub}</div>
                <div className="h-1 bg-[#f5f4f0] rounded-full mt-2 overflow-hidden">
                  <div className={`h-full rounded-full ${s.fillColor} ${s.fillW}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#2563eb] mb-2.5">Features</div>
        <h2 className="font-[Syne] text-4xl font-extrabold tracking-tight leading-[1.12] text-[#0f1117] mb-3">
          Everything a painting<br />business actually needs.
        </h2>
        <p className="text-[#5a5f72] font-light text-base max-w-md mb-9 leading-relaxed">
          No bloat. No features built for plumbers. Just the tools that matter when you're running crews and closing jobs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-[#f5f4f0] rounded-xl p-5 hover:-translate-y-0.5 transition-transform">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base mb-3 ${f.color}`}>
                {f.icon}
              </div>
              <div className="font-[Syne] text-sm font-bold mb-1.5">{f.title}</div>
              <p className="text-xs text-[#5a5f72] leading-relaxed font-light">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lead magnet CTA strip */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-[#eff6ff] border border-[#2563eb]/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-[Syne] font-bold text-lg text-[#0f1117] mb-1">Not sure what to charge in your state?</div>
            <p className="text-sm text-[#5a5f72] font-light">Get a free rate sheet with low, median, and high labor rates — specific to your state and work type.</p>
          </div>
          <Link
            to="/resources/rate-calculator"
            className="shrink-0 bg-[#2563eb] text-white text-sm font-medium px-6 py-3 rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Get Free Rate Sheet →
          </Link>
        </div>
      </div>

      {/* Comparison */}
      <div className="max-w-4xl mx-auto px-6 pb-16 text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#2563eb] mb-2.5">Comparison</div>
        <h2 className="font-[Syne] text-4xl font-extrabold tracking-tight text-[#0f1117] mb-3">
          Half the price.<br />More of what matters.
        </h2>
        <p className="text-[#5a5f72] font-light text-base max-w-md mx-auto mb-8">Built by a painter for painters — without the enterprise price tag.</p>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left px-4 py-2.5 font-[Syne] font-bold text-xs border-b-2 border-black/10">Feature</th>
              <th className="text-left px-4 py-2.5 font-[Syne] font-bold text-xs border-b-2 border-black/10 text-[#2563eb]">PaintFlow</th>
              <th className="text-left px-4 py-2.5 font-[Syne] font-bold text-xs border-b-2 border-black/10">PaintScout</th>
              <th className="text-left px-4 py-2.5 font-[Syne] font-bold text-xs border-b-2 border-black/10">DripJobs</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map(row => (
              <tr key={row.feature}>
                <td className="text-left px-4 py-2.5 border-b border-black/10 text-[#5a5f72]">{row.feature}</td>
                <td className="px-4 py-2.5 border-b border-black/10 font-medium text-[#0f1117]"><Check val={row.pf} /></td>
                <td className="px-4 py-2.5 border-b border-black/10"><Check val={row.ps} /></td>
                <td className="px-4 py-2.5 border-b border-black/10"><Check val={row.dj} /></td>
              </tr>
            ))}
            <tr>
              <td className="text-left px-4 py-2.5 text-[#5a5f72]">Starting price</td>
              <td className="px-4 py-2.5 text-[#2563eb] font-bold">$99/mo</td>
              <td className="px-4 py-2.5 text-[#5a5f72]">$149/mo</td>
              <td className="px-4 py-2.5 text-[#5a5f72]">$97/mo</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pricing */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-[#0f1117] text-white rounded-2xl px-8 py-16 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#f0a500] mb-3">Pricing</div>
          <h2 className="font-[Syne] text-4xl font-extrabold tracking-tight mb-3">Simple, honest pricing.</h2>
          <p className="text-white/55 font-light text-base max-w-sm mx-auto mb-10">Low overhead means we pass the savings on. One plan. Everything included.</p>
          <div className="bg-white/6 border border-white/12 rounded-xl p-8 max-w-sm mx-auto">
            <div className="font-[Syne] text-6xl font-extrabold tracking-[-0.04em] text-white leading-none mb-1">$99</div>
            <div className="text-white/45 text-sm mb-7">per month, cancel anytime</div>
            <ul className="text-left mb-7 space-y-0">
              {['Full pipeline & CRM', 'Job costing & margin tracking', 'Live labor time clock', 'Smart estimating engine', 'Invoicing & payment collection', 'Text & email automations', 'Gmail lead sync', 'Unlimited jobs & clients'].map(item => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-white/75 py-1.5 border-b border-white/7 last:border-0">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#f0a500] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://calendly.com/carstonroberts/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-white text-[#0f1117] font-semibold text-sm py-3.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              Schedule a Free Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
