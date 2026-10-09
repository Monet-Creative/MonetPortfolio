import { useLanguage } from "../i18n"

export default function ClientLogos() {
  const { t } = useLanguage()
  const row = [...t.services, ...t.services, ...t.services, ...t.services]

  return (
    <section aria-label={t.services.join(", ")} className="overflow-hidden border-y border-white/5 py-10">
      <div aria-hidden className="flex w-max animate-marquee gap-16 hover:[animation-play-state:paused]">
        {row.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="shrink-0 whitespace-nowrap text-lg font-semibold tracking-wide text-paper/40"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  )
}
