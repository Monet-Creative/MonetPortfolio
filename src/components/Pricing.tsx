import { useState, type ReactNode } from "react"
import { useLanguage, whatsappLink } from "../i18n"
import { WhatsAppIcon } from "./WhatsAppButton"

type Tab = "images" | "videos" | "landing"
type Badge = "popular" | "best"

type Pack = { qty: number; total: number; badge?: Badge }

const PACKS: Record<"images" | "videos", Pack[]> = {
  images: [
    { qty: 1, total: 35 },
    { qty: 3, total: 89.7, badge: "popular" },
    { qty: 5, total: 129.5, badge: "best" },
  ],
  videos: [
    { qty: 1, total: 60 },
    { qty: 3, total: 149.7, badge: "popular" },
    { qty: 5, total: 229.5, badge: "best" },
  ],
}

const LANDING_PRICES = { static: 649.9, admin: 799.9 }

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
const formatPrice = (value: number) => brl.format(value).replace(/\s/g, " ")

const CARD_BASE =
  "relative flex h-full flex-col rounded-2xl p-5 backdrop-blur transition-all duration-300 hover:-translate-y-0.5"

function ImageIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="9" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="m4 18 5-5 4 4 3-3 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  )
}

function VideoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="6" width="13" height="12" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="m15.5 11 5-3v8l-5-3" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5 shrink-0 text-brand-primary">
      <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CtaButton({ href, label, highlighted }: { href: string; label: string; highlighted: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`mt-6 flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.03] ${
        highlighted
          ? "bg-linear-to-r from-brand-primary to-brand-secondary text-white shadow-[0_8px_30px_-8px_rgba(78,59,254,0.7)]"
          : "border border-white/15 bg-white/5 text-paper hover:bg-white/10"
      }`}
    >
      <WhatsAppIcon size={16} />
      {label}
    </a>
  )
}

// Gradient frame for highlighted cards; plain border otherwise.
function CardFrame({ highlighted, badge, children }: { highlighted: boolean; badge?: string; children: ReactNode }) {
  return (
    <div className="relative">
      {badge && (
        <span className="absolute -top-3 right-4 z-10 rounded-full bg-brand-primary px-3 py-1 text-[11px] font-bold text-ink shadow-lg">
          {badge}
        </span>
      )}
      <div
        className={`h-full rounded-2xl p-px ${
          highlighted ? "bg-linear-to-br from-brand-primary to-brand-secondary" : "bg-white/10 hover:bg-white/25"
        }`}
      >
        <div className={`${CARD_BASE} bg-ink`}>{children}</div>
      </div>
    </div>
  )
}

export default function Pricing() {
  const { t } = useLanguage()
  const p = t.pricing
  const [tab, setTab] = useState<Tab>("images")

  const tabs: { key: Tab; label: string }[] = [
    { key: "images", label: p.tabs.images },
    { key: "videos", label: p.tabs.videos },
    { key: "landing", label: p.tabs.landing },
  ]

  const order = (item: string, price: string) =>
    whatsappLink(p.ctaMessage.replace("{item}", item).replace("{price}", price))

  return (
    <section id="precos" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{p.eyebrow}</span>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight text-paper md:text-4xl">
            {p.headingPrefix} <span className="text-gradient">{p.headingGradient}</span>
          </h2>
          <p className="mt-4 text-paper/60">{p.subtitle}</p>
        </div>

        <div className="mt-10 flex justify-center">
          <div role="tablist" className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/5 p-1">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                role="tab"
                type="button"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-semibold transition-colors sm:px-6 sm:text-sm ${
                  tab === key ? "bg-paper text-ink" : "text-paper/60 hover:text-paper"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {tab !== "landing" && (
          <div className="mt-6 flex justify-center">
            <span className="rounded-full border border-brand-secondary/60 bg-brand-secondary/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-primary">
              {p.promo}
            </span>
          </div>
        )}

        {tab !== "landing" ? (
          <div role="tabpanel" className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-6 md:max-w-none md:grid-cols-3">
            {PACKS[tab].map(({ qty, total, badge }) => {
              const [singular, plural] = p.unit[tab]
              const title = qty === 1 ? p.packSingle : p.packMulti.replace("{n}", String(qty)).replace("{unit}", plural)
              const item = qty === 1 ? `${p.packSingle} (1 ${singular})` : title
              const price = formatPrice(total)
              return (
                <CardFrame
                  key={qty}
                  highlighted={badge === "popular"}
                  badge={badge === "popular" ? p.popular : badge === "best" ? p.bestValue : undefined}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-secondary/60 bg-brand-secondary/15 text-brand-primary">
                    {tab === "images" ? <ImageIcon /> : <VideoIcon />}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-paper">{title}</h3>
                  <p className="mt-2 flex flex-wrap items-baseline gap-x-2 text-paper/70">
                    <span className="text-3xl font-bold tracking-tight text-gradient">{price}</span>
                    {qty > 1 && <span className="text-sm">{p.total}</span>}
                  </p>
                  <p className="mt-1 text-sm text-paper/55">
                    {qty === 1 ? `1 ${singular}` : `${formatPrice(total / qty)} ${p.each}`}
                  </p>
                  <div className="flex-1" />
                  <CtaButton href={order(item, price)} label={p.cta} highlighted={badge === "popular"} />
                </CardFrame>
              )
            })}
          </div>
        ) : (
          <div role="tabpanel" className="mx-auto mt-12 grid max-w-md grid-cols-1 gap-6 md:max-w-3xl md:grid-cols-2">
            {(["static", "admin"] as const).map((key) => {
              const item = p.landing[key]
              const price = formatPrice(LANDING_PRICES[key])
              const isAdmin = key === "admin"
              return (
                <CardFrame key={key} highlighted={isAdmin} badge={isAdmin ? p.landing.admin.badge : undefined}>
                  <h3 className="text-lg font-semibold leading-snug text-paper md:min-h-[3.25rem]">{item.title}</h3>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-gradient">{price}</p>
                  <p className="mt-3 text-sm leading-relaxed text-paper/55">{item.description}</p>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-paper/75">
                        <CheckIcon />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex-1" />
                  <CtaButton href={order(item.title, price)} label={p.cta} highlighted={isAdmin} />
                </CardFrame>
              )
            })}
          </div>
        )}

        <p className="mt-8 text-center text-xs text-paper/40">{p.note}</p>
      </div>
    </section>
  )
}
