// Meta (Facebook) Pixel — env-gated client tracking.
//
// Mirrors the PostHog env-var pattern in main.tsx: everything is gated behind
// VITE_META_PIXEL_ID and no-ops silently when it is unset (e.g. local dev).
//
// The pixel ID is a public, client-side value but MUST match the pixel used by
// the CRM app at app.paintstride.com — that is where the cross-domain
// StartTrial / Purchase events fire. See appLink.ts for the matching UTM story.

import { getStoredUtm } from './appLink'

// fbq's call signatures. Keeping this typed (instead of `any`) means the base
// snippet below stays type-checked and callers can't pass nonsense.
type FbqArgs =
  | ['init', string, Record<string, unknown>?]
  | ['track', string, Record<string, unknown>?, { eventID?: string }?]
  | ['trackCustom', string, Record<string, unknown>?, { eventID?: string }?]
  | [string, ...unknown[]]

interface Fbq {
  (...args: FbqArgs): void
  callMethod?: (...args: FbqArgs) => void
  queue: FbqArgs[]
  push: Fbq
  loaded: boolean
  version: string
}

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
  }
}

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined
const LOADER_SRC = 'https://connect.facebook.net/en_US/fbevents.js'

/**
 * Inject the standard fbq base snippet exactly once and init the pixel.
 *
 * - No-ops when VITE_META_PIXEL_ID is unset.
 * - Guarded against double-init (React StrictMode double-invokes effects, and
 *   main.tsx may be evaluated more than once during HMR).
 * - Inits WITHOUT an automatic PageView — route-change PageViews are fired
 *   explicitly from App.tsx so SPA navigations are captured too.
 */
export function initMetaPixel(): void {
  if (!PIXEL_ID) return
  if (typeof window === 'undefined') return
  if (window.fbq) return // already initialised

  // Hand-typed version of Meta's base snippet (instead of eval'ing a string).
  const fbq = function (...args: FbqArgs) {
    if (fbq.callMethod) {
      fbq.callMethod(...args)
    } else {
      fbq.queue.push(args)
    }
  } as Fbq
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.queue = []
  window.fbq = fbq
  window._fbq = fbq

  if (!document.querySelector(`script[src="${LOADER_SRC}"]`)) {
    const script = document.createElement('script')
    script.async = true
    script.src = LOADER_SRC
    document.head.appendChild(script)
  }

  window.fbq('init', PIXEL_ID)
}

// event_id for Conversions API dedupe later. Native randomUUID when available,
// with a v4-ish fallback for older browsers.
function uuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Safe wrapper around fbq('track', ...). No-ops when the pixel is unconfigured
 * or the library hasn't attached yet. Accepts an optional eventId (one is
 * generated if omitted) so the same id can be replayed via the Conversions API
 * for server-side dedupe. Returns the eventId actually used.
 */
export function trackMeta(
  event: string,
  params?: Record<string, unknown>,
  eventId?: string,
): string | undefined {
  if (!PIXEL_ID) return undefined
  if (typeof window === 'undefined' || !window.fbq) return undefined
  const id = eventId ?? uuid()
  window.fbq('track', event, params ?? {}, { eventID: id })
  return id
}

/**
 * Fire InitiateCheckout for a trial CTA (any link/button that sends the user to
 * app.paintstride.com/checkout). Centralised so every trial CTA reports the
 * same shape. utm_campaign from the stored first-touch UTMs is attached when
 * available so ad-set attribution survives the cross-domain hop.
 */
export function trackTrialCheckout(plan?: 'monthly' | 'annual'): void {
  const utmCampaign = getStoredUtm('utm_campaign')
  trackMeta('InitiateCheckout', {
    content_name: 'trial',
    ...(plan ? { plan } : {}),
    value: 99,
    currency: 'USD',
    ...(utmCampaign ? { utm_campaign: utmCampaign } : {}),
  })
}
