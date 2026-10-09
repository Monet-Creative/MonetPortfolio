import { useLanguage, whatsappLink } from "../i18n"

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section id="inicio" className="relative overflow-hidden px-6 pt-20 pb-16 text-center md:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-40 h-72 w-xl -translate-x-1/2 rounded-full bg-linear-to-r from-brand-primary to-brand-secondary opacity-20 blur-[100px]"
      />

      <div className="relative mx-auto max-w-3xl">
        <h1 className="text-balance font-display text-4xl font-semibold leading-[1.15] tracking-tight text-paper md:text-6xl">
          {t.hero.titleLine1}
          <br />
          <span className="text-gradient">{t.hero.titleLine2}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base text-paper/60 md:text-lg">{t.hero.subtitle}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappLink(t.whatsapp.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] sm:w-auto"
          >
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#casos"
            className="w-full rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-white/10 sm:w-auto"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>

        <ul className="mt-8 flex flex-col items-center justify-center gap-x-6 gap-y-2 text-sm text-paper/60 sm:flex-row sm:flex-wrap">
          {t.hero.highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-brand-primary" aria-hidden>
                <path d="m5 12 5 5L20 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
