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
function AddonIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#fbbf24" fillOpacity="0.18" />
      <path d="M10 6v8M6 10h8" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" />
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
          <img src="/logo.png" alt="PaintFlow" style={{ width: 32, height: 32, borderRadius: 8 }} />
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.03em', color: '#0f1117' }}>
            Paint<span style={{ color: ACCENT }}>Flow</span>
          </span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 13, color: '#5a5f72', textDecoration: 'none', fontWeight: 500 }}
            className="cmp-hide-mobile">
            Free Demo
          </a>
          <button
            onClick={() => window.location.href = 'https://app.getpaintflow.com/login'}
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
            PaintFlow vs PaintScout · Honest comparison
          </div>
        </div>

        <h1 className="cmp-fade-up cmp-fade-up-2" style={{
          textAlign: 'center', fontSize: 'clamp(38px, 6vw, 68px)',
          fontWeight: 900, letterSpacing: '-0.04em',
          lineHeight: 1.03, color: '#ffffff',
          maxWidth: 900, margin: '0 auto 22px',
        }}>
          Great at Estimates.<br />
          <span style={{ color: '#fbbf24' }}>Silent on Profitability.</span>
        </h1>

        <p className="cmp-fade-up cmp-fade-up-3" style={{
          textAlign: 'center', fontSize: 18, fontWeight: 300,
          color: 'rgba(255,255,255,0.7)',
          maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.65,
        }}>
          PaintScout builds beautiful, dynamic estimates. PaintFlow tells you whether those estimates actually made you money. Here's an honest look at where each one wins — and where they don't.
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
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>PaintScout</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 6, letterSpacing: '-0.01em' }}>Best-in-class estimating tool</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>Dynamic quotes, production rates, real-time customer pricing — if you live in the estimate stage, it's hard to beat.</div>
          </div>
          <div style={{
            background: 'rgba(37,99,235,0.18)',
            border: '1px solid rgba(59,130,246,0.4)',
            borderRadius: 16, padding: '22px 24px',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#93c5fd', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>PaintFlow</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 6, letterSpacing: '-0.01em' }}>Operations + profitability system</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55 }}>Job costing, live labor tracking, payroll, post-job margin — built for owners who care about what's left after the job is done.</div>
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
              { icon: '📐', title: 'If you only need beautiful estimates', body: 'PaintScout is the gold standard. Customers love the dynamic, customizable quotes.' },
              { icon: '💰', title: 'If you need to know your actual margin', body: 'PaintFlow closes the loop from estimate to final profit — PaintScout stops at "quote signed."' },
              { icon: '💵', title: "If you're adding office staff or crew leads", body: "PaintScout's tiered plans limit or price by user count depending on the plan. PaintFlow is flat $99/mo with no user cap." },
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

type CellValue = 'yes' | 'no' | 'partial' | 'addon';
type Row = { feature: string; pf: CellValue; ps: CellValue; note?: string; highlight?: boolean };
type Group = { group: string; rows: Row[] };

const COMPARE_GROUPS: Group[] = [
  {
    group: 'Estimating',
    rows: [
      { feature: 'Smart estimating with production rates', pf: 'yes', ps: 'yes', note: 'PaintScout has the edge — more granular rate config for walls, trim, cabinets' },
      { feature: 'Dynamic customer-facing quotes', pf: 'partial', ps: 'yes', note: 'PaintScout lets customers toggle options and see price changes live' },
      { feature: 'Room-by-room dimensions input', pf: 'partial', ps: 'yes', note: 'PaintScout is purpose-built around this workflow' },
      { feature: 'Real-time open/sign notifications', pf: 'yes', ps: 'yes' },
      { feature: 'Automated follow-up sequences', pf: 'yes', ps: 'yes' },
    ],
  },
  {
    group: 'CRM & Pipeline',
    rows: [
      { feature: 'Built-in CRM (no add-on)', pf: 'yes', ps: 'addon', note: 'PaintScout CRM is a paid add-on; PaintFlow includes it' },
      { feature: 'Visual pipeline / deal stages', pf: 'yes', ps: 'partial' },
      { feature: 'Gmail lead sync (inbound)', pf: 'yes', ps: 'no' },
      { feature: 'Meta / Google / web lead capture', pf: 'yes', ps: 'partial' },
    ],
  },
  {
    group: 'Job Costing & Profitability',
    rows: [
      { feature: 'Live labor budget health indicator', pf: 'yes', ps: 'no', highlight: true },
      { feature: 'Crew time clock (mobile web)', pf: 'yes', ps: 'no', highlight: true },
      { feature: 'Estimated vs actual hours per job', pf: 'yes', ps: 'no', highlight: true },
      { feature: 'Post-job profitability analysis', pf: 'yes', ps: 'no', highlight: true },
      { feature: 'Crew efficiency scoring', pf: 'yes', ps: 'no', highlight: true },
      { feature: 'Payroll export', pf: 'yes', ps: 'no', highlight: true },
    ],
  },
  {
    group: 'Payments & Operations',
    rows: [
      { feature: 'Invoicing & payment collection', pf: 'yes', ps: 'yes' },
      { feature: 'Deposit-gated job scheduling', pf: 'yes', ps: 'no' },
      { feature: 'Customer financing', pf: 'no', ps: 'yes', note: "PaintScout integrates Wisetack; PaintFlow doesn't (yet)" },
      { feature: 'Digital crew sheets (financials hidden)', pf: 'yes', ps: 'no' },
    ],
  },
  {
    group: 'Platform',
    rows: [
      { feature: 'Third-party integrations (Zapier etc.)', pf: 'partial', ps: 'yes', note: 'PaintScout has more integrations today; PaintFlow is newer' },
      { feature: 'Mobile-optimized web app (no install)', pf: 'yes', ps: 'partial', note: 'PaintScout has a native mobile app; PaintFlow works in any mobile browser' },
      { feature: 'Built-in CRM included in base price', pf: 'yes', ps: 'addon', note: 'PaintScout CRM is a paid add-on; PaintFlow includes it' },
    ],
  },
];

function Cell({ value }: { value: CellValue }) {
  if (value === 'yes') return <CheckIcon />;
  if (value === 'no') return <CrossIcon />;
  if (value === 'addon') return <AddonIcon />;
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
          <p style={{ fontSize: 15, color: '#5a5f72', fontWeight: 300, maxWidth: 540, margin: '0 auto', lineHeight: 1.65 }}>
            We tried to be fair. Where PaintScout is better, we said so. Where it doesn't compete, we said that too.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 22, flexWrap: 'wrap', marginBottom: 24, fontSize: 12, color: '#6b7280' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CheckIcon size={14} /> Included</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CrossIcon size={14} /> Not available</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><AddonIcon size={14} /> Paid add-on</span>
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
            <div style={{ fontSize: 13, fontWeight: 800, color: ACCENT, letterSpacing: '-0.01em' }}>PaintFlow</div>
            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>$99 flat</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#374151', letterSpacing: '-0.01em' }}>PaintScout</div>
            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>$79/user</div>
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
                <div style={{ display: 'flex', justifyContent: 'center' }}><Cell value={row.ps} /></div>
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
            Both are good tools. They just optimize for different stages of the contractor's job.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {card(
            'PaintScout is best if…',
            '#7c3aed',
            '#fff',
            'rgba(0,0,0,0.08)',
            [
              'Estimating is the bottleneck — you spend most of your day quoting and need polished, dynamic proposals.',
              'You sell mostly to homeowners who want to see live pricing as they tweak the scope.',
              "You're a 1–2 person shop where per-user pricing still works in your favor.",
              'You offer financing through Wisetack and need that integrated.',
              'You already job-cost in a spreadsheet and are fine keeping it that way.',
            ],
            'Strong fit for solo estimators and small shops that win on quote quality, not operational discipline.',
          )}
          {card(
            'PaintFlow is best if…',
            ACCENT,
            '#fff',
            `${ACCENT}55`,
            [
              "You're done losing money on jobs and not knowing why until weeks later.",
              "You run multiple crews and need to see who's on site, who's over hours, and who's actually profitable.",
              "You're growing the team — flat pricing means $99/mo whether you have 1 user or 15.",
              'You want payroll, job costing, and post-job margin in one place — not three subscriptions.',
              "You'd rather have a complete operations system than the prettiest quote tool.",
            ],
            'Strong fit for owner-operators and shops that already know how to estimate — they just need the business side to keep up.',
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
            One flat rate.<br />Everything included.
          </h2>
          <p style={{ fontSize: 15, color: '#5a5f72', fontWeight: 300, maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
            PaintFlow is <strong style={{ color: '#0f1117' }}>$99/mo flat</strong> — CRM, estimating, job costing, invoicing, and crew management, all included. Or save $240/year at $79/mo annual. PaintScout uses tiered plans and charges for the CRM as an add-on; see their site for current pricing.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {[
            { name: 'PaintFlow', price: '$99', sub: '/mo · unlimited users', note: 'or $79/mo billed annually', highlight: true, features: ['Full pipeline & CRM included', 'Job costing & margin tracking', 'Live labor time clock', 'Invoicing & Stripe payments', 'Text & email automations', 'Unlimited crew & clients'] },
            { name: 'PaintScout', price: 'Tiered', sub: '· see paintscout.com', note: 'CRM available as paid add-on', highlight: false, features: ['Industry-leading estimate builder', 'Customer-facing interactive quotes', 'Room-by-room dimensions', 'Wisetack client financing', 'Native mobile app', 'CRM requires add-on purchase'] },
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
          PaintScout pricing is tiered; see <a href="https://paintscout.com" target="_blank" rel="noopener noreferrer" style={{ color: '#9ca3af' }}>paintscout.com</a> for current plans. PaintFlow's $99/mo is flat for all features and unlimited users.
        </p>
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
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f1117', marginBottom: 10, letterSpacing: '-0.01em' }}>Where PaintScout still wins.</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  'Their estimating UI is more refined — especially for customer-facing dynamic quotes.',
                  "Wisetack financing is built in; PaintFlow doesn't offer customer financing yet.",
                  "More third-party integrations available today — we're a newer, smaller company.",
                  'Larger user base means more community resources, templates, and support content.',
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
          We'll walk through your last 3 jobs together and show you exactly what PaintFlow would have told you about labor, margin, and crew performance.
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
            See full PaintFlow tour
          </a>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 28, flexWrap: 'wrap', fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
          <span>✓ No credit card</span>
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
            Paint<span style={{ color: '#93c5fd' }}>Flow</span>
          </span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginLeft: 6 }}>© 2026</span>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, maxWidth: 480, textAlign: 'right' }}>
          Comparison reflects publicly available information about PaintScout as of May 2026. PaintScout is a trademark of its respective owner; we're not affiliated.
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
  .cmp-fade-up { animation: cmp-fadeUp 0.55s ease both; }
  .cmp-fade-up-1 { animation-delay: 0.05s; }
  .cmp-fade-up-2 { animation-delay: 0.15s; }
  .cmp-fade-up-3 { animation-delay: 0.25s; }
  .cmp-fade-up-4 { animation-delay: 0.35s; }
  .cmp-pulse-dot { animation: cmp-pulseDot 2s ease-in-out infinite; }
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

export default function ComparePaintScout() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'PaintFlow vs PaintScout — Which is Right for Your Painting Business?';
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
        <HonestyStrip />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
