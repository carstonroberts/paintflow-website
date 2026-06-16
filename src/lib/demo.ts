// Demo CTA helper — Calendly popup widget.
//
// Demo CTAs used to be plain anchors that opened calendly.com in a new tab, so
// we never saw the booking complete. Instead we open Calendly's popup widget
// in-page; on completion Calendly posts a `calendly.event_scheduled` window
// `message`, which App.tsx listens for to fire the 'Schedule' conversion.
//
// openDemo() is the single source of truth for the demo link — every demo CTA
// across the site routes through it so the message listener works site-wide.

export const DEMO_URL = 'https://calendly.com/carstonroberts/30min'

const WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css'
const WIDGET_JS = 'https://assets.calendly.com/assets/external/widget.js'

interface Calendly {
  initPopupWidget: (options: { url: string }) => void
}

declare global {
  interface Window {
    Calendly?: Calendly
  }
}

let assetsInjected = false

function ensureCalendlyAssets(): void {
  if (assetsInjected || typeof document === 'undefined') return
  assetsInjected = true

  if (!document.querySelector(`link[href="${WIDGET_CSS}"]`)) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = WIDGET_CSS
    document.head.appendChild(link)
  }
  if (!document.querySelector(`script[src="${WIDGET_JS}"]`)) {
    const script = document.createElement('script')
    script.async = true
    script.src = WIDGET_JS
    document.head.appendChild(script)
  }
}

/**
 * Preload the Calendly widget assets (call once on app mount) so the first demo
 * click opens the popup instantly.
 */
export function preloadCalendly(): void {
  ensureCalendlyAssets()
}

/**
 * Open the 30-min demo as a Calendly popup. Used as an anchor onClick handler:
 * it prevents the default navigation and opens the in-page widget so booking
 * completion can be captured. If the widget script hasn't loaded yet it falls
 * back to opening Calendly in a new tab (link still works without JS).
 */
export function openDemo(e?: { preventDefault?: () => void }): void {
  e?.preventDefault?.()
  ensureCalendlyAssets()
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: DEMO_URL })
  } else {
    window.open(DEMO_URL, '_blank', 'noopener,noreferrer')
  }
}
