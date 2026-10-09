import { Fragment } from "react"
import { useLanguage } from "../i18n"

export default function ClientLogos() {
  const { t } = useLanguage()
  const row = [...t.services, ...t.services, ...t.services, ...t.services]

  return (
    <section aria-label={t.services.join(", ")} className="mask-fade-x overflow-hidden border-y border-white/5 py-6">
      <div aria-hidden className="flex w-max animate-marquee items-center gap-8 hover:[animation-play-state:paused]">
        {row.map((name, i) => (
          <Fragment key={`${name}-${i}`}>
            <span className="shrink-0 whitespace-nowrap text-sm font-medium uppercase tracking-[0.15em] text-paper/45">
              {name}
            </span>
            <svg width="10" height="10" viewBox="0 0 24 24" className="shrink-0 text-brand-primary/60">
              <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill="currentColor" />
            </svg>
          </Fragment>
        ))}
      </div>
    </section>
  )
}
