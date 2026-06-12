// First-touch UTM capture + app link builder.
//
// The CRM app at app.paintstride.com captures first-touch utm_* params at load
// to attribute signups to ad campaigns. The marketing site must not drop them:
// we capture them once per tab (sessionStorage) and re-append them to every
// navigation link that points at the app.

const STORAGE_KEY = 'ps_utms';
const APP_ORIGIN = 'https://app.paintstride.com';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

/**
 * Capture utm_* params at site load. First-touch wins — never overwrites an
 * earlier capture. Checks the current URL first, then falls back to the
 * referrer's query string (e.g. when an ad redirect lands with utms on the
 * referring URL).
 */
export function captureUtms(): void {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return

    const utms: Record<string, string> = {}

    const collect = (search: string) => {
      const params = new URLSearchParams(search)
      for (const key of UTM_KEYS) {
        const v = params.get(key)
        if (v && !utms[key]) utms[key] = v.slice(0, 200)
      }
    }

    collect(window.location.search)
    if (document.referrer) {
      collect(new URL(document.referrer).search)
    }

    if (Object.keys(utms).length === 0) return

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utms))
  } catch {
    // sessionStorage unavailable (private mode) or malformed referrer — skip silently
  }
}

/**
 * Build an app.paintstride.com URL, appending any stored utm_* params.
 * Params already present in `path` (e.g. ?plan=monthly, ?founding=1) survive;
 * they also take precedence over stored utms on key collision.
 */
export function appUrl(path: string): string {
  const url = new URL(path, APP_ORIGIN)
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) {
      const utms = JSON.parse(raw) as Record<string, string>
      for (const [key, value] of Object.entries(utms)) {
        if (!url.searchParams.has(key)) url.searchParams.set(key, value)
      }
    }
  } catch {
    // ignore — link still works without attribution
  }
  return url.toString()
}
