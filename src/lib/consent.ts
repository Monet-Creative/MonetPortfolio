// LGPD cookie consent, wired to Google Consent Mode v2 through the GTM dataLayer.
// index.html sets every signal to "denied" before GTM loads and replays a stored choice;
// this module stores new choices and pushes the matching `consent update`.

export type Consent = { analytics: boolean; marketing: boolean }

type Stored = Consent & { v: number; ts: string }

export const CONSENT_KEY = "monet-consent"
export const CONSENT_VERSION = 1
export const OPEN_CONSENT_EVENT = "monet:open-consent"

export function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const stored = JSON.parse(raw) as Partial<Stored>
    if (stored.v !== CONSENT_VERSION) return null
    return { analytics: stored.analytics === true, marketing: stored.marketing === true }
  } catch {
    return null
  }
}

// Consent Mode expects the `arguments` object itself on the dataLayer, not an array.
function gtag(..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  ;(window.dataLayer ??= []).push(arguments)
}

function signal(granted: boolean) {
  return granted ? "granted" : "denied"
}

function expireCookie(name: string) {
  const host = window.location.hostname
  const parts = host.split(".")
  const domains = new Set<string>([host, `.${host}`])
  for (let i = 1; i < parts.length - 1; i++) domains.add(`.${parts.slice(i).join(".")}`)
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  for (const domain of domains) document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`
}

// Revoking analytics also removes the Google Analytics cookies already on the device.
function clearAnalyticsCookies() {
  for (const entry of document.cookie.split(";")) {
    const name = entry.split("=")[0].trim()
    if (/^_ga(_|$)|^_gid$|^_gat/.test(name)) expireCookie(name)
  }
}

export function saveConsent(consent: Consent) {
  const previous = readConsent()
  const stored: Stored = { ...consent, v: CONSENT_VERSION, ts: new Date().toISOString() }
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(stored))
  } catch {
    // storage blocked: the choice still applies to this visit
  }
  gtag("consent", "update", {
    analytics_storage: signal(consent.analytics),
    ad_storage: signal(consent.marketing),
    ad_user_data: signal(consent.marketing),
    ad_personalization: signal(consent.marketing),
  })
  if (!consent.analytics) clearAnalyticsCookies()
  // Only on a new grant: pushing it again would send a second page_view.
  else if (!previous?.analytics) (window.dataLayer ??= []).push({ event: "consent_analytics_granted" })
}

export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))
}
