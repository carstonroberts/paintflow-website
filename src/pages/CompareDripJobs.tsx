import { useState, useEffect } from 'react';


const ACCENT = '#2563eb';
const DEMO_URL = 'https://calendly.com/carstonroberts/30min';

function CheckIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#22c55e" fillOpacity="0.14" />
      <path d="M6 10l3 3 5-5" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CrossIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#e5e7eb" fillOpacity="0.7" />
      <path d="M7 7l6 6M13 7l-6 6" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(15,17,23,0.08)',
      transition: 'box-shadow 0.2s',
      boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.07)' : 'none',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src="/logo.png" alt="PaintStride" style={{ width: 32, height: 32, borderRadius: 8 }} />
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.03em', color: '#0f1117' }}>
            Paint<span style={{ color: ACCENT }}>Stride</span>
          </span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 13, color: '#5a5f72', textDecoration: 'none', fontWeight: 500 }}
            className="cmp-hide-mobile">
            Free Demo
          </a>
          <button
            onClick={() => window.location.href = 'https://app.paintstride.com/login'}
            style={{ fontSize: 13, color: '#5a5f72', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}
            className="cmp-hide-mobile">
            Log in
          </button>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer"
            style={{
              background: ACCENT, color: '#fff', fontSize: 13, fontWeight: 600,
              padding: '9px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
              letterSpacing: '-0.01em', textDecoration: 'none',
            }}>
            Schedule a Free Demo →
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="cmp-hero-bg" style={{ padding: '88px 24px 80px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="cmp-fade-up cmp-fade-up-1" style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(59,130,246,0.15)',
            border: '1px solid rgba(59,130,246,0.3)',
            color: '#93c5fd',
            fontSize: 12, fontWeight: 600,
            padding: '6px 14px', borderRadius: 100,
            letterSpacing: '0.01em',
          }}>
            <span className="cmp-pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#93c5fd', display: 'inline-block' }} />
            PaintStride vs DripJobs · Honest comparison
          </div>
        </div>

        <h1 className="cmp-fade-up cmp-fade-up-2" style={{
          textAlign: 'center', fontSize: 'clamp(38px, 6vw, 68px)',
          fontWeight: 900, letterSpacing: '-0.04em',
          lineHeight: 1.03, color: '#ffffff',
          maxWidth: 940, margin: '0 auto 22px',
        }}>
          They help you follow up.<br />
          <span style={{ color: '#fbbf24' }}>We help you make money.</span>
        </h1>

        <p className="cmp-fade-up cmp-fade-up-3" style={{
          textAlign: 'center', fontSize: 18, fontWeight: 300,
          color: 'rgba(255,255,255,0.7)',
          maxWidth: 660, margin: '0 auto 40px', lineHeight: 1.65,
        }}>
          DripJobs is built around sales automation — drip sequences, two-way texting, review requests. PaintStride goes further: real job costing, live labor tracking, and post-job profitability. Here's the honest comparison.
        </p>

        <div className="cmp-fade-up cmp-fade-up-4 cmp-verdict-grid" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
          maxWidth: 820, margin: '0 auto',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16, padding: '22px 24px',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>DripJobs</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 6, letterSpacing: '-0.01em' }}>Sales automation engine</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>Drip sequences, 40+ message templates, two-way texting, automated review requests. Great for shops that lose deals to slow follow-up.</div>
          </div>
          <div style={{
            background: 'rgba(37,99,235,0.18)',
            border: '1px solid rgba(59,130,246,0.4)',
            borderRadius: 16, padding: '22px 24px',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#93c5fd', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>PaintStride</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 6, letterSpacing: '-0.01em' }}>Operations + profitability system</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55 }}>Job costing, live labor tracking, payroll export, crew efficiency, post-job margin. Built and run by an actual painting contractor.</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <a href="#feature-table" style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontWeight: 500 }}>
            Jump to feature comparison ↓
          </a>
        </div>
      </div>
    </section>
  );
}

function SummaryStrip() {
  return (
    <section style={{ background: '#0b0f1a', padding: '0 24px 64px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          background: '#fff', borderRadius: 20,
          padding: 36, transform: 'translateY(-40px)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
          border: '1px solid rgba(0,0,0,0.06)',
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: ACCENT, marginBottom: 14, textAlign: 'center' }}>The 30-Second Verdict</div>
          <div className="cmp-stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 28 }}>
            {[
              { icon: '📨', title: 'If your problem is follow-up', body: "DripJobs is purpose-built for drip sequences and review requests. They've focused there for years." },
              { icon: '💰', title: 'If your problem is profit', body: 'DripJobs has no job costing, no labor tracking, no payroll. PaintStride was built specifically for this.' },
              { icon: '🛠️', title: 'If reliability matters', body: 'DripJobs reviews call out frequent bugs and 6am notification firings. PaintStride is built and used daily by a painter.' },
            ].map(c => (
              <div key={c.title}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f1117', marginBottom: 6, letterSpacing: '-0.01em' }}>{c.title}</div>
                <div style={{ fontSize: 13, color: '#5a5f72', lineHeight: 1.6, fontWeight: 400 }}>{c.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type CellValue = 'yes' | 'no' | 'partial';
type Row = { feature: string; pf: CellValue; dj: CellValue; note?: string; highlight?: boolean };
type Group = { group: string; rows: Row[] };

const COMPARE_GROUPS: Group[] = [
  {
    group: 'Sales & Follow-up Automation',
    rows: [
      { feature: 'Automated drip sequences for leads', pf: 'partial', dj: 'yes', note: 'DripJobs is purpose-built around this; PaintStride has follow-ups but fewer templates today' },
      { feature: '40+ pre-built text & email templates', pf: 'partial', dj: 'yes', note: 'DripJobs has the deepest template library' },
      { feature: 'Outbound SMS automation', pf: 'yes', dj: 'yes' },
      { feature: 'Automated review requests post-job', pf: 'yes', dj: 'yes' },
      { feature: 'Appointment reminders', pf: 'yes', dj: 'yes' },
      { feature: 'Send-time controls (no 6am texts)', pf: 'yes', dj: 'no' },
    ],
  },
  {
    group: 'CRM & Pipeline',
    rows: [
      { feature: 'Visual pipeline / deal stages', pf: 'yes', dj: 'yes' },
      { feature: 'Meta / Google / web lead capture', pf: 'yes', dj: 'partial' },
      { feature: '9-stage pipeline, optimized for painting', pf: 'yes', dj: 'partial' },
    ],
  },
  {
    group: 'Job Costing & Profitability',
    rows: [
      { feature: 'Live labor budget health indicator', pf: 'yes', dj: 'no', highlight: true },
      { feature: 'Crew time clock (mobile web)', pf: 'yes', dj: 'no', highlight: true },
      { feature: 'Estimated vs actual hours per job', pf: 'yes', dj: 'partial', note: 'DripJobs offers a Job Costing add-on at $49/mo on Pro/Advanced plans', highlight: true },
      { feature: 'Post-job profitability analysis', pf: 'yes', dj: 'partial', note: 'Available via DripJobs Job Costing add-on ($49/mo)', highlight: true },
      { feature: 'Crew efficiency scoring', pf: 'yes', dj: 'no', highlight: true },
      { feature: 'Payroll export', pf: 'yes', dj: 'no', highlight: true },
    ],
  },
  {
    group: 'Payments & Operations',
    rows: [
      { feature: 'Invoicing & payment collection', pf: 'yes', dj: 'yes' },
      { feature: 'Built-in payment collection', pf: 'yes', dj: 'yes' },
      { feature: 'Deposit-gated job scheduling', pf: 'yes', dj: 'no' },
      { feature: 'Digital crew sheets (financials hidden)', pf: 'yes', dj: 'no' },
    ],
  },
  {
    group: 'Platform & Reliability',
    rows: [
      { feature: 'Mobile-optimized web app (no install)', pf: 'yes', dj: 'partial', note: 'DripJobs has native iOS/Android apps; PaintStride works in any mobile browser with no download' },
      { feature: 'Low learning curve / quick setup', pf: 'yes', dj: 'partial' },
      { feature: 'Built by an active painting contractor', pf: 'yes', dj: 'no' },
    ],
  },
];

function Cell({ value }: { value: CellValue }) {
  if (value === 'yes') return <CheckIcon />;
  if (value === 'no') return <CrossIcon />;
  return (
    <span style={{ fontSize: 11, fontWeight: 700, color: '#d97706', background: 'rgba(217,119,6,0.1)', padding: '3px 9px', borderRadius: 100 }}>partial</span>
  );
}

function FeatureTable() {
  return (
    <section id="feature-table" style={{ padding: '40px 24px 88px', background: '#fff' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: ACCENT, marginBottom: 12 }}>Feature by Feature</div>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.07, color: '#0f1117', marginBottom: 12 }}>
            The full breakdown.
          </h2>
          <p style={{ fontSize: 15, color: '#5a5f72', fontWeight: 300, maxWidth: 560, margin: '0 auto', lineHeight: 1.65 }}>
            We tried to be fair. Where DripJobs is better, we said so. Where it doesn't compete, we said that too.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 22, flexWrap: 'wrap', marginBottom: 24, fontSize: 12, color: '#6b7280' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CheckIcon size={14} /> Included</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CrossIcon size={14} /> Not available</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#d97706', background: 'rgba(217,119,6,0.1)', padding: '2px 7px', borderRadius: 100 }}>partial</span>
            Limited support
          </span>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 140px 140px',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          position: 'sticky', top: 60, background: '#fff', zIndex: 5,
          padding: '14px 4px',
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', paddingLeft: 16 }}>Feature</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: ACCENT, letterSpacing: '-0.01em' }}>PaintStride</div>
            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>$99 flat</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#374151', letterSpacing: '-0.01em' }}>DripJobs</div>
            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>+$50/user</div>
          </div>
        </div>

        {COMPARE_GROUPS.map(grp => (
          <div key={grp.group} style={{ marginBottom: 6 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
              color: '#9ca3af', padding: '20px 16px 10px',
              borderBottom: '1px solid rgba(0,0,0,0.05)',
            }}>{grp.group}</div>
            {grp.rows.map(row => (
              <div key={row.feature} className="cmp-compare-row" style={{
                display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 140px 140px',
                padding: '14px 4px',
                borderBottom: '1px solid rgba(0,0,0,0.04)',
                background: row.highlight ? 'rgba(37,99,235,0.025)' : 'transparent',
                alignItems: 'center',
              }}>
                <div style={{ paddingLeft: 16 }}>
                  <div style={{ fontSize: 14, color: '#0f1117', fontWeight: row.highlight ? 600 : 500, lineHeight: 1.4 }}>
                    {row.highlight && <span style={{ display: 'inline-block', width: 6, height: 6, background: ACCENT, borderRadius: '50%', marginRight: 8, verticalAlign: 'middle' }} />}
                    {row.feature}
                  </div>
                  {row.note && (
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4, lineHeight: 1.45, fontWeight: 400 }}>{row.note}</div>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}><Cell value={row.pf} /></div>
                <div style={{ display: 'flex', justifyContent: 'center' }}><Cell value={row.dj} /></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function BestForSection() {
  const card = (
    heading: string,
    color: string,
    bg: string,
    borderColor: string,
    items: string[],
    footer: string,
  ) => (
    <div style={{
      background: bg, borderRadius: 20, padding: 32,
      border: `1px solid ${borderColor}`,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color, marginBottom: 14 }}>Who it's for</div>
      <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', color: '#0f1117', marginBottom: 20, lineHeight: 1.2 }}>{heading}</h3>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 22 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#374151', lineHeight: 1.55 }}>
            <span style={{ color, fontWeight: 800, fontSize: 16, lineHeight: 1.3, flexShrink: 0 }}>→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 'auto', paddingTop: 18, borderTop: `1px dashed ${borderColor}`, fontSize: 12, color: '#6b7280', fontStyle: 'italic', lineHeight: 1.5 }}>{footer}</div>
    </div>
  );

  return (
    <section style={{ padding: '88px 24px', background: '#f8f9fb', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: ACCENT, marginBottom: 12 }}>The Honest Take</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.07, color: '#0f1117', marginBottom: 12 }}>
            Pick the one that matches how you run.
          </h2>
          <p style={{ fontSize: 15, color: '#5a5f72', fontWeight: 300, maxWidth: 500, margin: '0 auto', lineHeight: 1.65 }}>
            Both are real tools. They just optimize for different parts of the contractor's job.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {card(
            'DripJobs is best if…',
            '#7c3aed',
            '#fff',
            'rgba(0,0,0,0.08)',
            [
              "Your #1 problem is losing leads to slow follow-up — and you want every drip, reminder, and review request automated.",
              'You want a deep library of pre-written text/email templates out of the box.',
              "You handle most ops in your head and don't need formal job costing yet.",
              "You're a 1-person shop and the $50/user surcharge isn't a factor.",
              "You're willing to live with a few rough edges to get the follow-up workflow.",
            ],
            "Strong fit for solo operators who close on speed-to-lead and don't yet need to track labor or margin.",
          )}
          {card(
            'PaintStride is best if…',
            ACCENT,
            '#fff',
            `${ACCENT}55`,
            [
              "You're done finishing jobs and not knowing if you made money.",
              "You run multiple crews and need live labor tracking, payroll, and crew efficiency scoring in one place.",
              'You want predictable flat pricing — $99/mo no matter the team size.',
              "Reliability matters: you don't want texts firing at 6am or buttons that don't work.",
              'You want a tool built and used daily by an actual painting contractor.',
            ],
            'Strong fit for owners who already follow up fine — they need the operations + profit side to keep up.',
          )}
        </div>
      </div>
    </section>
  );
}

function PricingCompare() {
  return (
    <section style={{ padding: '88px 24px', background: '#fff' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: ACCENT, marginBottom: 12 }}>Pricing</div>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.07, color: '#0f1117', marginBottom: 12 }}>
            One flat rate.<br />No per-seat fees.
          </h2>
          <p style={{ fontSize: 15, color: '#5a5f72', fontWeight: 300, maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
            PaintStride is <strong style={{ color: '#0f1117' }}>$99/mo</strong> flat — no matter how many crew members, estimators, or office staff you add. Or save $240/year with an annual plan at $79/mo.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {[
            { name: 'PaintStride', price: '$99', sub: '/mo · unlimited users', note: 'or $79/mo billed annually', highlight: true, features: ['Full pipeline & job costing', 'Live labor time clock', 'Text & email automations', 'Invoicing & payment collection', 'Meta/Google/website lead sync', 'Unlimited crew & clients'] },
            { name: 'DripJobs', price: '$97+', sub: '/mo · Pro plan', note: 'Feature-based tiering; see dripjobs.com for current pricing', highlight: false, features: ['Sales automation & drip sequences', '40+ message templates', 'Automated review requests', 'Basic pipeline', 'Job costing available as $49/mo add-on', 'No live labor tracking'] },
          ].map(plan => (
            <div key={plan.name} style={{
              borderRadius: 20, padding: 28,
              background: plan.highlight ? ACCENT : '#f8f9fb',
              border: plan.highlight ? 'none' : '1px solid rgba(0,0,0,0.08)',
              boxShadow: plan.highlight ? `0 8px 40px ${ACCENT}33` : 'none',
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: plan.highlight ? 'rgba(255,255,255,0.7)' : '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{plan.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 40, fontWeight: 900, letterSpacing: '-0.04em', color: plan.highlight ? '#fff' : '#0f1117' }}>{plan.price}</span>
                <span style={{ fontSize: 13, color: plan.highlight ? 'rgba(255,255,255,0.6)' : '#9ca3af' }}>{plan.sub}</span>
              </div>
              <div style={{ fontSize: 12, color: plan.highlight ? 'rgba(255,255,255,0.55)' : '#9ca3af', marginBottom: 24 }}>{plan.note}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: plan.highlight ? 'rgba(255,255,255,0.85)' : '#374151' }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', background: plan.highlight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="8" height="8" viewBox="0 0 20 20" fill="none">
                        <path d="M5 10l4 4 6-6" stroke={plan.highlight ? '#fff' : '#6b7280'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 20, fontSize: 12, color: '#9ca3af', textAlign: 'center', lineHeight: 1.6 }}>
          DripJobs pricing is feature-tiered; see <a href="https://dripjobs.com" target="_blank" rel="noopener noreferrer" style={{ color: '#9ca3af' }}>dripjobs.com</a> for current plans. PaintStride's $99/mo is flat for all features and unlimited users.
        </p>
      </div>
    </section>
  );
}

function ReliabilitySection() {
  const complaints = [
    { tag: 'Send-time controls', body: 'PaintStride lets you control when automations fire — no surprise texts going out at 6am.' },
    { tag: 'Steep learning curve', body: 'DripJobs has a deep feature set that takes time to configure. PaintStride is designed to be running within an hour.' },
    { tag: 'Built for painters', body: 'PaintStride is built and used daily by an active painting contractor — every feature ships because it solves a real problem on real jobs.' },
  ];

  return (
    <section style={{ background: '#0b0f1a', padding: '88px 24px', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '70%', transform: 'translate(-50%,-50%)', width: 600, height: 400, background: `radial-gradient(ellipse, ${ACCENT}25 0%, transparent 65%)`, filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 56, alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 100, marginBottom: 20 }}>
              <span className="cmp-pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#fca5a5', display: 'inline-block' }} />
              Where PaintStride fits better
            </div>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#fff', marginBottom: 18 }}>
              Software your crew<br />actually trusts.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontWeight: 300, marginBottom: 24 }}>
              DripJobs is a mature sales automation platform. The tradeoff: more complexity to configure, and no native job costing. PaintStride's focus is on what happens after the sale — labor tracking, margin, and crew efficiency.
            </p>
            <div style={{
              background: 'rgba(37,99,235,0.12)',
              border: '1px solid rgba(59,130,246,0.3)',
              borderRadius: 16, padding: '20px 22px',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>The PaintStride approach</div>
              <div style={{ fontSize: 14, color: '#fff', fontWeight: 600, marginBottom: 8, lineHeight: 1.5 }}>Built by a painter, used on real jobs every day.</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                Carston runs PaintStride on his own painting business. If something breaks, it breaks for him too — and gets fixed the same day. Notifications respect send-time windows. The app is fast because it has to be.
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {complaints.map(c => (
              <div key={c.tag} className="cmp-glitch" style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(239,68,68,0.18)',
                borderRadius: 14, padding: '16px 20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>⚠️</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#fca5a5', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.tag}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55 }}>{c.body}</div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.55, padding: '4px 4px 0', fontStyle: 'italic' }}>
              Sources: aggregated from public DripJobs reviews on third-party software directories, 2024–2025.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HonestyStrip() {
  return (
    <section style={{ padding: '64px 24px', background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div style={{
          background: '#fffaf0',
          border: '1px solid #fed7aa',
          borderRadius: 20, padding: '28px 32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, flexWrap: 'wrap' }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'rgba(217,119,6,0.15)', color: '#d97706',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, flexShrink: 0,
            }}>⚖️</div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>To be fair</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f1117', marginBottom: 10, letterSpacing: '-0.01em' }}>Where DripJobs still wins.</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  'Their drip-sequence engine has been refined for years — more depth than what we ship today.',
                  'The 40+ pre-built text and email template library is genuinely useful out of the box.',
                  'Two-way texting that separates business from personal is a clean built-in feature.',
                  "We're a newer, smaller company — DripJobs has a larger install base and more community content.",
                ].map((line, i) => (
                  <li key={i} style={{ fontSize: 13, color: '#5a5f72', lineHeight: 1.6, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#d97706', fontWeight: 700, flexShrink: 0 }}>•</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="cmp-hero-bg" style={{ padding: '96px 24px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 100, marginBottom: 22 }}>
          <span className="cmp-pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#93c5fd', display: 'inline-block' }} />
          30-minute demo · No commitment
        </div>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, color: '#fff', marginBottom: 18 }}>
          See it on <span style={{ color: '#fbbf24' }}>your own jobs.</span>
        </h2>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, fontWeight: 300, maxWidth: 540, margin: '0 auto 36px' }}>
          We'll walk through your last 3 jobs together and show you exactly what PaintStride would have told you about labor, margin, and crew performance.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 24 }}>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer"
            style={{
              background: ACCENT, color: '#fff', fontWeight: 700, fontSize: 16,
              padding: '16px 36px', borderRadius: 14, border: 'none', cursor: 'pointer',
              boxShadow: `0 4px 24px ${ACCENT}77`,
              letterSpacing: '-0.02em', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
            Schedule a Free Demo →
          </a>
          <a href="/"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', fontWeight: 600, fontSize: 15,
              padding: '16px 28px', borderRadius: 14, cursor: 'pointer',
              textDecoration: 'none', backdropFilter: 'blur(8px)',
            }}>
            See full PaintStride tour
          </a>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 28, flexWrap: 'wrap', fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
          <span>✓ Cancel anytime</span>
          <span>✓ Same day setup</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: '#0b0f1a', padding: '36px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo.png" alt="" style={{ width: 24, height: 24, borderRadius: 6 }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
            Paint<span style={{ color: '#93c5fd' }}>Stride</span>
          </span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginLeft: 6 }}>© 2026</span>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, maxWidth: 520, textAlign: 'right' }}>
          Comparison reflects publicly available information and aggregated third-party reviews about DripJobs as of May 2026. DripJobs is a trademark of its respective owner; we're not affiliated.
        </div>
      </div>
    </footer>
  );
}

const styles = `
  @keyframes cmp-fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes cmp-pulseDot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  @keyframes cmp-glitch {
    0%, 90%, 100% { transform: translate(0); opacity: 1; }
    92% { transform: translate(-2px, 1px); opacity: 0.8; }
    94% { transform: translate(2px, -1px); opacity: 0.6; }
    96% { transform: translate(-1px, -1px); opacity: 0.9; }
    98% { transform: translate(1px, 1px); opacity: 0.7; }
  }
  .cmp-fade-up { animation: cmp-fadeUp 0.55s ease both; }
  .cmp-fade-up-1 { animation-delay: 0.05s; }
  .cmp-fade-up-2 { animation-delay: 0.15s; }
  .cmp-fade-up-3 { animation-delay: 0.25s; }
  .cmp-fade-up-4 { animation-delay: 0.35s; }
  .cmp-pulse-dot { animation: cmp-pulseDot 2s ease-in-out infinite; }
  .cmp-glitch { animation: cmp-glitch 4s infinite; }
  .cmp-hero-bg {
    background:
      radial-gradient(ellipse 80% 50% at 20% 40%, oklch(0.32 0.12 260 / 0.5) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 60%, oklch(0.25 0.08 260 / 0.3) 0%, transparent 55%),
      #0b0f1a;
  }
  .cmp-compare-row:hover { background: #f8faff !important; }

  .cmp-range { -webkit-appearance: none; appearance: none; background: transparent; }
  .cmp-range::-webkit-slider-runnable-track { height: 6px; background: #e5e7eb; border-radius: 100px; }
  .cmp-range::-moz-range-track { height: 6px; background: #e5e7eb; border-radius: 100px; }
  .cmp-range::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none;
    width: 22px; height: 22px; border-radius: 50%;
    background: #2563eb; border: 3px solid #fff;
    box-shadow: 0 2px 8px rgba(37,99,235,0.4);
    margin-top: -8px; cursor: pointer;
  }
  .cmp-range::-moz-range-thumb {
    width: 22px; height: 22px; border-radius: 50%;
    background: #2563eb; border: 3px solid #fff;
    box-shadow: 0 2px 8px rgba(37,99,235,0.4);
    cursor: pointer;
  }

  @media (max-width: 640px) {
    .cmp-hide-mobile { display: none !important; }
    .cmp-stack-mobile { grid-template-columns: 1fr !important; }
    .cmp-verdict-grid { grid-template-columns: 1fr !important; }
  }
`;

export default function CompareDripJobs() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'PaintStride vs DripJobs — Which is Right for Your Painting Business?';
    return () => { document.title = prevTitle; };
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div style={{ fontFamily: "'Inter', sans-serif", color: '#0f1117', background: '#fff', WebkitFontSmoothing: 'antialiased' }}>
        <Nav />
        <Hero />
        <SummaryStrip />
        <FeatureTable />
        <BestForSection />
        <PricingCompare />
        <ReliabilitySection />
        <HonestyStrip />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
