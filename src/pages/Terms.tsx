const ACCENT = '#2563eb';

export default function Terms() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#0f1117', WebkitFontSmoothing: 'antialiased' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: ACCENT, marginBottom: 12 }}>Legal</div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#0f1117', marginBottom: 12, lineHeight: 1.05 }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: 14, color: '#9ca3af' }}>Last updated: May 18, 2026</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f1117', marginBottom: 10 }}>Acceptance of Terms</h2>
            <p style={{ fontSize: 15, color: '#5a5f72', lineHeight: 1.75, fontWeight: 300 }}>
              By accessing or using PaintFlow, you agree to be bound by these Terms of Service. If you do not agree, do not use the service.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f1117', marginBottom: 10 }}>Use of Service</h2>
            <p style={{ fontSize: 15, color: '#5a5f72', lineHeight: 1.75, fontWeight: 300 }}>
              PaintFlow is a business management platform for painting contractors. You are responsible for maintaining the confidentiality of your account credentials and all activity that occurs under your account.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f1117', marginBottom: 10 }}>Subscription & Billing</h2>
            <p style={{ fontSize: 15, color: '#5a5f72', lineHeight: 1.75, fontWeight: 300 }}>
              PaintFlow is offered on a subscription basis. Fees are billed in advance on a monthly or annual basis. You authorize us to charge your payment method on a recurring basis until you cancel.
            </p>
            <p style={{ fontSize: 15, color: '#5a5f72', lineHeight: 1.75, fontWeight: 300, marginTop: 12 }}>
              Refunds are governed by our <a href="/refund" style={{ color: ACCENT, textDecoration: 'none' }}>Refund Policy</a>. In short: 60-day money-back guarantee tied to running one full job through PaintFlow.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f1117', marginBottom: 10 }}>Data & Privacy</h2>
            <p style={{ fontSize: 15, color: '#5a5f72', lineHeight: 1.75, fontWeight: 300 }}>
              Your data remains yours. We collect and process data as described in our <a href="/privacy" style={{ color: ACCENT, textDecoration: 'none' }}>Privacy Policy</a>. We do not sell your data to third parties.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f1117', marginBottom: 10 }}>Limitation of Liability</h2>
            <p style={{ fontSize: 15, color: '#5a5f72', lineHeight: 1.75, fontWeight: 300 }}>
              PaintFlow is provided "as is" without warranties of any kind. Our liability to you for any claim arising from these terms or your use of the service is limited to the amount you paid us in the 12 months preceding the claim.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f1117', marginBottom: 10 }}>Changes to Terms</h2>
            <p style={{ fontSize: 15, color: '#5a5f72', lineHeight: 1.75, fontWeight: 300 }}>
              We may update these terms from time to time. We'll notify you of material changes via email. Continued use of PaintFlow after changes take effect constitutes acceptance.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0f1117', marginBottom: 10 }}>Contact</h2>
            <p style={{ fontSize: 15, color: '#5a5f72', lineHeight: 1.75, fontWeight: 300 }}>
              Questions about these terms? Email <a href="mailto:carston@getpaintflow.com" style={{ color: ACCENT, textDecoration: 'none' }}>carston@getpaintflow.com</a>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
