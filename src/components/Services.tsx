import type { ReactNode } from "react"
import { useLanguage } from "../i18n"

const CARD_CLASS =
  "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur transition-all duration-300 hover:border-white/25 hover:bg-white/6"

const BAR_HEIGHTS = [35, 55, 42, 70, 58, 85, 66]

function CardText({ chip, title, description }: { chip: string; title: string; description: string }) {
  return (
    <div className="mt-5">
      <span className="rounded-full bg-brand-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-primary">
        {chip}
      </span>
      <h3 className="mt-3 text-base font-semibold text-paper">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-paper/55">{description}</p>
    </div>
  )
}

function MockWindow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div aria-hidden className={`overflow-hidden rounded-xl border border-white/10 bg-black/60 ${className}`}>
      <div className="flex h-5 items-center gap-1 border-b border-white/5 bg-white/5 px-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
      </div>
      {children}
    </div>
  )
}

export default function Services() {
  const { t } = useLanguage()
  const { landing, events, institutional, systems } = t.offer

  return (
    <section id="servicos" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t.offer.eyebrow}</span>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight text-paper md:text-4xl">
            {t.offer.headingPrefix} <span className="text-gradient">{t.offer.headingGradient}</span>
          </h2>
          <p className="mt-4 text-paper/60">{t.offer.subtitle}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {/* Landing page */}
          <article className={`${CARD_CLASS} md:col-span-2`}>
            <MockWindow className="h-44">
              <div className="flex h-[calc(100%-1.25rem)] items-center gap-5 px-6">
                <div className="flex-1">
                  <div className="h-1.5 w-12 rounded-full bg-brand-primary/60" />
                  <p className="mt-3 text-lg font-semibold leading-tight text-paper md:text-xl">
                    <span className="text-gradient">{landing.mockTitle}</span>
                  </p>
                  <div className="mt-3 h-1.5 w-40 max-w-full rounded-full bg-white/15" />
                  <div className="mt-1.5 h-1.5 w-28 rounded-full bg-white/10" />
                  <div className="relative mt-4 inline-block">
                    <span className="inline-block rounded-full bg-paper px-3.5 py-1.5 text-[11px] font-semibold text-ink transition-transform duration-300 group-hover:scale-105">
                      {landing.mockCta}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      className="absolute -right-6 top-5 text-paper transition-transform duration-500 group-hover:-translate-x-5 group-hover:-translate-y-3"
                    >
                      <path d="m4 4 7 16 2-7 7-2z" fill="currentColor" stroke="#000" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
                <div className="hidden h-28 w-36 shrink-0 rounded-lg bg-linear-to-br from-brand-primary/40 to-brand-secondary/40 ring-1 ring-white/10 transition-transform duration-500 group-hover:rotate-2 sm:block" />
              </div>
            </MockWindow>
            <CardText {...landing} />
          </article>

          {/* Events & invitations */}
          <article className={`${CARD_CLASS} md:row-span-2 lg:col-start-3 lg:row-start-1`}>
            <div aria-hidden className="flex flex-1 items-center justify-center py-2">
              <div className="w-44 rounded-[28px] border border-white/15 bg-black p-2 shadow-[0_20px_60px_-20px_rgba(78,59,254,0.55)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-2">
                <div className="relative overflow-hidden rounded-[20px] bg-ink px-3 pt-3 pb-4 text-center ring-1 ring-white/5">
                  <div className="absolute -top-8 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-brand-secondary/40 blur-2xl" />
                  <div className="relative mx-auto h-1 w-10 rounded-full bg-white/15" />
                  <div className="relative mx-auto mt-3 flex h-20 w-24 flex-col items-center justify-center rounded-[40%] bg-linear-to-br from-brand-primary to-brand-secondary text-white shadow-[0_8px_24px_-6px_rgba(20,198,253,0.5)]">
                    <span className="text-xl font-bold leading-none">30</span>
                    <span className="text-[9px] font-semibold uppercase tracking-wider">nov</span>
                  </div>
                  <p className="relative mt-3 text-[10px] font-bold text-paper">{events.mockTitle}</p>
                  <div className="mt-2 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-left text-[8px] text-paper/40">
                    {events.mockName}
                  </div>
                  <div className="mt-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-left text-[8px] text-paper/40">
                    {events.mockGuest}
                  </div>
                  <div className="mt-2 rounded-md bg-linear-to-r from-brand-primary to-brand-secondary py-1 text-[9px] font-semibold text-white transition-transform duration-300 group-hover:scale-105">
                    {events.mockCta}
                  </div>
                </div>
              </div>
            </div>
            <CardText {...events} />
          </article>

          {/* Corporate websites */}
          <article className={CARD_CLASS}>
            <MockWindow className="h-36">
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <div className="h-1.5 w-8 rounded-full bg-white/40" />
                  <div className="flex gap-1.5">
                    <div className="h-1 w-5 rounded-full bg-white/15" />
                    <div className="h-1 w-5 rounded-full bg-white/15" />
                    <div className="h-1 w-5 rounded-full bg-white/15" />
                  </div>
                </div>
                <div className="mt-3 h-10 rounded-md bg-linear-to-r from-brand-secondary/30 to-brand-primary/30" />
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {[0, 1, 2].map((n) => (
                    <div
                      key={n}
                      className="h-10 rounded-md bg-white/8 transition-transform duration-300 group-hover:-translate-y-1"
                      style={{ transitionDelay: `${n * 60}ms` }}
                    />
                  ))}
                </div>
              </div>
            </MockWindow>
            <CardText {...institutional} />
          </article>

          {/* Custom systems */}
          <article className={CARD_CLASS}>
            <MockWindow className="h-36">
              <div className="flex h-[calc(100%-1.25rem)] gap-3 p-3">
                <div className="flex w-8 flex-col gap-1.5">
                  <div className="h-1.5 rounded-full bg-brand-primary/60" />
                  <div className="h-1.5 rounded-full bg-white/15" />
                  <div className="h-1.5 rounded-full bg-white/15" />
                  <div className="h-1.5 rounded-full bg-white/15" />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-paper/50">
                      {systems.mockLabel}
                    </span>
                    <span className="text-[9px] font-semibold text-emerald-400">▲</span>
                  </div>
                  <div className="mt-2 flex flex-1 items-end gap-1.5">
                    {BAR_HEIGHTS.map((h, n) => (
                      <div
                        key={n}
                        className="flex-1 origin-bottom scale-y-75 rounded-t-sm bg-linear-to-t from-brand-secondary to-brand-primary transition-transform duration-500 group-hover:scale-y-100"
                        style={{ height: `${h}%`, transitionDelay: `${n * 40}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </MockWindow>
            <CardText {...systems} />
          </article>
        </div>
      </div>
    </section>
  )
}
