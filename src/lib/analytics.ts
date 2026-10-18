// Pushes events to the GTM dataLayer. GTM (snippet in index.html) owns GA4 delivery;
// the container lives in gtm/monet-gtm-container.json.

type Primitive = string | number | boolean | undefined
type Params = Record<string, Primitive>

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined))
  ;(window.dataLayer ??= []).push({ event, ...clean })
}

export function trackLead(method: "whatsapp" | "email", location: string, extra: Params = {}) {
  track("generate_lead", { method, lead_location: location, ...extra })
}

export function trackSocial(network: "instagram" | "github", location: string, url: string) {
  track("social_click", { network, link_location: location, link_url: url })
}

export function trackNav(text: string, url: string, location: string) {
  track("nav_click", { link_text: text, link_url: url, link_location: location })
}

export function trackCta(text: string, location: string, url: string) {
  track("cta_click", { cta_text: text, cta_location: location, link_url: url })
}

// Fires `section_view` once per section the first time it enters the viewport.
export function observeSectionViews(root: ParentNode = document) {
  const sections = root.querySelectorAll<HTMLElement>("main section[id]")
  const seen = new Set<string>()
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const id = entry.target.id
        if (seen.has(id)) continue
        seen.add(id)
        track("section_view", { section_id: id })
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: "0px 0px -40% 0px" },
  )
  sections.forEach((section) => observer.observe(section))
  return () => observer.disconnect()
}
