// Pushes events to the GTM dataLayer. GTM (snippet in index.html) owns GA4 delivery;
// the container lives in gtm/monet-gtm-container.json.

import { CURRENCY, OFFERS, type OfferId } from "./catalog"

type Primitive =string | number | boolean | undefined
type Params = Record<string, Primitive>

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined))
  ;(window.dataLayer ??= []).push({ event, ...clean })
}

// GA4 ecommerce events. `purchase` must only be sent for a payment the server reported as approved.
export function trackEcommerce(
  event: "begin_checkout" | "add_payment_info" | "purchase",
  offerId: OfferId,
  extra: Record<string, string> = {},
) {
  if (typeof window === "undefined") return
  const offer = OFFERS[offerId]
  const layer = (window.dataLayer ??= [])
  layer.push({ ecommerce: null }) // clear the previous ecommerce object
  layer.push({
    event,
    ecommerce: {
      currency: CURRENCY,
      value: offer.price,
      items: [{ item_id: offerId, item_name: offer.title, price: offer.price, quantity: 1 }],
      ...extra,
    },
  })
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
