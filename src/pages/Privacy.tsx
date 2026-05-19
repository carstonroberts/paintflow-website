const ACCENT = '#2563eb';

export default function Privacy() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#0f1117', WebkitFontSmoothing: 'antialiased' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: ACCENT, marginBottom: 12 }}>Legal</div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#0f1117', marginBottom: 12, lineHeight: 1.05 }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: 14, color: '#9ca3af' }}>Last updated: May 18, 2026</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f1117', marginBottom: 10 }}>What we collect</h2>
            <p style={{ fontSize: 15, color: '#5a5f72', lineHeight: 1.75, fontWeight: 300 }}>
              We collect information you provide directly — your name, email, business name, and billing details — as well as data you enter about your jobs, clients, and crew within PaintFlow.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f1117', marginBottom: 10 }}>How we use it</h2>
            <p style={{ fontSize: 15, color: '#5a5f72', lineHeight: 1.75, fontWeight: 300 }}>
              We use your data to provide and improve PaintFlow, process payments, send product updates, and respond to support requests. We do not sell your data to third parties.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f1117', marginBottom: 10 }}>Data security</h2>
            <p style={{ fontSize: 15, color: '#5a5f72', lineHeight: 1.75, fontWeight: 300 }}>
              All data is encrypted in transit (TLS) and at rest. We use Supabase for database hosting, which maintains industry-standard security certifications.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f1117', marginBottom: 10 }}>Data retention & export</h2>
            <p style={{ fontSize: 15, color: '#5a5f72', lineHeight: 1.75, fontWeight: 300 }}>
              You can export all your data (clients, jobs, quotes, invoices) as CSV at any time from your account settings. We retain your data for 14 days after account cancellation, after which it is permanently deleted.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f1117', marginBottom: 10 }}>Cookies</h2>
            <p style={{ fontSize: 15, color: '#5a5f72', lineHeight: 1.75, fontWeight: 300 }}>
              We use essential cookies to keep you logged in and maintain your session. We do not use third-party tracking cookies.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f1117', marginBottom: 10 }}>Contact</h2>
            <p style={{ fontSize: 15, color: '#5a5f72', lineHeight: 1.75, fontWeight: 300 }}>
              Questions about privacy? Email <a href="mailto:carston@getpaintflow.com" style={{ color: ACCENT, textDecoration: 'none' }}>carston@getpaintflow.com</a>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
