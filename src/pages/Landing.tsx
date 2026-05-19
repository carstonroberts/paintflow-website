import { useState, useEffect } from 'react';


const DEMO_URL = 'https://calendly.com/carstonroberts/30min';

const ACCENT = '#2563eb';

// Reliable scroll-to-pricing that works across all browsers/environments
function scrollToPricing() {
  const el = document.getElementById('pricing');
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 60; // offset for sticky nav
  window.scrollTo({ top, behavior: 'smooth' });
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function Ic({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d={d} clipRule="evenodd" />
    </svg>
  );
}

const ICONS: Record<string, string> = {
  chart:  'M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z',
  clock:  'M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z',
  doc:    'M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v2a1 1 0 102 0v-2zm2-2a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm4-1a1 1 0 10-2 0v4a1 1 0 102 0V9z',
  users:  'M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z',
  board:  'M2 4a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM2 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h3a1 1 0 001-1v-6a1 1 0 00-1-1h-3z',
  card:   'M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z',
  mail:   'M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z',
  star:   'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z',
};

function CheckIcon({ color = '#22c55e', size = 18 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="10" cy="10" r="10" fill={color} fillOpacity="0.12" />
      <path d="M6 10l3 3 5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DashIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M6 10h8" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
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
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo.png" alt="PaintFlow" style={{ width: 32, height: 32, borderRadius: 8 }} />
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.03em', color: '#0f1117' }}>
            Paint<span style={{ color: ACCENT }}>Flow</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 12 }}>
          {!isMobile && (
            <button
              onClick={() => window.location.href = 'https://app.getpaintflow.com/login'}
              style={{ fontSize: 13, color: '#5a5f72', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
              Log in
            </button>
          )}
          {!isMobile && (
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: ACCENT, fontSize: 13, fontWeight: 600,
                padding: '9px 18px', borderRadius: 10, textDecoration: 'none',
                letterSpacing: '-0.01em', display: 'inline-block', whiteSpace: 'nowrap',
                border: `1.5px solid ${ACCENT}55`,
              }}>
              Free Demo
            </a>
          )}
          <a
            href="https://app.getpaintflow.com/login"
            style={{
              background: ACCENT, color: '#fff', fontSize: 13, fontWeight: 700,
              padding: isMobile ? '8px 16px' : '9px 20px', borderRadius: 10, textDecoration: 'none',
              letterSpacing: '-0.01em', display: 'inline-block', whiteSpace: 'nowrap',
            }}>
            {isMobile ? 'Free Trial' : 'Start free trial'}
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      background: 'radial-gradient(ellipse 80% 50% at 20% 40%, oklch(0.32 0.12 260 / 0.5) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 60%, oklch(0.25 0.08 260 / 0.3) 0%, transparent 55%), #0b0f1a',
      padding: '80px 24px 0',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(59,130,246,0.15)',
            border: '1px solid rgba(59,130,246,0.3)',
            color: '#93c5fd',
            fontSize: 12, fontWeight: 600,
            padding: '6px 14px', borderRadius: 100,
            letterSpacing: '0.01em',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#93c5fd', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            CRM built for painting contractors
          </div>
        </div>

        {/* Headline */}
        <h1 style={{
          textAlign: 'center',
          fontSize: 'clamp(40px, 6vw, 68px)',
          fontWeight: 900, letterSpacing: '-0.04em',
          lineHeight: 1.03, color: '#ffffff',
          marginBottom: 20, maxWidth: 800, margin: '0 auto 20px',
        }}>
          Stop losing $400 a job to<br />
          <span style={{
            background: 'linear-gradient(90deg, #3b82f6 0%, #93c5fd 40%, #3b82f6 60%, #1d4ed8 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 3s linear infinite',
          }}>
            overruns you don't catch.
          </span>
        </h1>

        {/* Founder credibility line */}
        <p style={{
          textAlign: 'center', fontSize: 19, color: 'rgba(255,255,255,0.85)',
          maxWidth: 560, margin: '0 auto 24px', lineHeight: 1.55,
          fontStyle: 'normal', fontWeight: 400, letterSpacing: '-0.02em',
        }}>
          Built on a job site, not in an office — by a painter who runs his crews on it every day.
        </p>

        {/* Subhead */}
        <p style={{
          textAlign: 'center', fontSize: 18, fontWeight: 300,
          color: 'rgba(255,255,255,0.62)',
          maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.65,
        }}>
          PaintFlow is the CRM built for painting contractors — real job costing, live labor tracking, and the only system that tells you which jobs actually made you money.
        </p>

        {/* CTA row */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 16 }}>
          <a
            href="https://app.getpaintflow.com/login"
            style={{
              background: ACCENT, color: '#fff', fontWeight: 700, fontSize: 16,
              padding: '16px 36px', borderRadius: 14, textDecoration: 'none',
              boxShadow: `0 4px 24px ${ACCENT}55`,
              letterSpacing: '-0.02em',
              display: 'inline-block',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 32px ${ACCENT}66`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 4px 24px ${ACCENT}55`; }}
          >
            Start 14-day free trial →
          </a>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: 14, fontWeight: 500,
              textDecoration: 'none',
              border: '1.5px solid rgba(255,255,255,0.25)',
              padding: '14px 24px', borderRadius: 14,
              display: 'inline-block',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.5)'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.25)'; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)'; }}
          >
            Schedule a free demo
          </a>
        </div>

        {/* Trust line */}
        <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 48 }}>
          No credit card required · 14 days free · Cancel anytime
        </p>

        {/* Social proof bar */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap',
          padding: '20px 24px 24px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          marginBottom: 0,
        }}>
          {[
            { num: '14 days', label: 'Free trial, no card required' },
            { num: '$99/mo', label: 'Flat rate, no per-seat fees' },
            { num: '9 stages', label: 'Built-in pipeline' },
            { num: '< 1 hr', label: 'Average setup time' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>{s.num}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 500, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Dashboard screenshot */}
        <div style={{ marginTop: 0, position: 'relative', maxWidth: 1000, margin: '0 auto' }}>
          <div style={{
            position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
            width: '70%', height: '50%',
            background: `radial-gradient(ellipse, ${ACCENT}35 0%, transparent 70%)`,
            filter: 'blur(70px)',
            pointerEvents: 'none', zIndex: 0,
          }} />
          <div style={{
            position: 'relative', zIndex: 1,
            borderRadius: '16px 16px 0 0',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.12)',
            borderBottom: 'none',
            boxShadow: '0 -4px 60px rgba(59,130,246,0.15), 0 0 0 1px rgba(255,255,255,0.05)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: '#1a1f2e', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'block', flexShrink: 0 }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e', display: 'block', flexShrink: 0 }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'block', flexShrink: 0 }} />
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.07)', borderRadius: 6, padding: '4px 12px', marginLeft: 8, fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 500, border: '1px solid rgba(255,255,255,0.07)' }}>
                app.getpaintflow.com/dashboard
              </div>
            </div>
            <picture>
              <source srcSet="/dashboard.webp" type="image/webp" />
              <img
                src="/dashboard.png"
                alt="PaintFlow dashboard — dark mode, showing pipeline, revenue, and job stats"
                style={{ width: '100%', display: 'block', maxHeight: 480, objectFit: 'cover', objectPosition: 'top' }}
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}


// ─── Job Narrative Section ────────────────────────────────────────────────────
function JobNarrativeSection() {
  const steps = [
    {
      label: 'Lead arrives',
      caption: "A Facebook ad fires at 9 PM. By 9:01 it's in your pipeline — no manual entry.",
      card: (
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.09)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#16a34a', animation: 'pulse-dot 2s ease-in-out infinite', flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#0f1117' }}>New Lead</span>
          </div>
          <div style={{ padding: '14px 18px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#0f1117', marginBottom: 6 }}>Henderson Exterior</div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#eff6ff', borderRadius: 100, padding: '3px 9px', fontSize: 10, fontWeight: 700, color: ACCENT }}>📣 Meta Ad</span>
            <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 8 }}>Arrived 9:01 PM · today</div>
          </div>
        </div>
      ),
    },
    {
      label: 'Quote signed',
      caption: 'Quote built in minutes, sent for e-sign, deposit collected. Job locked.',
      card: (
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.09)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#0f1117' }}>Quote #Q-041</div>
            <div style={{ fontSize: 10, color: '#9ca3af' }}>Henderson Exterior · $4,200</div>
          </div>
          <div style={{ padding: '14px 18px' }}>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, background: '#e4f5ec', color: '#16a34a', padding: '3px 8px', borderRadius: 100 }}>✓ Signed</span>
              <span style={{ fontSize: 10, fontWeight: 700, background: '#e4f5ec', color: '#16a34a', padding: '3px 8px', borderRadius: 100 }}>✓ Deposit paid</span>
            </div>
            <div style={{ fontSize: 10, color: '#9ca3af' }}>$1,050 collected · Stripe</div>
          </div>
        </div>
      ),
    },
    {
      label: 'Crew clocks in',
      caption: 'Your crew taps a button on their phone. You watch hours burn vs. budget — live.',
      card: (
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.09)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#0f1117' }}>Labor — Day 1</div>
          </div>
          <div style={{ padding: '14px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ flex: 1, height: 6, background: '#f3f4f6', borderRadius: 100, overflow: 'hidden' }}>
                <div style={{ width: '38%', height: '100%', background: `linear-gradient(90deg, ${ACCENT}, #60a5fa)`, borderRadius: 100 }} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: ACCENT }}>38%</span>
            </div>
            <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 8 }}>6.1 of 16h budget used</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#16a34a', animation: 'pulse-dot 2s ease-in-out infinite', flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: '#16a34a', fontWeight: 600 }}>2 on site now</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Invoice paid',
      caption: 'Job done. One tap sends the invoice. Stripe handles collection.',
      card: (
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.09)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#0f1117' }}>Invoice #I-041</div>
            <span style={{ fontSize: 10, fontWeight: 700, background: '#e4f5ec', color: '#16a34a', padding: '3px 8px', borderRadius: 100 }}>✓ Paid</span>
          </div>
          <div style={{ padding: '14px 18px' }}>
            <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.03em', color: '#0f1117', marginBottom: 2 }}>$3,150</div>
            <div style={{ fontSize: 10, color: '#9ca3af' }}>Balance after deposit · Stripe</div>
          </div>
        </div>
      ),
    },
    {
      label: 'Margin confirmed',
      caption: 'No spreadsheet. No guessing. 34% margin, locked in automatically.',
      card: (
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.09)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#0f1117' }}>Henderson Exterior</div>
          </div>
          <div style={{ padding: '14px 18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div style={{ background: '#f8f9fb', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 600, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Revenue</div>
                <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '-0.03em', color: '#0f1117' }}>$4,200</div>
              </div>
              <div style={{ background: '#e4f5ec', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: '#16a34a', fontWeight: 600, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Margin</div>
                <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '-0.03em', color: '#16a34a' }}>34%</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section style={{ background: '#f8f9fb', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '72px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: ACCENT, marginBottom: 12 }}>Follow one job</div>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#0f1117', marginBottom: 10, lineHeight: 1.06 }}>
            Henderson Exterior — lead to paid.
          </h2>
          <p style={{ fontSize: 15, color: '#5a5f72', fontWeight: 300, maxWidth: 440, margin: '0 auto', lineHeight: 1.6 }}>
            See how a single job moves through PaintFlow — from the first ping to the final margin number.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, alignItems: 'start' }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: ACCENT, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0f1117', letterSpacing: '-0.01em' }}>{step.label}</div>
              </div>
              {step.card}
              <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.55, fontWeight: 400, margin: 0 }}>
                {step.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Problem Section ──────────────────────────────────────────────────────────
function ProblemSection() {
  return (
    <section style={{ padding: '88px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 64, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: ACCENT, marginBottom: 14 }}>The Problem</div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 46px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#0f1117', marginBottom: 20 }}>
            You finish jobs not<br />knowing if you<br />made money.
          </h2>
          <p style={{ fontSize: 16, color: '#5a5f72', lineHeight: 1.7, fontWeight: 300, marginBottom: 16 }}>
            Most contractors track revenue, not cost. You quote 24 hours, the crew runs 31, and you don't find out until you're already on the next job.
          </p>
          <p style={{ fontSize: 16, color: '#5a5f72', lineHeight: 1.7, fontWeight: 300 }}>
            PaintFlow closes the loop — from estimate to final margin — so you know exactly where the money went on every single job.
          </p>
        </div>
        {/* Job costing screenshot + card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* App screenshot */}
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.09)', boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}>
          <picture>
            <source srcSet="/screenshots/job-costing.webp" type="image/webp" />
            <img
              src="/screenshots/job-costing.png"
              alt="PaintFlow job costing actuals — labor accuracy, material accuracy, and realized profit"
              loading="lazy"
              decoding="async"
              style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top', maxHeight: 260 }}
            />
          </picture>
        </div>
        {/* Job costing card */}
        <div style={{
          background: '#fff', border: '1px solid rgba(0,0,0,0.09)',
          borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.07)',
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f1117' }}>Whitmore Residence</div>
              <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Exterior — 2,400 sq ft</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, background: '#fff3d6', color: '#d97706', padding: '4px 10px', borderRadius: 100 }}>⚠ Watch Labor</span>
          </div>
          <div style={{ padding: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 4 }}>
              <div />
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', textAlign: 'center' }}>Estimated</div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', textAlign: 'center' }}>Actual</div>
            </div>
            {[
              { label: 'Labor Hours', est: '24h', act: '27.5h', over: true },
              { label: 'Materials', est: '$340', act: '$312', over: false },
              { label: 'Revenue', est: '$6,400', act: '$6,400', over: false },
            ].map(row => (
              <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: 12, color: '#5a5f72' }}>{row.label}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#0f1117', textAlign: 'center' }}>{row.est}</div>
                <div style={{ fontSize: 12, fontWeight: 700, textAlign: 'center', color: row.over ? '#d97706' : '#16a34a' }}>{row.act}</div>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
              <div style={{ background: '#f8f9fb', borderRadius: 12, padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600, marginBottom: 4 }}>Est. Margin</div>
                <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.04em', color: '#0f1117' }}>38%</div>
              </div>
              <div style={{ background: '#fff7ed', borderRadius: 12, padding: '14px 16px', textAlign: 'center', border: '1px solid #fed7aa' }}>
                <div style={{ fontSize: 10, color: '#d97706', fontWeight: 600, marginBottom: 4 }}>Actual Margin</div>
                <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.04em', color: '#d97706' }}>31%</div>
                <div style={{ fontSize: 10, color: '#d97706', marginTop: 2 }}>↓ $448 lost</div>
              </div>
            </div>
          </div>
        </div>
        </div>{/* end screenshot+card column */}
      </div>
    </section>
  );
}

// ─── Pipeline Section ─────────────────────────────────────────────────────────
function PipelineSection() {
  return (
    <section style={{ background: '#f8f9fb', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '88px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 64, alignItems: 'center' }}>
        {/* Pipeline mockup */}
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.09)', borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0f1117' }}>Sales Pipeline</div>
            <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, background: '#e4f5ec', color: '#16a34a', padding: '3px 10px', borderRadius: 100 }}>
              <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#16a34a', marginRight: 5, verticalAlign: 'middle', animation: 'pulse-dot 2s ease-in-out infinite' }} />
              Lead sync active
            </span>
          </div>
          <div style={{ padding: 12 }}>
            {[
              { stage: 'New Lead', count: 3, color: { bg: '#eff6ff', text: ACCENT }, jobs: ['Henderson Exterior — $4,200 (Meta)', 'Maple St. Interior — $2,800 (Google)'] },
              { stage: 'Quote Sent', count: 2, color: { bg: '#fff3d6', text: '#d97706' }, jobs: ['Park Ridge HOA — $18,500'] },
              { stage: 'Project Scheduled', count: 1, color: { bg: '#e4f5ec', text: '#16a34a' }, jobs: ['Whitmore Residence — $6,400'] },
              { stage: 'Project In Progress', count: 2, color: { bg: '#e4f5ec', text: '#16a34a' }, jobs: ['Cedar Ln. Cabinets — $3,100'] },
            ].map(col => (
              <div key={col.stage} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 100, background: col.color.bg, color: col.color.text, flexShrink: 0, marginTop: 2 }}>{col.count}</span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#0f1117', marginBottom: 4 }}>{col.stage}</div>
                  {col.jobs.map(j => (
                    <div key={j} style={{ fontSize: 11, color: '#6b7280', background: '#f8f9fb', borderRadius: 6, padding: '4px 8px', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{j}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: ACCENT, marginBottom: 14 }}>Pipeline</div>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#0f1117', marginBottom: 18 }}>
            Every lead.<br />Every stage.<br />Nothing lost.
          </h2>
          <p style={{ fontSize: 16, color: '#5a5f72', lineHeight: 1.7, fontWeight: 300, marginBottom: 24 }}>
            Move jobs through 9 stages from first contact to invoice received. Leads sync automatically from Meta ads, Google ads, and your website — so nothing slips through the cracks.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, padding: 0, margin: 0 }}>
            {['9-stage Kanban pipeline', 'Auto-import from Meta, Google & your site', 'Deposit gates job scheduling', 'One-click estimate-to-job conversion'].map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#0f1117', fontWeight: 500 }}>
                <CheckIcon color={ACCENT} size={20} />
                {item}
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
}

// ─── Time Tracking Section ────────────────────────────────────────────────────
function TimeTrackingSection() {
  return (
    <section style={{ padding: '88px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 64, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: ACCENT, marginBottom: 14 }}>Crew Time Tracking</div>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#0f1117', marginBottom: 18 }}>
            See your labor<br />budget in real time.
          </h2>
          <p style={{ fontSize: 16, color: '#5a5f72', lineHeight: 1.7, fontWeight: 300, marginBottom: 24 }}>
            Crew clocks in from their phone — no app install required. You see who's on site, how many hours are burned, and whether you're still on budget before it's too late to act.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, padding: 0, margin: 0 }}>
            {['Mobile punch-in for crew', 'Live hours vs budget tracker', 'Labor budget warnings', 'Admin time log editing'].map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#0f1117', fontWeight: 500 }}>
                <CheckIcon color={ACCENT} size={20} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* Time tracking mockup */}
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.09)', borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0f1117', marginBottom: 10 }}>Cedar Ln. Cabinets — Labor</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, height: 8, background: '#f3f4f6', borderRadius: 100, overflow: 'hidden' }}>
                <div style={{ width: '87%', height: '100%', background: 'linear-gradient(90deg, #f59e0b, #d97706)', borderRadius: 100 }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#d97706' }}>87%</span>
            </div>
            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 6 }}>13.9 of 16h budget used — 2.1h remaining</div>
          </div>
          <div style={{ padding: 12 }}>
            {[
              { name: 'Marcus K.', role: 'Lead Painter', hours: '5.5h today', active: true },
              { name: 'Tyler R.', role: 'Painter', hours: '4.2h today', active: true },
              { name: 'Devon W.', role: 'Painter', hours: '4.2h today', active: false },
            ].map(crew => (
              <div key={crew.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT }}>{crew.name[0]}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#0f1117' }}>{crew.name}</div>
                  <div style={{ fontSize: 11, color: '#9ca3af' }}>{crew.role} · {crew.hours}</div>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 100,
                  background: crew.active ? '#e4f5ec' : '#f3f4f6',
                  color: crew.active ? '#16a34a' : '#9ca3af',
                }}>
                  {crew.active ? '● On site' : 'Clocked out'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Schedule Section ─────────────────────────────────────────────────────────
function ScheduleSection() {
  return (
    <section style={{ background: '#f8f9fb', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '88px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 64, alignItems: 'center' }}>
        {/* Schedule screenshot */}
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.09)', boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}>
          <picture>
            <source srcSet="/screenshots/schedule.webp" type="image/webp" />
            <img
              src="/screenshots/schedule.png"
              alt="PaintFlow schedule — monthly calendar view with jobs and quote appointments"
              loading="lazy"
              decoding="async"
              style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top', maxHeight: 400 }}
            />
          </picture>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: ACCENT, marginBottom: 14 }}>Scheduling</div>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#0f1117', marginBottom: 18 }}>
            Every job.<br />Every date.<br />One calendar.
          </h2>
          <p style={{ fontSize: 16, color: '#5a5f72', lineHeight: 1.7, fontWeight: 300, marginBottom: 24 }}>
            Quote appointments, project start dates, and scheduled jobs all live in one calendar. See what's coming, spot conflicts, and keep your crew moving without juggling spreadsheets.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, padding: 0, margin: 0 }}>
            {['Quote & project dates in one view', 'Color-coded event types', 'Tap any day to see what\'s scheduled', 'Syncs with jobs as they move through the pipeline'].map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#0f1117', fontWeight: 500 }}>
                <CheckIcon color={ACCENT} size={20} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Features Grid ────────────────────────────────────────────────────────────
const FEATURES = [
  { title: 'Real Job Costing', desc: 'Compare estimated vs actual hours and materials on every job. See your real margin — not what you hoped for.', color: '#eff6ff', ic: '#2563eb', iconKey: 'chart' },
  { title: 'Catch the Leak Early', desc: 'Live labor budget alerts fire when a job crosses 75% of estimated hours. Adjust before the margin disappears, not after.', color: '#fff3d6', ic: '#d97706', iconKey: 'chart' },
  { title: 'Live Labor Tracking', desc: "Crew clocks in from their phone. See who's on site and how many hours are burned vs budgeted in real time.", color: '#e4f5ec', ic: '#16a34a', iconKey: 'clock' },
  { title: 'Smart Estimating', desc: 'Set your labor rate, paint coverage, and target margin. Hours, gallons, and final price — calculated automatically.', color: '#fff3d6', ic: '#d97706', iconKey: 'doc' },
  { title: 'Know Which Ads Actually Pay', desc: 'Every closed job traces back to the ad, channel, or referral that sourced it. Find the $500 Facebook spend that became $40K in jobs.', color: '#e4f5ec', ic: '#16a34a', iconKey: 'board' },
  { title: 'Crew Efficiency Scores', desc: 'Track which painters consistently hit their targets. Find out where your margin is actually going.', color: '#ede9fe', ic: '#7c3aed', iconKey: 'users' },
  { title: 'Invoicing & Payments', desc: "Deposit gates job scheduling. Jobs can't be booked until you're paid — built into the workflow.", color: '#e4f5ec', ic: '#16a34a', iconKey: 'card' },
  { title: 'Text & Email Automations', desc: 'Follow-up sequences, estimate reminders, and job confirmations — sent automatically so nothing slips.', color: '#fff3d6', ic: '#d97706', iconKey: 'mail' },
];

function FeaturesSection() {
  return (
    <section style={{ background: '#f8f9fb', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '88px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 52 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: ACCENT, marginBottom: 12 }}>Everything included</div>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.07, color: '#0f1117', marginBottom: 12 }}>
            Built for painting.<br />Not plumbing.
          </h2>
          <p style={{ fontSize: 16, color: '#5a5f72', fontWeight: 300, maxWidth: 440, lineHeight: 1.65 }}>
            No bloat. No features built for other trades. Just the tools that matter when you're running crews and closing jobs.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{
              background: '#fff', borderRadius: 16, padding: '22px 22px',
              border: '1px solid rgba(0,0,0,0.07)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: f.color, color: f.ic, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <Ic d={ICONS[f.iconKey]} size={17} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f1117', marginBottom: 6, letterSpacing: '-0.01em' }}>{f.title}</div>
              <p style={{ fontSize: 12.5, color: '#6b7280', lineHeight: 1.6, fontWeight: 400 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* AI Insights callout — two-column with screenshot */}
        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, alignItems: 'center', background: 'rgba(124,58,237,0.04)', border: '1px solid rgba(124,58,237,0.13)', borderRadius: 20, padding: '32px 32px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', color: '#7c3aed', fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 100, marginBottom: 16 }}>
              <span>✦</span> Gemini AI
            </div>
            <h3 style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#0f1117', marginBottom: 10, lineHeight: 1.2 }}>
              Business insights that actually tell you something.
            </h3>
            <p style={{ fontSize: 14, color: '#5a5f72', lineHeight: 1.7, fontWeight: 300, marginBottom: 16 }}>
              Gemini analyzes your real job data and surfaces patterns you'd never catch manually. Win rate trends, labor overruns by job type, revenue by lead source — all explained in plain language.
            </p>
            <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(124,58,237,0.12)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#7c3aed', marginBottom: 6 }}>Example weekly insight</div>
              <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, fontWeight: 400, margin: 0, fontStyle: 'italic' }}>
                "Your last 4 cabinet jobs averaged 22% over on labor. Consider adjusting your estimate rate or reviewing your prep process."
              </p>
            </div>
          </div>
          <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(124,58,237,0.15)', boxShadow: '0 8px 32px rgba(124,58,237,0.08)' }}>
            <picture>
              <source srcSet="/screenshots/insights.webp" type="image/webp" />
              <img
                src="/screenshots/insights.png"
                alt="PaintFlow insights page — revenue received, win rate, job efficiency stats"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top', maxHeight: 280 }}
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Founder Section ──────────────────────────────────────────────────────────
function FounderSection() {
  return (
    <section style={{ padding: '88px 24px', background: '#fff' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative' }}>
            {/* ── FOUNDER VIDEO SLOT ──────────────────────────────────────────
                Drop your Loom or YouTube embed src here once you have the URL.
                Option A (Loom):
                  Replace the <video> element below with:
                  <iframe src="https://www.loom.com/embed/YOUR_LOOM_ID"
                    frameBorder="0" allowFullScreen
                    style={{ width:'100%', height:'100%', border:'none', display:'block' }} />
                Option B (YouTube):
                  <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                    frameBorder="0" allowFullScreen
                    style={{ width:'100%', height:'100%', border:'none', display:'block' }} />
                ─────────────────────────────────────────────────────────────── */}
            <div style={{
              width: 360, height: 240, borderRadius: 20,
              border: '1px solid rgba(0,0,0,0.09)',
              overflow: 'hidden', background: '#0f1117',
              boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
              position: 'relative',
            }}>
              {/* Placeholder — swap for real embed above */}
              <video
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                poster="/founder.png"
              />
              {/* Play-button overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.35)',
                pointerEvents: 'none',
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.92)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}>
                  <svg width="22" height="22" viewBox="0 0 20 20" fill={ACCENT}>
                    <path d="M6.3 4.7a1 1 0 011.5-.87l8 5a1 1 0 010 1.74l-8 5A1 1 0 016.3 14.7V5.3z" />
                  </svg>
                </div>
              </div>
              <div style={{
                position: 'absolute', bottom: 12, left: 12,
                background: 'rgba(0,0,0,0.6)', color: '#fff',
                fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 100,
                backdropFilter: 'blur(8px)',
              }}>
                2 min — why I built this
              </div>
            </div>
            <div style={{
              position: 'absolute', bottom: -14, right: -14,
              background: ACCENT, color: '#fff',
              fontSize: 11, fontWeight: 700, padding: '7px 14px',
              borderRadius: 100, boxShadow: `0 4px 20px ${ACCENT}55`,
              letterSpacing: '0.02em', textTransform: 'uppercase',
            }}>
              Built by a painter
            </div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: ACCENT, marginBottom: 14 }}>From the founder</div>
          <blockquote style={{
            fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 300, lineHeight: 1.6,
            color: '#0f1117', fontStyle: 'italic', marginBottom: 28,
            borderLeft: `3px solid ${ACCENT}`, paddingLeft: 24,
          }}>
            "I was tired of not knowing where my money was going. I was too busy working to fill out data sheets. So with the help of modern technology, I developed PaintFlow to give myself and other contractors an affordable, hands-off solution to have access to all the data your painting business needs."
          </blockquote>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: `${ACCENT}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: ACCENT }}>C</span>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f1117' }}>Carston Roberts</div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>Founder, PaintFlow · Painting contractor</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Customer-Facing Section ──────────────────────────────────────────────────
function CustomerFacingSection() {
  return (
    <section style={{ padding: '88px 24px', background: '#f8f9fb', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: ACCENT, marginBottom: 12 }}>What homeowners see</div>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.07, color: '#0f1117', marginBottom: 12 }}>
            Your customers see this.
          </h2>
          <p style={{ fontSize: 16, color: '#5a5f72', fontWeight: 300, maxWidth: 480, margin: '0 auto', lineHeight: 1.65 }}>
            The quotes and invoices you send look polished and professional — with e-sign, deposit confirmation, and Stripe payments on invoices built in. Nothing for the homeowner to install or figure out.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>

          {/* Public Quote mockup */}
          <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.09)', borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}>
            <div style={{ padding: '10px 14px', background: '#fafafa', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', gap: 6 }}>
              {['#ff5f57','#ffbd2e','#28c840'].map(c => <span key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'block' }} />)}
              <div style={{ flex: 1, background: '#eee', borderRadius: 4, padding: '2px 10px', marginLeft: 4, fontSize: 9, color: '#aaa' }}>getpaintflow.com/q/henderson-exterior</div>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#fff', fontSize: 14, fontWeight: 800 }}>Y</span>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#0f1117' }}>Your Company</div>
                  <div style={{ fontSize: 10, color: '#9ca3af' }}>Your Logo · Licensed & Insured</div>
                </div>
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#0f1117', marginBottom: 4, letterSpacing: '-0.02em' }}>Henderson Exterior</div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>Quote #Q-041 · Valid through Jun 15, 2026</div>
              <div style={{ background: '#f8f9fb', borderRadius: 12, padding: '14px 16px', marginBottom: 16 }}>
                {[['Exterior paint — 2 coats','$3,200'],['Prep & primer','$1,000']].map(([label, val]) => (
                  <div key={label} style={{ display: 'grid', gridTemplateColumns: '1fr auto', marginBottom: 8 }}>
                    <div style={{ fontSize: 12, color: '#374151' }}>{label}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#0f1117' }}>{val}</div>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', marginTop: 8, paddingTop: 10, display: 'grid', gridTemplateColumns: '1fr auto' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0f1117' }}>Total</div>
                  <div style={{ fontSize: 13, fontWeight: 900, color: '#0f1117' }}>$4,200</div>
                </div>
              </div>
              <button style={{ width: '100%', background: ACCENT, color: '#fff', border: 'none', borderRadius: 12, padding: '12px', fontSize: 13, fontWeight: 700, cursor: 'default', marginBottom: 8 }}>
                ✍ Sign &amp; Pay $1,050 Deposit
              </button>
              <div style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center' }}>Powered by Stripe · Secure payment</div>
            </div>
          </div>

          {/* Public Invoice mockup */}
          <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.09)', borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}>
            <div style={{ padding: '10px 14px', background: '#fafafa', borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', gap: 6 }}>
              {['#ff5f57','#ffbd2e','#28c840'].map(c => <span key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'block' }} />)}
              <div style={{ flex: 1, background: '#eee', borderRadius: 4, padding: '2px 10px', marginLeft: 4, fontSize: 9, color: '#aaa' }}>getpaintflow.com/i/henderson-exterior</div>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#fff', fontSize: 14, fontWeight: 800 }}>Y</span>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#0f1117' }}>Your Company</div>
                  <div style={{ fontSize: 10, color: '#9ca3af' }}>Your Logo · Licensed & Insured</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#0f1117', letterSpacing: '-0.02em' }}>Invoice #I-041</div>
                <span style={{ fontSize: 11, fontWeight: 700, background: '#fff3d6', color: '#d97706', padding: '4px 10px', borderRadius: 100 }}>Due Jun 20</span>
              </div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>Henderson Exterior</div>
              <div style={{ background: '#f8f9fb', borderRadius: 12, padding: '14px 16px', marginBottom: 16 }}>
                {[['Project total','$4,200',false],['Deposit paid','−$1,050',true]].map(([label, val, green]) => (
                  <div key={label as string} style={{ display: 'grid', gridTemplateColumns: '1fr auto', marginBottom: 8 }}>
                    <div style={{ fontSize: 12, color: '#374151' }}>{label}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: green ? '#16a34a' : '#0f1117' }}>{val}</div>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', marginTop: 8, paddingTop: 10, display: 'grid', gridTemplateColumns: '1fr auto' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0f1117' }}>Balance due</div>
                  <div style={{ fontSize: 13, fontWeight: 900, color: '#0f1117' }}>$3,150</div>
                </div>
              </div>
              <button style={{ width: '100%', background: '#16a34a', color: '#fff', border: 'none', borderRadius: 12, padding: '12px', fontSize: 13, fontWeight: 700, cursor: 'default', marginBottom: 8 }}>
                Pay $3,150 with Stripe
              </button>
              <div style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center' }}>Stripe · 256-bit encrypted · No account needed</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────
const COMPARE_ROWS = [
  { feature: 'Job costing & margin tracking',    pf: true,  ps: false, dj: false, highlight: true },
  { feature: 'Live labor budget health',          pf: true,  ps: false, dj: false, highlight: true },
  { feature: 'Crew efficiency scoring',           pf: true,  ps: false, dj: false, highlight: true },
  { feature: 'AI business insights',              pf: true,  ps: false, dj: false, highlight: true },
  { feature: 'Meta/Google/website lead sync',     pf: true,  ps: false, dj: false, highlight: true },
  { feature: 'Text & email automations',          pf: true,  ps: true,  dj: true,  highlight: false },
  { feature: 'Invoicing with deposit logic',      pf: true,  ps: true,  dj: true,  highlight: false },
  { feature: 'Smart estimating engine',           pf: true,  ps: true,  dj: false, highlight: false },
  { feature: 'Crew time clock',                   pf: true,  ps: false, dj: false, highlight: true },
];

function ComparisonSection() {
  return (
    <section style={{ padding: '88px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* ── Section header ── */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: ACCENT, marginBottom: 12 }}>vs. The competition</div>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.07, color: '#0f1117', marginBottom: 12 }}>
            All the features.<br />One flat price.
          </h2>
          <p style={{ fontSize: 16, color: '#5a5f72', fontWeight: 300, maxWidth: 480, margin: '0 auto', lineHeight: 1.65 }}>
            PaintScout and DripJobs are great at parts of the job. PaintFlow is the only one that closes the loop from estimate to final margin — at a flat rate, no per-seat fees.
          </p>
        </div>

        {/* ── Pricing card headers ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 0, maxWidth: 860, margin: '0 auto' }}>
          <div />

          {/* PaintFlow */}
          <div style={{ background: ACCENT, borderRadius: '16px 16px 0 0', padding: '20px 14px 18px', textAlign: 'left', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#16a34a', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 100, letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Best Value
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.06em', marginBottom: 6, textTransform: 'uppercase', textAlign: 'center' }}>PaintFlow</div>
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.04em', color: '#fff' }}>$99</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginLeft: 4 }}>/mo · or $79 annual</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {['Everything included', 'Unlimited users', 'No add-ons, no per-seat'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                  <span style={{ color: '#86efac', fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.88)', lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PaintScout */}
          <div style={{ background: '#f8f9fb', borderRadius: '16px 16px 0 0', padding: '20px 14px 18px', textAlign: 'left', border: '1px solid rgba(0,0,0,0.07)', borderBottom: 'none' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.06em', marginBottom: 6, textTransform: 'uppercase', textAlign: 'center' }}>PaintScout</div>
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.04em', color: '#374151' }}>$119</span>
              <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 2 }}>/mo · Sales tier, 1 user</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[
                'Operations add-on ($99/mo)',
                '$20/user beyond 1',
                'Wisetack fees on financing',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 5 }}>
                  <span style={{ color: '#d97706', fontSize: 11, fontWeight: 800, flexShrink: 0, lineHeight: 1.4 }}>+</span>
                  <span style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DripJobs */}
          <div style={{ background: '#f8f9fb', borderRadius: '16px 16px 0 0', padding: '20px 14px 18px', textAlign: 'left', border: '1px solid rgba(0,0,0,0.07)', borderBottom: 'none', borderLeft: 'none' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.06em', marginBottom: 6, textTransform: 'uppercase', textAlign: 'center' }}>DripJobs</div>
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.04em', color: '#374151' }}>$97</span>
              <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 2 }}>/mo · Pro tier, 1 user</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[
                'Advanced tier ($147/mo) for full features',
                'Job costing add-on ($49/mo)',
                'Two-way texting add-on ($25/mo)',
                'Additional users (contact for pricing)',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 5 }}>
                  <span style={{ color: '#d97706', fontSize: 11, fontWeight: 800, flexShrink: 0, lineHeight: 1.4 }}>+</span>
                  <span style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Feature checklist table ── */}
        <div style={{ maxWidth: 860, margin: '0 auto', overflow: 'hidden', borderRadius: '0 0 16px 16px', border: '1px solid rgba(0,0,0,0.08)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {COMPARE_ROWS.map((row, i) => (
                <tr key={row.feature} style={{ background: row.highlight ? 'rgba(37,99,235,0.025)' : (i % 2 === 0 ? '#fff' : '#fafafa') }}>
                  <td style={{ padding: '13px 20px', fontSize: 13, color: '#374151', fontWeight: row.highlight ? 600 : 400, width: '44%' }}>
                    {row.highlight && <span style={{ display: 'inline-block', width: 6, height: 6, background: ACCENT, borderRadius: '50%', marginRight: 8, verticalAlign: 'middle' }} />}
                    {row.feature}
                  </td>
                  <td style={{ padding: '13px 16px', textAlign: 'center', background: `${ACCENT}0a`, borderLeft: `3px solid ${ACCENT}` }}>
                    <CheckIcon color={ACCENT} size={20} />
                  </td>
                  <td style={{ padding: '13px 16px', textAlign: 'center', borderLeft: '1px solid rgba(0,0,0,0.06)' }}>
                    {row.ps ? <CheckIcon color="#9ca3af" size={20} /> : <DashIcon size={20} />}
                  </td>
                  <td style={{ padding: '13px 16px', textAlign: 'center', borderLeft: '1px solid rgba(0,0,0,0.06)' }}>
                    {row.dj ? <CheckIcon color="#9ca3af" size={20} /> : <DashIcon size={20} />}
                  </td>
                </tr>
              ))}
              <tr style={{ background: '#0f1117' }}>
                <td style={{ padding: '16px 20px', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Monthly price</td>
                <td style={{ padding: '16px 16px', textAlign: 'center', background: ACCENT, borderLeft: `3px solid ${ACCENT}` }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>$99</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>flat · $79 annual</div>
                </td>
                <td style={{ padding: '16px 16px', textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '-0.02em', textDecoration: 'line-through' }}>$119+/mo</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', marginTop: 2 }}>Sales tier</div>
                </td>
                <td style={{ padding: '16px 16px', textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '-0.02em', textDecoration: 'line-through' }}>$97+/mo</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', marginTop: 2 }}>Pro tier</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── 3-person shop callout ── */}
        <div style={{ maxWidth: 860, margin: '16px auto 0', background: '#fff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 16, padding: '20px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#0f1117' }}>What a 3-person painting shop actually pays</div>
            <div style={{ fontSize: 11, color: '#9ca3af' }}>Full features, multi-user</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>

            {/* PaintFlow */}
            <div style={{ borderLeft: `3px solid ${ACCENT}`, paddingLeft: 16, paddingTop: 4, paddingBottom: 4 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: ACCENT, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>PaintFlow</div>
              <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.04em', color: '#0f1117', lineHeight: 1 }}>$99<span style={{ fontSize: 13, fontWeight: 500, color: '#5a5f72', letterSpacing: 0 }}>/mo</span></div>
              <div style={{ fontSize: 11, color: '#5a5f72', marginTop: 6 }}>Flat. Everything included.</div>
            </div>

            {/* DripJobs */}
            <div style={{ background: '#f8f9fb', borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>DripJobs</div>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.04em', color: '#374151', lineHeight: 1 }}>from $221<span style={{ fontSize: 13, fontWeight: 500, letterSpacing: 0 }}>/mo</span></div>
              <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 6, lineHeight: 1.5 }}>Advanced $147 + Job Costing $49 + Chat $25</div>
            </div>

            {/* PaintScout */}
            <div style={{ background: '#f8f9fb', borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>PaintScout</div>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.04em', color: '#374151', lineHeight: 1 }}>$258<span style={{ fontSize: 13, fontWeight: 500, letterSpacing: 0 }}>/mo</span></div>
              <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 6, lineHeight: 1.5 }}>Sales $119 + Operations $99 + 2 extra seats</div>
            </div>
          </div>
          <p style={{ fontSize: 11, color: '#c4c9d4', fontStyle: 'italic', margin: '14px 0 0', lineHeight: 1.6 }}>
            Estimates based on published rates from dripjobs.com/pricing and paintscout.com/pricing as of May 2026. DripJobs additional-user pricing is unpublished — 3-user cost is higher than shown. Add-on prices vary by plan.
          </p>
        </div>

        {/* ── Captions ── */}
        <p style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', marginTop: 20 }}>
          ● Highlighted rows = features exclusive to PaintFlow
        </p>
        <p style={{ textAlign: 'center', fontSize: 11, color: '#c4c9d4', marginTop: 10, fontStyle: 'italic', maxWidth: 680, margin: '10px auto 0' }}>
          Competitor pricing reflects published rates as of May 2026. PaintScout and DripJobs are trademarks of their respective owners; we're not affiliated.
        </p>

        {/* ── Compare page links ── */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
          <a href="/compare/paintscout" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', color: ACCENT, fontSize: 13, fontWeight: 700,
            padding: '12px 22px', borderRadius: 12, textDecoration: 'none',
            border: `1px solid ${ACCENT}40`,
          }}>
            PaintFlow vs PaintScout →
          </a>
          <a href="/compare/dripjobs" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', color: ACCENT, fontSize: 13, fontWeight: 700,
            padding: '12px 22px', borderRadius: 12, textDecoration: 'none',
            border: `1px solid ${ACCENT}40`,
          }}>
            PaintFlow vs DripJobs →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Rate Sheet CTA ───────────────────────────────────────────────────────────
function RateSheetCTA() {
  return (
    <div style={{ padding: '0 24px 72px' }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        background: `linear-gradient(135deg, ${ACCENT}12 0%, ${ACCENT}06 100%)`,
        border: `1px solid ${ACCENT}25`,
        borderRadius: 20, padding: '32px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20,
      }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0f1117', marginBottom: 6 }}>See how PaintFlow tracks your real margin on every job.</div>
          <p style={{ fontSize: 14, color: '#5a5f72', fontWeight: 300 }}>14-day free trial — full access, no credit card required to start.</p>
        </div>
        <a href="https://app.getpaintflow.com/checkout?plan=monthly" style={{
          background: ACCENT, color: '#fff', fontSize: 13, fontWeight: 600,
          padding: '12px 24px', borderRadius: 12, textDecoration: 'none',
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          Start Free Trial →
        </a>
      </div>
    </div>
  );
}

// ─── Not-For Section ──────────────────────────────────────────────────────────
function NotForSection() {
  return (
    <section style={{ padding: '64px 24px', background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', marginBottom: 12 }}>Honest take</div>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#0f1117', marginBottom: 10, lineHeight: 1.1 }}>
            Who PaintFlow isn't for.
          </h2>
          <p style={{ fontSize: 15, color: '#5a5f72', fontWeight: 300, lineHeight: 1.65 }}>
            We'd rather tell you upfront than have you sign up and feel misled.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            "You do 1–2 jobs a month and a spreadsheet works fine. PaintFlow is built for owners running multiple crews across multiple active jobs — if you're a solo operator with light volume, the overhead isn't worth it yet.",
            "You need QuickBooks-native accounting today. PaintFlow handles invoicing and payment collection directly, but it doesn't sync to QuickBooks. That integration is on the roadmap — it's not here yet.",
            "You primarily do commercial bid-and-walk-away work. PaintFlow is built for residential repeat-cycle shops — relationships, follow-ups, and margin visibility across a rolling job list. If your pipeline is mostly one-off commercial bids with long sales cycles, the CRM fit is looser.",
          ].map((text, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: '16px 20px', background: '#f8f9fb', borderRadius: 14, border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ flexShrink: 0, marginTop: 3 }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="#d1d5db" strokeWidth="1.5" />
                  <path d="M7 10h6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p style={{ fontSize: 14, color: '#5a5f72', lineHeight: 1.65, fontWeight: 300, margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    {
      q: 'How is PaintFlow different from PaintScout or DripJobs?',
      a: 'PaintScout and DripJobs are good at estimating and CRM basics, but neither gives you real job costing, live labor tracking, or margin visibility. PaintFlow was built specifically because those tools couldn\'t answer the most important question: "Did I actually make money on that job?" It\'s also the only one with lead-source revenue attribution — so you know which ads are actually driving revenue.',
    },
    {
      q: "What's your refund guarantee?",
      a: "If you run a full job through PaintFlow — quote to invoice — within your first 60 days and it didn't earn its keep, we'll refund every dollar. Monthly customers get their most recent month back and keep using PaintFlow through the end of their paid period. Annual customers get a prorated refund for unused months. Email carston@getpaintflow.com to request — it goes straight to me. Full details on our refund policy page.",
    },
    {
      q: 'What happens to my data if I cancel?',
      a: 'Your data stays exportable. You can pull every client, job, quote, and invoice as CSV at any time, including the 14 days after cancellation. We don\'t hold your data hostage — if PaintFlow isn\'t working for you, you take everything with you.',
    },
    {
      q: 'How long does setup take?',
      a: 'Most owners are up and running within an hour. We offer a free 30-minute onboarding call to walk you through your first job setup, estimating templates, and crew configuration.',
    },
    {
      q: 'Does PaintFlow work with QuickBooks?',
      a: "QuickBooks integration is on the roadmap. Right now, PaintFlow handles invoicing and payment collection natively — most customers find they no longer need QuickBooks once they're fully set up.",
    },
    {
      q: 'What lead sources does PaintFlow sync with?',
      a: 'PaintFlow syncs leads from Meta (Facebook/Instagram) ads, Google ads, and your website contact form. New leads land directly in your pipeline automatically — no manual entry.',
    },
    {
      q: 'Do my crew members need to install an app?',
      a: 'No app installation needed. Crew members are invited via email and log in through a mobile-optimized web link — works on any smartphone browser. No download required.',
    },
    {
      q: 'Can I cancel anytime?',
      a: "Yes. Monthly plans cancel from your billing settings anytime — you keep access through the end of your current paid period. Annual plans are prepaid for the year. The 60-day refund guarantee (see our refund policy) covers either plan if PaintFlow doesn't fit your shop.",
    },
    {
      q: 'Is my data secure?',
      a: 'Yes. All data is encrypted in transit and at rest. We use industry-standard security practices and your data is never shared or sold.',
    },
  ];
  return (
    <section style={{ padding: '88px 24px', background: '#f8f9fb', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: ACCENT, marginBottom: 12 }}>FAQ</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#0f1117' }}>Common questions</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid rgba(0,0,0,0.07)',
              borderRadius: 14, overflow: 'hidden',
              transition: 'box-shadow 0.2s',
              boxShadow: open === i ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
            }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', padding: '18px 22px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                  background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#0f1117', lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: open === i ? ACCENT : '#f3f4f6',
                  color: open === i ? '#fff' : '#6b7280',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, fontWeight: 700, flexShrink: 0,
                  transition: 'all 0.2s',
                }}>
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <div style={{ padding: '0 22px 18px', fontSize: 14, color: '#5a5f72', lineHeight: 1.7, fontWeight: 300 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Section ──────────────────────────────────────────────────────────
const PLAN_FEATURES = [
  'Full pipeline & CRM',
  'Job costing & margin tracking',
  'Live labor time clock',
  'Smart estimating engine',
  'Invoicing & payment collection',
  'Text & email automations',
  'Meta/Google/website lead sync',
  'Unlimited jobs & clients',
];

function PricingSection() {
  return (
    <section id="pricing" style={{ background: '#0b0f1a', padding: '88px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#60a5fa', marginBottom: 12 }}>Pricing</div>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#fff', marginBottom: 12 }}>
            Simple, honest pricing.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}>One plan. Everything included. No per-seat fees.</p>
        </div>

        {/* Founding Member scarcity banner */}
        {/* Update this number as Founding Member slots fill — values: 5, 4, 3, 2, 1 */}
        <div style={{ maxWidth: 860, margin: '0 auto 20px', background: 'rgba(217,119,6,0.1)', border: '1px solid rgba(217,119,6,0.3)', borderRadius: 14, padding: '14px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#d97706', letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(217,119,6,0.15)', border: '1px solid rgba(217,119,6,0.3)', borderRadius: 100, padding: '4px 10px', whiteSpace: 'nowrap' }}>
              Founding Member Program
            </span>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
              <strong style={{ color: '#fbbf24' }}>3 of 5 spots remaining</strong> — $49/mo locked in for life after 90 days free. By application.
            </span>
          </div>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24', textDecoration: 'none', whiteSpace: 'nowrap', border: '1px solid rgba(251,191,36,0.4)', borderRadius: 10, padding: '8px 16px' }}
          >
            Schedule a call →
          </a>
        </div>

        {/* 60-day refund guarantee callout */}
        <div style={{ maxWidth: 860, margin: '0 auto 24px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '28px 28px', boxShadow: '0 0 40px rgba(59,130,246,0.08)' }}>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.85)', fontWeight: 400, lineHeight: 1.65, margin: '0 0 12px' }}>
            Run one full job through PaintFlow — quote to invoice — within your first 60 days. If it didn't earn its keep, I'll refund every dollar. — Carston
          </p>
          <div style={{ textAlign: 'right' }}>
            <a href="/refund" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'underline' }}>see refund policy</a>
          </div>
        </div>

        {/* Two cards side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, maxWidth: 860, margin: '0 auto' }}>

          {/* Annual card — prominent default */}
          <div style={{
            borderRadius: 24, padding: 32, position: 'relative', overflow: 'hidden',
            background: ACCENT,
            boxShadow: `0 0 0 2px ${ACCENT}, 0 20px 60px rgba(59,130,246,0.25)`,
          }}>
            {/* Best Value badge */}
            <div style={{ position: 'absolute', top: 0, right: 0, background: '#16a34a', color: '#fff', fontSize: 10, fontWeight: 800, padding: '6px 16px', borderRadius: '0 24px 0 12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Best Value
            </div>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top left, rgba(255,255,255,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.75)', marginBottom: 16 }}>⚡ Annual Plan</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 64, fontWeight: 900, letterSpacing: '-0.05em', color: '#fff', lineHeight: 1 }}>$79</span>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>/mo</span>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 8 }}>Billed as $948/year</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 100, padding: '5px 12px', marginBottom: 24 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>✦ Save $240/year vs monthly</span>
              </div>
              <ul style={{ listStyle: 'none', marginBottom: 28, padding: 0 }}>
                {PLAN_FEATURES.map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: 'rgba(255,255,255,0.1) solid 1px' }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="9" height="9" viewBox="0 0 20 20" fill="none">
                        <path d="M5 10l4 4 6-6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => window.location.href = 'https://app.getpaintflow.com/checkout?plan=annual'}
                style={{
                  width: '100%', padding: '16px', borderRadius: 14, border: 'none', cursor: 'pointer',
                  background: '#fff', color: ACCENT,
                  fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                Start Free Trial — 14 days free
              </button>
              <div style={{ textAlign: 'center', marginTop: 12 }}>
                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>
                  or <span style={{ textDecoration: 'underline' }}>schedule a free demo first</span>
                </a>
              </div>
              <div style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                ✓ 60-day refund: run one job, decide after — <a href="/refund" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>see refund policy</a>
              </div>
            </div>
          </div>

          {/* Monthly card */}
          <div style={{
            borderRadius: 24, padding: 32, position: 'relative',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>Monthly Plan</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 64, fontWeight: 900, letterSpacing: '-0.05em', color: 'rgba(255,255,255,0.7)', lineHeight: 1 }}>$99</span>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginBottom: 10 }}>/mo</span>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>Billed monthly · cancel anytime</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 100, padding: '5px 12px', marginBottom: 24 }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Switch to annual and save $240/year</span>
            </div>
            <ul style={{ listStyle: 'none', marginBottom: 28, padding: 0 }}>
              {PLAN_FEATURES.map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="9" height="9" viewBox="0 0 20 20" fill="none">
                      <path d="M5 10l4 4 6-6" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{item}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => window.location.href = 'https://app.getpaintflow.com/checkout?plan=monthly'}
              style={{
                width: '100%', padding: '16px', borderRadius: 14,
                border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer',
                background: 'transparent', color: 'rgba(255,255,255,0.6)',
                fontSize: 15, fontWeight: 600,
                transition: 'border-color 0.15s, color 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
            >
              Start Free Trial — 14 days free
            </button>
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <a href={DEMO_URL} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
                or <span style={{ textDecoration: 'underline' }}>schedule a free demo first</span>
              </a>
            </div>
            <div style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
              ✓ 60-day refund: run one job, decide after — <a href="/refund" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'underline' }}>see refund policy</a>
            </div>
          </div>
        </div>

        {/* 14-day free trial badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 100, padding: '10px 20px',
          }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="#4ade80" strokeWidth="1.5" />
              <path d="M6 10l3 3 5-5" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
              14-day free trial · No charge until trial ends · Cancel anytime
            </span>
          </div>
        </div>

        {/* Trust bullets */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', marginTop: 24 }}>
          {['14-day free trial', 'No setup fees', 'No per-seat charges', 'Cancel anytime'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
              <CheckIcon color="rgba(255,255,255,0.25)" size={16} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Sticky Bar ───────────────────────────────────────────────────────────────
function StickyBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 99,
      background: 'rgba(15,17,23,0.97)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '14px 24px',
      transform: visible ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform 0.3s cubic-bezier(0.32,0.72,0,1)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src="/logo.png" alt="" style={{ width: 24, height: 24, borderRadius: 6 }} />
        <span style={{ fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>
          PaintFlow — <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>14-day free trial · $99/mo · or $79 annual</span>
        </span>
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button
          onClick={() => scrollToPricing()}
          style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
          View pricing
        </button>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 500,
            padding: '10px 18px', borderRadius: 10, textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.18)', display: 'inline-block',
          }}>
          Schedule a demo
        </a>
        <a
          href="https://app.getpaintflow.com/login"
          style={{
            background: ACCENT, color: '#fff', fontSize: 13, fontWeight: 700,
            padding: '10px 22px', borderRadius: 10, textDecoration: 'none',
            letterSpacing: '-0.01em', display: 'inline-block',
          }}>
          Start free trial →
        </a>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: '#f8f9fb', borderTop: '1px solid rgba(0,0,0,0.07)', padding: '48px 24px', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
        <img src="/logo.png" alt="" style={{ width: 28, height: 28, borderRadius: 7 }} />
        <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.03em', color: '#0f1117' }}>
          Paint<span style={{ color: ACCENT }}>Flow</span>
        </span>
      </div>
      <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 20 }}>Built by a painting contractor, for painting contractors.</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, flexWrap: 'wrap' }}>
        {[
          { label: 'Book a Demo', href: 'https://calendly.com/carstonroberts/30min', external: true },
          { label: 'vs PaintScout', href: '/compare/paintscout', external: false },
          { label: 'vs DripJobs', href: '/compare/dripjobs', external: false },
          { label: 'Privacy', href: '/privacy', external: false },
          { label: 'Terms', href: '/terms', external: false },
          { label: 'Refund Policy', href: '/refund', external: false },
          { label: 'Log in', href: 'https://app.getpaintflow.com/login', external: false },
        ].map(link => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'none' }}
          >
            {link.label}
          </a>
        ))}
      </div>
      <p style={{ fontSize: 11, color: '#d1d5db', marginTop: 24 }}>© 2026 PaintFlow. All rights reserved.</p>
    </footer>
  );
}

// ─── Keyframe styles ──────────────────────────────────────────────────────────
const globalStyles = `
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
`;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Landing() {
  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ fontFamily: "'Inter', sans-serif", color: '#0f1117', WebkitFontSmoothing: 'antialiased', paddingBottom: 72 }}>
        <Nav />
        <Hero />
        <JobNarrativeSection />
        <ProblemSection />
        <FounderSection />
        <PipelineSection />
        <TimeTrackingSection />
        <ScheduleSection />
        <FeaturesSection />
        <CustomerFacingSection />
        <ComparisonSection />
        <NotForSection />
        <PricingSection />
        <FAQSection />
        <RateSheetCTA />
        <Footer />
        <StickyBar />
      </div>
    </>
  );
}
