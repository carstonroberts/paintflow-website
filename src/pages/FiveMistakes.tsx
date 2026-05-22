import { useState } from 'react'
import { Link } from 'react-router-dom'

const FORMSPREE_MISTAKES = 'https://formspree.io/f/xnjllrga'

const MISTAKES = [
  {
    title: 'Not tracking actual vs estimated hours',
    body: 'You quote 20 hours, the job takes 26. You move on to the next job without knowing what happened. Six months later you wonder why the margins don\'t add up — it\'s because this is happening on every other job and you have no data to fix it. You can\'t manage what you don\'t measure.',
    fix: 'Track clocked hours against quoted hours on every job. After 10 jobs you\'ll know exactly which job types, crew members, or estimators are consistently running over — and by how much.',
  },
  {
    title: 'Estimating materials by gut feel',
    body: 'Most painters estimate paint by walking through a house and guessing. Sometimes you\'re right. Often you\'re not — and you\'re eating the difference. A 2,000 sq ft interior with 9-foot ceilings needs a specific amount of paint based on coverage rate and number of coats. Guessing means you\'re either over-buying or running short mid-job.',
    fix: 'Use square footage and your paint\'s actual coverage rate to calculate gallons needed for every job. Build it into your estimating process so it\'s automatic, not an afterthought.',
  },
  {
    title: 'Scheduling jobs before collecting a deposit',
    body: 'You close the job, add it to the calendar, order the materials, block your crew — and then the customer cancels or ghosts you. You\'ve burned a week of scheduling capacity and real money on materials for a job that never happened. Deposits aren\'t just about cash flow — they\'re a commitment filter.',
    fix: 'Make deposit collection a hard gate before any job gets scheduled. No deposit, no date on the calendar. Customers who won\'t pay a deposit won\'t value your time either.',
  },
  {
    title: 'Following up once and giving up',
    body: 'You send an estimate, the customer goes quiet, you follow up once and never hear back. You write it off as a lost lead. But research consistently shows most sales happen on the 5th to 8th follow-up — and most contractors give up after one or two. You\'re losing jobs not because customers said no, but because you stopped showing up.',
    fix: 'Build a follow-up sequence of at least 4–5 touchpoints over 2 weeks after every estimate. Text and email. Most of your "lost" leads just need a nudge.',
  },
  {
    title: 'Never doing a post-job analysis',
    body: 'Job done, invoice sent, on to the next one. No review of what you estimated vs what actually happened. This means every mistake — labor overruns, material underestimates, scope creep — gets repeated indefinitely. The most profitable painting companies treat every finished job as data. The rest just hope next time goes better.',
    fix: 'After every job, compare estimated vs actual hours, materials, and final margin. It takes 5 minutes and over time it\'s the single most powerful thing you can do to improve profitability.',
  },
]

export default function FiveMistakes() {
  const [shown, setShown] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({ firstName: false, email: false })
  const [loading, setLoading] = useState(false)

  async function submit() {
    const errs = {
      firstName: !firstName.trim(),
      email: !email.trim() || !email.includes('@'),
    }
    if (errs.firstName || errs.email) { setErrors(errs); return }

    setLoading(true)
    try {
      await fetch(FORMSPREE_MISTAKES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ first_name: firstName, email }),
      })
    } catch (_) {}

    setShown(true)
    setLoading(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="bg-[#f5f4f0] min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-[#fdf0ee] text-[#c0392b] text-xs font-medium px-4 py-1.5 rounded-full mb-5">
            ⚠️ Free Guide for Painting Contractors
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight leading-tight text-[#0f1117] mb-3">
            5 Mistakes Painters Make That<br />
            Cost Them Money on <em className="not-italic text-[#2563eb]">Every Job</em>
          </h1>
          <p className="text-[#5a5f72] font-light text-base max-w-lg mx-auto leading-relaxed">
            Most painting contractors are profitable on paper but bleeding money in ways they can't see. Here's exactly where it's going — and how to stop it.
          </p>
        </div>

        {/* Email gate */}
        {!shown && (
          <div className="bg-white border border-black/10 rounded-2xl p-8 mb-4">
            <div className="font-bold text-base mb-1">Get the free guide instantly</div>
            <p className="text-[13px] text-[#5a5f72] font-light mb-5">Enter your name and email to access all 5 mistakes — plus a fix for each one.</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={e => { setFirstName(e.target.value); setErrors(v => ({ ...v, firstName: false })) }}
                  className={`px-3.5 py-2.5 border-1.5 rounded-lg text-sm text-[#0f1117] bg-white outline-none transition-colors ${errors.firstName ? 'border-red-500' : 'border-black/10 focus:border-[#2563eb]'}`}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: false })) }}
                  className={`px-3.5 py-2.5 border-1.5 rounded-lg text-sm text-[#0f1117] bg-white outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-black/10 focus:border-[#2563eb]'}`}
                />
              </div>
            </div>
            <button
              onClick={submit}
              disabled={loading}
              className="w-full bg-[#2563eb] text-white font-medium text-base py-3.5 rounded-xl hover:opacity-90 disabled:opacity-60 transition-opacity cursor-pointer"
            >
              {loading ? 'Loading...' : 'Show Me the 5 Mistakes →'}
            </button>
            <p className="text-center text-xs text-[#5a5f72] mt-3">No spam. Just helpful resources for painting contractors.</p>
          </div>
        )}

        {/* Results */}
        {shown && (
          <div>
            <button
              onClick={() => setShown(false)}
              className="border-1.5 border-black/10 text-[#5a5f72] text-sm px-5 py-2.5 rounded-lg mb-4 hover:border-[#2563eb] hover:text-[#2563eb] transition-colors cursor-pointer bg-transparent"
            >
              ← Start Over
            </button>

            <div className="bg-[#0f1117] text-white rounded-2xl px-6 py-6 mb-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">Free Guide — PaintStride</div>
              <div className="text-xl font-extrabold tracking-tight mb-2">5 Mistakes Costing You Money on Every Job</div>
              <p className="text-white/55 text-sm font-light leading-relaxed">
                These aren't rare mistakes — they happen on almost every job at almost every painting company. The ones who fix them are the ones who actually scale.
              </p>
            </div>

            <div className="flex flex-col gap-3.5 mb-4">
              {MISTAKES.map((m, i) => (
                <div key={i} className="bg-white border border-black/10 rounded-xl p-6 flex gap-4">
                  <div className="text-3xl font-extrabold text-[#c0392b] opacity-20 leading-none shrink-0 w-9">{i + 1}</div>
                  <div className="flex-1">
                    <div className="font-bold text-base text-[#0f1117] mb-2">{m.title}</div>
                    <p className="text-sm text-[#5a5f72] font-light leading-relaxed mb-3">{m.body}</p>
                    <div className="flex items-start gap-2 bg-[#e4f5ec] rounded-lg px-3 py-2.5 text-[13px] text-[#1d7a4a] font-medium leading-relaxed">
                      <span className="font-bold shrink-0">The fix:</span>
                      <span className="font-normal">{m.fix}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pitch */}
            <div className="bg-[#0f1117] rounded-2xl px-8 py-10 text-center mb-6">
              <div className="font-extrabold text-xl text-white mb-3">PaintStride tracks all of this automatically.</div>
              <p className="text-white/60 font-light text-sm leading-relaxed max-w-md mx-auto mb-6">
                Every one of these mistakes is solved by having the right data in front of you. PaintStride was built by a painting contractor specifically to track job costing, labor budgets, deposit status, and post-job profitability — so you always know where your money is going.
              </p>
              <a
                href="https://calendly.com/carstonroberts/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-white text-[#0f1117] text-sm font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity mb-6"
              >
                See How PaintStride Works →
              </a>
              <div className="flex flex-wrap justify-center gap-2">
                {['Job costing', 'Live labor tracking', 'Deposit gates', 'Follow-up automations', 'Post-job analysis', '$99/month'].map(tag => (
                  <span key={tag} className="bg-white/8 border border-white/12 text-white/70 text-xs px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Link to="/resources/rate-calculator" className="text-sm text-[#2563eb] hover:underline">
                Also check out: Free Painting Rate Sheet for your state →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
