import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE, STATES, calcMultipliers, type WorkType, type CompanySize, type Experience } from '../data/stateRates'

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString()
}

function fmtDec(n: number) {
  return '$' + n.toFixed(2)
}

type Step = 'details' | 'email' | 'results'

interface FormState {
  state: string
  workType: WorkType
  companySize: CompanySize
  experience: Experience
  firstName: string
  email: string
}

interface RateResults {
  state: string
  region: string
  workType: WorkType
  companySize: CompanySize
  experience: Experience
  fm: number
  fsm: number
}

const FORMSPREE_RATE = 'https://formspree.io/f/xjgjjzev'

export default function RateCalculator() {
  const [step, setStep] = useState<Step>('details')
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormState>({
    state: '',
    workType: 'residential',
    companySize: 'small',
    experience: 'mid',
    firstName: '',
    email: '',
  })
  const [results, setResults] = useState<RateResults | null>(null)

  function set<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: undefined }))
  }

  function goToEmail() {
    if (!form.state) {
      setErrors({ state: 'Please select a state' })
      return
    }
    setStep('email')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function submit() {
    const errs: Partial<FormState> = {}
    if (!form.firstName.trim()) errs.firstName = 'Required'
    if (!form.email.trim() || !form.email.includes('@')) errs.email = 'Valid email required'
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      await fetch(FORMSPREE_RATE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          first_name: form.firstName,
          email: form.email,
          state: form.state,
          work_type: form.workType,
          company_size: form.companySize,
          years_in_business: form.experience,
        }),
      })
    } catch (_) {}

    const { fm, fsm, region } = calcMultipliers(form.state, form.workType, form.companySize, form.experience)
    setResults({ state: form.state, region, workType: form.workType, companySize: form.companySize, experience: form.experience, fm, fsm })
    setStep('results')
    setLoading(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const wtLabel   = form.workType === 'residential' ? 'Residential' : form.workType === 'commercial' ? 'Commercial' : 'Residential & Commercial'
  const sizeLabel = form.companySize === 'solo' ? 'Solo operator' : form.companySize === 'small' ? 'Small company' : 'Mid-size company'
  const expLabel  = form.experience === 'new' ? 'Under 2 years' : form.experience === 'mid' ? '2–7 years' : '7+ years'

  return (
    <div className="bg-[#f5f4f0] min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight leading-tight text-[#0f1117] mb-2">
            What should you charge for painting in{' '}
            <em className="not-italic text-[#2563eb]">{form.state || 'your state'}</em>?
          </h1>
          <p className="text-[#5a5f72] font-light text-base max-w-lg mx-auto leading-relaxed">
            Get a free rate sheet with low, median, and high labor rates, square footage pricing, and average job values — specific to your state and work type.
          </p>
        </div>

        {/* Step indicator */}
        {step !== 'results' && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className={`flex items-center gap-1.5 text-sm ${step === 'details' ? 'text-[#2563eb] font-medium' : 'text-[#1d7a4a]'}`}>
              <div className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[11px] font-semibold border-1.5 ${step === 'details' ? 'bg-[#2563eb] border-[#2563eb] text-white' : 'bg-[#1d7a4a] border-[#1d7a4a] text-white'}`}>
                {step === 'details' ? '1' : '✓'}
              </div>
              Your Details
            </div>
            <div className="w-8 h-px bg-black/10" />
            <div className={`flex items-center gap-1.5 text-sm ${step === 'email' ? 'text-[#2563eb] font-medium' : 'text-[#5a5f72]'}`}>
              <div className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[11px] font-semibold border-1.5 ${step === 'email' ? 'bg-[#2563eb] border-[#2563eb] text-white' : 'bg-[#f5f4f0] border-black/10'}`}>
                2
              </div>
              Get Results
            </div>
          </div>
        )}

        {/* Step 1: Details */}
        {step === 'details' && (
          <div className="bg-white border border-black/10 rounded-2xl p-8">
            <div className="font-bold text-base mb-5">Tell us about your business</div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium">Your State</label>
                <select
                  value={form.state}
                  onChange={e => set('state', e.target.value)}
                  className={`px-3.5 py-2.5 border-1.5 rounded-lg text-sm text-[#0f1117] bg-white outline-none transition-colors appearance-none cursor-pointer ${errors.state ? 'border-red-500' : 'border-black/10 focus:border-[#2563eb]'}`}
                >
                  <option value="">Select a state...</option>
                  {STATES.map(s => <option key={s}>{s}</option>)}
                </select>
                {errors.state && <span className="text-xs text-red-500">{errors.state}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium">Work Type</label>
                <select value={form.workType} onChange={e => set('workType', e.target.value as WorkType)} className="px-3.5 py-2.5 border-1.5 border-black/10 rounded-lg text-sm text-[#0f1117] bg-white outline-none focus:border-[#2563eb] transition-colors appearance-none cursor-pointer">
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium">Company Size</label>
                <select value={form.companySize} onChange={e => set('companySize', e.target.value as CompanySize)} className="px-3.5 py-2.5 border-1.5 border-black/10 rounded-lg text-sm text-[#0f1117] bg-white outline-none focus:border-[#2563eb] transition-colors appearance-none cursor-pointer">
                  <option value="solo">Solo (just me)</option>
                  <option value="small">Small (2–5 painters)</option>
                  <option value="medium">Medium (6–15 painters)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium">Years in Business</label>
                <select value={form.experience} onChange={e => set('experience', e.target.value as Experience)} className="px-3.5 py-2.5 border-1.5 border-black/10 rounded-lg text-sm text-[#0f1117] bg-white outline-none focus:border-[#2563eb] transition-colors appearance-none cursor-pointer">
                  <option value="new">Less than 2 years</option>
                  <option value="mid">2–7 years</option>
                  <option value="exp">7+ years</option>
                </select>
              </div>
            </div>
            <button onClick={goToEmail} className="w-full bg-[#2563eb] text-white font-medium text-base py-3.5 rounded-xl mt-2 hover:opacity-90 transition-opacity cursor-pointer">
              Next →
            </button>
          </div>
        )}

        {/* Step 2: Email */}
        {step === 'email' && (
          <div className="bg-white border border-black/10 rounded-2xl p-8">
            <div className="font-bold text-base mb-1.5">Almost there — who should we send this to?</div>
            <div className="grid grid-cols-2 gap-4 mb-4 mt-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  value={form.firstName}
                  onChange={e => set('firstName', e.target.value)}
                  className={`px-3.5 py-2.5 border-1.5 rounded-lg text-sm text-[#0f1117] bg-white outline-none transition-colors ${errors.firstName ? 'border-red-500' : 'border-black/10 focus:border-[#2563eb]'}`}
                />
                {errors.firstName && <span className="text-xs text-red-500">{errors.firstName}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  className={`px-3.5 py-2.5 border-1.5 rounded-lg text-sm text-[#0f1117] bg-white outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-black/10 focus:border-[#2563eb]'}`}
                />
                {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
              </div>
            </div>
            <button
              onClick={submit}
              disabled={loading}
              className="w-full bg-[#2563eb] text-white font-medium text-base py-3.5 rounded-xl mt-2 hover:opacity-90 disabled:opacity-60 transition-opacity cursor-pointer"
            >
              {loading ? 'Loading...' : 'Show My Rate Sheet →'}
            </button>
            <p className="text-center text-xs text-[#5a5f72] mt-3">No spam. Just helpful resources for painting contractors.</p>
          </div>
        )}

        {/* Results */}
        {step === 'results' && results && (
          <div>
            <button onClick={() => { setStep('details'); setResults(null) }} className="border-1.5 border-black/10 text-[#5a5f72] text-sm px-5 py-2.5 rounded-lg mb-4 hover:border-[#2563eb] hover:text-[#2563eb] transition-colors cursor-pointer bg-transparent">
              ← Start Over
            </button>

            {/* Results header */}
            <div className="bg-[#0f1117] text-white rounded-2xl px-6 py-6 mb-3 flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="text-xl font-extrabold tracking-tight">Painting Rates — {results.state}</div>
                <div className="text-white/50 text-[13px] mt-1">{wtLabel} · {sizeLabel} · {expLabel} · Based on BLS 2024 data</div>
              </div>
              <span className="text-white/80 text-xs bg-white/10 border border-white/15 px-3 py-1 rounded-full">{results.region}</span>
            </div>

            {/* Rate cards */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {[
                { label: 'Hourly Labor Rate', rows: [
                  { name: 'Low end',  val: fmt(BASE.laborLow  * results.fm) + '/hr', cls: 'text-[#a06000]' },
                  { name: 'Median',   val: fmt(BASE.laborMed  * results.fm) + '/hr', cls: 'text-[#0f1117]' },
                  { name: 'High end', val: fmt(BASE.laborHigh * results.fm) + '/hr', cls: 'text-[#1d7a4a]' },
                ]},
                { label: 'Interior (per sq ft)', rows: [
                  { name: 'Low end',  val: fmtDec(BASE.intSqftLow  * results.fsm) + '/sq ft', cls: 'text-[#a06000]' },
                  { name: 'Median',   val: fmtDec(BASE.intSqftMed  * results.fsm) + '/sq ft', cls: 'text-[#0f1117]' },
                  { name: 'High end', val: fmtDec(BASE.intSqftHigh * results.fsm) + '/sq ft', cls: 'text-[#1d7a4a]' },
                ]},
                { label: 'Exterior (per sq ft)', rows: [
                  { name: 'Low end',  val: fmtDec(BASE.extSqftLow  * results.fsm) + '/sq ft', cls: 'text-[#a06000]' },
                  { name: 'Median',   val: fmtDec(BASE.extSqftMed  * results.fsm) + '/sq ft', cls: 'text-[#0f1117]' },
                  { name: 'High end', val: fmtDec(BASE.extSqftHigh * results.fsm) + '/sq ft', cls: 'text-[#1d7a4a]' },
                ]},
                { label: 'Average Job Value', rows: [
                  { name: 'Low end',  val: fmt(BASE.jobLow  * results.fm), cls: 'text-[#a06000]' },
                  { name: 'Median',   val: fmt(BASE.jobMed  * results.fm), cls: 'text-[#0f1117]' },
                  { name: 'High end', val: fmt(BASE.jobHigh * results.fm), cls: 'text-[#1d7a4a]' },
                ]},
              ].map(card => (
                <div key={card.label} className="bg-white border border-black/10 rounded-xl p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5a5f72] mb-3">{card.label}</div>
                  {card.rows.map(row => (
                    <div key={row.name} className="flex justify-between items-center py-1.5 border-b border-black/10 last:border-0 text-[13px]">
                      <span className="text-[#5a5f72]">{row.name}</span>
                      <span className={`font-bold text-sm tracking-tight ${row.cls}`}>{row.val}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Insight */}
            <div className="bg-[#eff6ff] border border-[#2563eb]/15 rounded-xl p-5 mb-3 text-sm leading-relaxed text-[#0f1117]">
              {results.region === 'Pacific' || (STATE_DATA_INLINE[results.state]?.laborMult ?? 1) >= 1.15
                ? <><strong className="text-[#2563eb]">{results.state} is a high-labor-cost market.</strong> Rates here run significantly above the national median — which is good news for your margins if you're pricing competitively. The gap between low and high end is wide, meaning there's real room to move up-market with premium positioning.</>
                : (STATE_DATA_INLINE[results.state]?.laborMult ?? 1) <= 0.85
                ? <><strong className="text-[#2563eb]">{results.state} is a price-competitive market.</strong> Rates tend to run below the national median, which means efficiency and job costing matter even more. Knowing your exact cost per job is the difference between a profitable business and one that's working hard for nothing.</>
                : <><strong className="text-[#2563eb]">{results.state} tracks close to the national median.</strong> You have flexibility to price at or above market if you differentiate on quality and reliability. Contractors who track their actual job costs consistently find they can raise prices without losing customers.</>
              }
            </div>

            {/* Pitch */}
            <div className="bg-white border border-black/10 rounded-2xl p-8 mb-4">
              <div className="font-extrabold text-lg mb-2">Knowing the rate is only half the battle.</div>
              <p className="text-[#5a5f72] font-light text-sm leading-relaxed mb-5">
                Most painting contractors know what they <em>should</em> charge — but have no idea if they're actually hitting those numbers on every job. Labor runs over by 15%, materials get under-quoted, and by the time the job is done you're not sure if you made money or lost it.<br /><br />
                PaintFlow tracks your estimated vs actual hours, materials, and margin on every single job. You'll know your real profitability — not just your hoped-for profitability.
              </p>
              <a
                href="https://calendly.com/carstonroberts/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
              >
                See How PaintFlow Works →
              </a>
            </div>

            <p className="text-center text-xs text-[#5a5f72] mb-6">
              Data sourced from U.S. Bureau of Labor Statistics (BLS) Occupational Employment & Wage Statistics, May 2024. Square footage rates derived from regional market data.
            </p>

            <div className="text-center">
              <Link to="/resources/5-mistakes" className="text-sm text-[#2563eb] hover:underline">
                Also read: 5 Mistakes Painters Make That Cost Them Money on Every Job →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Inline lookup for insight card (avoids re-importing full map)
import { STATE_DATA as STATE_DATA_INLINE } from '../data/stateRates'
