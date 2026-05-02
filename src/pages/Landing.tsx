import { useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import GetStartedButton from '../components/GetStartedButton'

// --- SVG Icons ---
function IconChart() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]">
      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
    </svg>
  )
}
function IconClock() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
    </svg>
  )
}
function IconDocument() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]">
      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v2a1 1 0 102 0v-2zm2-2a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm4-1a1 1 0 10-2 0v4a1 1 0 102 0V9z" clipRule="evenodd" />
    </svg>
  )
}
function IconUsers() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]">
      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
    </svg>
  )
}
function IconBoards() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]">
      <path d="M2 4a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM2 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h3a1 1 0 001-1v-6a1 1 0 00-1-1h-3z" />
    </svg>
  )
}
function IconCard() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]">
      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
    </svg>
  )
}
function IconMail() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  )
}
function IconDocText() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
  )
}

const FEATURES: { title: string; desc: string; color: string; Icon: () => React.ReactElement }[] = [
  { title: 'Real Job Costing', desc: 'Compare estimated vs actual hours, materials, and supplies on every job. See your real margin — not what you hoped for.', color: 'bg-[#eff6ff] text-[#2563eb]', Icon: IconChart },
  { title: 'Live Labor Tracking', desc: "Crew clocks in from their phone. See who's on site and how many hours are burned vs budgeted in real time.", color: 'bg-[#e4f5ec] text-[#1d7a4a]', Icon: IconClock },
  { title: 'Smart Estimating', desc: 'Set your labor rate, paint coverage, and target margin. Hours, gallons, and final price — calculated automatically.', color: 'bg-[#fff3d6] text-[#a06000]', Icon: IconDocument },
  { title: 'Crew Efficiency Scores', desc: 'Track which estimators and lead painters consistently hit their targets. Find out where your margin is actually going.', color: 'bg-[#ede9fe] text-[#6d28d9]', Icon: IconUsers },
  { title: 'Pipeline Management', desc: 'Move jobs through 9 stages. Gmail sync pulls leads straight into your funnel automatically.', color: 'bg-[#eff6ff] text-[#2563eb]', Icon: IconBoards },
  { title: 'Invoicing & Payments', desc: 'Send deposit and final invoices from the app. Deposit status gates scheduling so jobs can\'t be booked until you\'re paid.', color: 'bg-[#e4f5ec] text-[#1d7a4a]', Icon: IconCard },
  { title: 'Text & Email Automations', desc: 'Follow-up sequences, estimate reminders, and job confirmations — sent automatically so nothing slips.', color: 'bg-[#fff3d6] text-[#a06000]', Icon: IconMail },
  { title: 'Digital Crew Sheets', desc: 'Print-ready job sheets with colors, notes, and hours — financials hidden. Your crew gets what they need, nothing they shouldn\'t.', color: 'bg-[#ede9fe] text-[#6d28d9]', Icon: IconDocText },
]

const COMPARE_ROWS = [
  { feature: 'Job costing & margin tracking', pf: true, ps: false, dj: false },
  { feature: 'Live labor budget health',       pf: true, ps: false, dj: false },
  { feature: 'Crew efficiency scoring',        pf: true, ps: false, dj: false },
  { feature: 'Gmail lead sync',                pf: true, ps: true,  dj: false },
  { feature: 'Text & email automations',       pf: true, ps: true,  dj: true  },
  { feature: 'Invoicing with deposit logic',   pf: true, ps: true,  dj: true  },
]

function Check({ val }: { val: boolean }) {
  return val
    ? <span className="text-[#1d7a4a] font-bold">✓</span>
    : <span className="text-[#ccc]">—</span>
}

function CheckItem({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-2.5 text-sm text-[#0f1117]">
      <span className="w-4 h-4 rounded-full bg-[#e4f5ec] flex items-center justify-center shrink-0">
        <span className="text-[#1d7a4a] text-[9px] font-bold">✓</span>
      </span>
      {label}
    </li>
  )
}

export default function Landing() {
  const [annual, setAnnual] = useState(true)

  return (
    <div>

      {/* ── Hero ── */}
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
        <GetStartedButton
          plan="annual"
          label="Get Started — $79/mo"
          className="inline-flex items-center gap-2 bg-[#2563eb] text-white font-medium text-base px-7 py-3.5 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all"
        />
        <p className="text-sm text-[#5a5f72] mt-3">
          Billed annually — save $240/year.{' '}
          <a href="https://calendly.com/carstonroberts/30min" target="_blank" rel="noopener noreferrer" className="text-[#2563eb] hover:underline">
            Prefer a demo first? Book 30 min →
          </a>
        </p>
        <p className="text-xs text-[#5a5f72] mt-1">
          <a href="https://paintflow-crm.vercel.app/login" className="hover:underline">Already a customer? Log in →</a>
        </p>
      </div>

      {/* ── App mockup — Dashboard ── */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-[#f5f4f0] border border-black/10 rounded-2xl overflow-hidden shadow-sm">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-black/8 bg-white/60">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-[#5a5f72] font-medium">PaintFlow — Dashboard</span>
          </div>
          <div className="flex">
            {/* Sidebar */}
            <div className="w-44 bg-white border-r border-black/8 p-3 shrink-0 hidden md:block">
              <div className="flex items-center gap-2 px-2 py-2 mb-3">
                <div className="w-6 h-6 bg-[#2563eb] rounded-md flex items-center justify-center shrink-0">
                  <span className="text-white text-[10px] font-bold">P</span>
                </div>
                <span className="text-[11px] font-semibold text-[#0f1117]">PaintFlow</span>
              </div>
              {[
                { label: 'Dashboard', active: true },
                { label: 'Pipeline', active: false },
                { label: 'Jobs', active: false },
                { label: 'Clients', active: false },
                { label: 'Calendar', active: false },
                { label: 'Invoices', active: false },
                { label: 'Time Tracking', active: false },
                { label: 'Insights', active: false },
              ].map(item => (
                <div key={item.label} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg mb-0.5 ${item.active ? 'bg-[#eff6ff] text-[#2563eb]' : 'text-[#5a5f72]'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.active ? 'bg-[#2563eb]' : 'bg-[#d1d5db]'}`} />
                  <span className="text-[11px] font-medium">{item.label}</span>
                </div>
              ))}
            </div>
            {/* Main content */}
            <div className="flex-1 p-4 min-w-0">
              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {[
                  { label: 'Pipeline Value', val: '$84,200', sub: '+12% this month', up: true },
                  { label: 'Active Jobs', val: '7', sub: '3 on site now', up: true },
                  { label: 'Avg Margin', val: '38%', sub: 'Goal: 35%', up: true },
                  { label: 'Unpaid Invoices', val: '$14,800', sub: '3 outstanding', up: false },
                ].map(s => (
                  <div key={s.label} className="bg-white border border-black/8 rounded-xl p-3">
                    <div className="text-[9px] uppercase tracking-wider font-semibold text-[#5a5f72] mb-1">{s.label}</div>
                    <div className="font-[Syne] text-xl font-bold text-[#0f1117]">{s.val}</div>
                    <div className={`text-[10px] mt-0.5 ${s.up ? 'text-[#1d7a4a]' : 'text-[#a06000]'}`}>{s.sub}</div>
                  </div>
                ))}
              </div>
              {/* Pipeline preview */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'New Lead', count: 3, tagColor: 'bg-[#eff6ff] text-[#2563eb]', cards: [
                    { name: 'Henderson Exterior', val: '~$4,200', tag: 'From Gmail' },
                    { name: 'Maple St. Interior', val: '~$2,800', tag: 'New' },
                  ]},
                  { label: 'In Production', count: 2, tagColor: 'bg-[#e4f5ec] text-[#1d7a4a]', cards: [
                    { name: 'Whitmore Residence', val: '$6,400', tag: 'On Budget' },
                    { name: 'Cedar Ln. Cabinets', val: '$3,100', tag: 'Watch Labor' },
                  ]},
                  { label: 'Invoiced', count: 2, tagColor: 'bg-[#fff3d6] text-[#a06000]', cards: [
                    { name: 'Tanner Home', val: '$5,200', tag: '42% Margin' },
                  ]},
                ].map(col => (
                  <div key={col.label} className="bg-white border border-black/8 rounded-xl p-2.5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-[#5a5f72]">{col.label}</span>
                      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${col.tagColor}`}>{col.count}</span>
                    </div>
                    {col.cards.map(card => (
                      <div key={card.name} className="bg-[#f5f4f0] rounded-lg p-2 mb-1.5 last:mb-0">
                        <div className="text-[10px] font-semibold text-[#0f1117]">{card.name}</div>
                        <div className="text-[10px] text-[#5a5f72]">{card.val}</div>
                        <span className="inline-block text-[9px] font-medium px-1.5 py-0.5 rounded-full mt-1 bg-[#eff6ff] text-[#2563eb]">{card.tag}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Problem ── */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#2563eb] mb-3">The problem</div>
            <h2 className="font-[Syne] text-4xl font-extrabold tracking-tight leading-[1.1] text-[#0f1117] mb-5">
              You finish jobs<br />not knowing if<br />you made money.
            </h2>
            <p className="text-[#5a5f72] font-light leading-relaxed text-base mb-4">
              Most contractors track revenue, not cost. You quote 24 hours, the crew runs 31, and you don't find out until you're on the next job.
            </p>
            <p className="text-[#5a5f72] font-light leading-relaxed text-base">
              PaintFlow closes the loop — from estimate to final margin — so you know exactly where the money went on every job.
            </p>
          </div>

          {/* Job costing mockup */}
          <div className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-black/8 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#0f1117]">Whitmore Residence</div>
                <div className="text-[10px] text-[#5a5f72]">Exterior — 2,400 sq ft</div>
              </div>
              <span className="text-[10px] font-semibold bg-[#fff3d6] text-[#a06000] px-2.5 py-1 rounded-full">Watch Labor</span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2 mb-2 text-[10px] font-semibold text-[#5a5f72] uppercase tracking-wider">
                <div />
                <div className="text-center">Estimated</div>
                <div className="text-center">Actual</div>
              </div>
              {[
                { label: 'Labor Hours', est: '24h', act: '27.5h', over: true },
                { label: 'Materials', est: '$340', act: '$312', over: false },
                { label: 'Revenue', est: '$6,400', act: '$6,400', over: false },
              ].map(row => (
                <div key={row.label} className="grid grid-cols-3 gap-2 py-2 border-b border-black/6 last:border-0">
                  <div className="text-[11px] text-[#5a5f72]">{row.label}</div>
                  <div className="text-[11px] font-medium text-[#0f1117] text-center">{row.est}</div>
                  <div className={`text-[11px] font-semibold text-center ${row.over ? 'text-[#a06000]' : 'text-[#1d7a4a]'}`}>{row.act}</div>
                </div>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="bg-[#f5f4f0] rounded-lg p-3 text-center">
                  <div className="text-[10px] text-[#5a5f72] mb-0.5">Est. Margin</div>
                  <div className="font-[Syne] text-xl font-bold text-[#0f1117]">38%</div>
                </div>
                <div className="bg-[#fff3d6] rounded-lg p-3 text-center">
                  <div className="text-[10px] text-[#a06000] mb-0.5">Actual Margin</div>
                  <div className="font-[Syne] text-xl font-bold text-[#a06000]">31%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Pipeline spotlight ── */}
      <div className="bg-[#f5f4f0] border-y border-black/8 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 gap-12 items-center">
            {/* Pipeline mockup */}
            <div className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-black/8 flex items-center gap-2">
                <div className="text-xs font-semibold text-[#0f1117]">Sales Pipeline</div>
                <span className="ml-auto text-[10px] font-medium bg-[#e4f5ec] text-[#1d7a4a] px-2 py-0.5 rounded-full">Gmail sync active</span>
              </div>
              <div className="p-3 space-y-0">
                {[
                  { stage: 'New Lead', count: 3, color: 'bg-[#eff6ff] text-[#2563eb]', jobs: ['Henderson Exterior — $4,200', 'Maple St. Interior — $2,800'] },
                  { stage: 'Estimate Sent', count: 2, color: 'bg-[#fff3d6] text-[#a06000]', jobs: ['Park Ridge HOA — $18,500'] },
                  { stage: 'Deposit Paid', count: 1, color: 'bg-[#e4f5ec] text-[#1d7a4a]', jobs: ['Whitmore Residence — $6,400'] },
                  { stage: 'In Production', count: 2, color: 'bg-[#e4f5ec] text-[#1d7a4a]', jobs: ['Cedar Ln. Cabinets — $3,100'] },
                ].map(col => (
                  <div key={col.stage} className="flex items-start gap-3 py-2.5 border-b border-black/6 last:border-0">
                    <span className={`text-[9px] font-semibold px-2 py-1 rounded-full shrink-0 mt-0.5 ${col.color}`}>{col.count}</span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold text-[#0f1117] mb-1">{col.stage}</div>
                      {col.jobs.map(j => (
                        <div key={j} className="text-[10px] text-[#5a5f72] bg-[#f5f4f0] rounded px-2 py-1 mb-1 last:mb-0 truncate">{j}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#2563eb] mb-3">Pipeline</div>
              <h2 className="font-[Syne] text-4xl font-extrabold tracking-tight leading-[1.1] text-[#0f1117] mb-5">
                Every lead.<br />Every stage.<br />Nothing lost.
              </h2>
              <p className="text-[#5a5f72] font-light leading-relaxed text-base mb-6">
                Move jobs through 9 stages from first contact to invoice received. Gmail sync pulls new leads directly into your pipeline so nothing slips through.
              </p>
              <ul className="space-y-2.5">
                {['9-stage Kanban pipeline', 'Gmail auto-import for new leads', 'Deposit gates job scheduling', 'One-click estimate-to-job conversion'].map(item => (
                  <CheckItem key={item} label={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Crew time tracking spotlight ── */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#2563eb] mb-3">Crew Time Tracking</div>
            <h2 className="font-[Syne] text-4xl font-extrabold tracking-tight leading-[1.1] text-[#0f1117] mb-5">
              See your labor<br />budget in real time.
            </h2>
            <p className="text-[#5a5f72] font-light leading-relaxed text-base mb-6">
              Crew clocks in from their phone — no app install required. You see who's on site, how many hours are burned, and whether you're still on budget before it's too late to act.
            </p>
            <ul className="space-y-2.5">
              {['Mobile punch-in for crew', 'Live hours vs budget tracker', 'Labor budget warnings', 'Admin time log editing'].map(item => (
                <CheckItem key={item} label={item} />
              ))}
            </ul>
          </div>

          {/* Time tracking mockup */}
          <div className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-black/8">
              <div className="text-xs font-semibold text-[#0f1117]">Cedar Ln. Cabinets — Labor</div>
              <div className="flex items-center gap-2 mt-2.5">
                <div className="flex-1 h-1.5 bg-[#f5f4f0] rounded-full overflow-hidden">
                  <div className="h-full bg-[#f0a500] rounded-full" style={{ width: '87%' }} />
                </div>
                <span className="text-[10px] font-semibold text-[#a06000]">87%</span>
              </div>
              <div className="text-[10px] text-[#5a5f72] mt-1">13.9 of 16h budget used</div>
            </div>
            <div className="p-3">
              {[
                { name: 'Marcus K.', role: 'Lead Painter', hours: '5.5h today', active: true },
                { name: 'Tyler R.', role: 'Painter', hours: '4.2h today', active: true },
                { name: 'Devon W.', role: 'Painter', hours: '4.2h today', active: false },
              ].map(crew => (
                <div key={crew.name} className="flex items-center gap-3 py-2.5 border-b border-black/6 last:border-0">
                  <div className="w-7 h-7 rounded-full bg-[#eff6ff] flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-[#2563eb]">{crew.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold text-[#0f1117]">{crew.name}</div>
                    <div className="text-[10px] text-[#5a5f72]">{crew.role} · {crew.hours}</div>
                  </div>
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${crew.active ? 'bg-[#e4f5ec] text-[#1d7a4a]' : 'bg-[#f5f4f0] text-[#5a5f72]'}`}>
                    {crew.active ? 'On site' : 'Clocked out'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── All features grid ── */}
      <section className="bg-[#f5f4f0] border-y border-black/8 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#2563eb] mb-2.5">Everything included</div>
          <h2 className="font-[Syne] text-4xl font-extrabold tracking-tight leading-[1.12] text-[#0f1117] mb-3">
            Built for painting.<br />Not plumbing.
          </h2>
          <p className="text-[#5a5f72] font-light text-base max-w-md mb-9 leading-relaxed">
            No bloat. No features built for other trades. Just the tools that matter when you're running crews and closing jobs.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-white rounded-xl p-5 border border-black/8 hover:-translate-y-0.5 transition-transform">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${f.color}`}>
                  <f.Icon />
                </div>
                <div className="font-[Syne] text-sm font-bold mb-1.5">{f.title}</div>
                <p className="text-xs text-[#5a5f72] leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rate sheet CTA ── */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-[#eff6ff] border border-[#2563eb]/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-[Syne] font-bold text-lg text-[#0f1117] mb-1">Not sure what to charge in your state?</div>
            <p className="text-sm text-[#5a5f72] font-light">Free rate sheet — low, median, and high labor rates specific to your state and work type.</p>
          </div>
          <Link to="/resources/rate-calculator" className="shrink-0 bg-[#2563eb] text-white text-sm font-medium px-6 py-3 rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap">
            Get Free Rate Sheet →
          </Link>
        </div>
      </div>

      {/* ── Comparison ── */}
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

      {/* ── Pricing ── */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-[#0f1117] text-white rounded-2xl px-8 py-16 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#f0a500] mb-3">Pricing</div>
          <h2 className="font-[Syne] text-4xl font-extrabold tracking-tight mb-3">Simple, honest pricing.</h2>
          <p className="text-white/55 font-light text-base max-w-sm mx-auto mb-8">One plan. Everything included. No per-seat fees.</p>

          {/* Toggle */}
          <div className="inline-flex items-center bg-white/8 border border-white/12 rounded-xl p-1 mb-8 gap-1">
            <button
              onClick={() => setAnnual(true)}
              className={`text-sm font-medium px-5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${annual ? 'bg-white text-[#0f1117]' : 'text-white/60 hover:text-white'}`}
            >
              Annual
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${annual ? 'bg-[#e4f5ec] text-[#1d7a4a]' : 'bg-[#1d7a4a]/30 text-[#4ade80]'}`}>Best value</span>
            </button>
            <button
              onClick={() => setAnnual(false)}
              className={`text-sm font-medium px-5 py-2 rounded-lg transition-all cursor-pointer ${!annual ? 'bg-white text-[#0f1117]' : 'text-white/60 hover:text-white'}`}
            >
              Monthly
            </button>
          </div>

          <div className="bg-white/6 border border-white/12 rounded-xl p-8 max-w-sm mx-auto">
            <div className="flex items-end justify-center gap-1 mb-1">
              <div className="font-[Syne] text-6xl font-extrabold tracking-[-0.04em] text-white leading-none">${annual ? '79' : '99'}</div>
              <div className="text-white/45 text-sm mb-2">/mo</div>
            </div>
            <div className="text-white/45 text-sm mb-1">
              {annual ? 'billed as $948/year' : 'billed monthly, cancel anytime'}
            </div>
            {annual && <div className="text-[#4ade80] text-xs font-medium mb-6">You save $240/year</div>}
            {!annual && <div className="mb-6" />}
            <ul className="text-left mb-7 space-y-0">
              {[
                'Full pipeline & CRM',
                'Job costing & margin tracking',
                'Live labor time clock',
                'Smart estimating engine',
                'Invoicing & payment collection',
                'Text & email automations',
                'Gmail lead sync',
                'Unlimited jobs & clients',
              ].map(item => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-white/75 py-1.5 border-b border-white/7 last:border-0">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#f0a500] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <GetStartedButton
              plan={annual ? 'annual' : 'monthly'}
              className="flex items-center justify-center w-full bg-white text-[#0f1117] font-semibold text-sm py-3.5 rounded-xl hover:opacity-90 transition-opacity"
              label={annual ? 'Get Started — $948/year' : 'Get Started — $99/mo'}
            />
          </div>
        </div>
      </div>

    </div>
  )
}
