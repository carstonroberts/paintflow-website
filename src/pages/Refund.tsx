const ACCENT = '#2563eb';

export default function Refund() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#0f1117', WebkitFontSmoothing: 'antialiased' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: ACCENT, marginBottom: 12 }}>Legal</div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#0f1117', marginBottom: 12, lineHeight: 1.05 }}>
            Refund Policy
          </h1>
          <p style={{ fontSize: 14, color: '#9ca3af' }}>Last updated: May 18, 2026</p>
        </div>

        {/* Intro */}
        <p style={{ fontSize: 17, color: '#374151', lineHeight: 1.75, fontWeight: 400, marginBottom: 40 }}>
          We back PaintFlow with a 60-day money-back guarantee.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

          {/* Guarantee */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f1117', marginBottom: 10 }}>The guarantee</h2>
            <p style={{ fontSize: 15, color: '#5a5f72', lineHeight: 1.75, fontWeight: 300 }}>
              Run one full job through PaintFlow — quote to invoice — within your first 60 days from signup. If it didn't earn its keep, we'll refund every dollar.
            </p>
          </div>

          {/* What counts */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f1117', marginBottom: 10 }}>What counts as one full job</h2>
            <p style={{ fontSize: 15, color: '#5a5f72', lineHeight: 1.75, fontWeight: 300 }}>
              A job that moves through the quote stage to a sent invoice within PaintFlow. The job doesn't need to be fully paid — sending the invoice is the completion marker.
            </p>
          </div>

          {/* How to request */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f1117', marginBottom: 10 }}>How to request a refund</h2>
            <p style={{ fontSize: 15, color: '#5a5f72', lineHeight: 1.75, fontWeight: 300 }}>
              Email <a href="mailto:carston@getpaintflow.com" style={{ color: ACCENT, textDecoration: 'none' }}>carston@getpaintflow.com</a> from the address on your account. Mention which job you ran. We process refunds within 2 business days.
            </p>
          </div>

          {/* How refunds work */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f1117', marginBottom: 10 }}>How refunds work</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: '#f8f9fb', borderRadius: 12, padding: '16px 20px', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f1117', marginBottom: 4 }}>Monthly plan</div>
                <p style={{ fontSize: 14, color: '#5a5f72', lineHeight: 1.65, fontWeight: 300, margin: 0 }}>
                  We refund your most recent month's payment. Your subscription stays active through the end of your current paid period, then auto-cancels. You can re-subscribe anytime.
                </p>
              </div>
              <div style={{ background: '#f8f9fb', borderRadius: 12, padding: '16px 20px', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f1117', marginBottom: 4 }}>Annual plan</div>
                <p style={{ fontSize: 14, color: '#5a5f72', lineHeight: 1.65, fontWeight: 300, margin: 0 }}>
                  We refund unused months prorated ($79 per remaining month). Access cancels immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Outside 60-day window */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f1117', marginBottom: 10 }}>Outside the 60-day window</h2>
            <p style={{ fontSize: 15, color: '#5a5f72', lineHeight: 1.75, fontWeight: 300 }}>
              After 60 days, the guarantee no longer applies. We still handle refund requests case-by-case — reach out and we'll figure it out.
            </p>
          </div>

          {/* Questions */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f1117', marginBottom: 10 }}>Questions</h2>
            <p style={{ fontSize: 15, color: '#5a5f72', lineHeight: 1.75, fontWeight: 300 }}>
              Reply to any email from us, or write to <a href="mailto:carston@getpaintflow.com" style={{ color: ACCENT, textDecoration: 'none' }}>carston@getpaintflow.com</a> directly. The address goes to the founder.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
