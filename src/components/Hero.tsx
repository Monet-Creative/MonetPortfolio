import { useLanguage, whatsappLink } from "../i18n"
import { WhatsAppIcon } from "./WhatsAppButton"

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section id="inicio" className="relative overflow-hidden px-6 pt-20 pb-20 text-center md:pt-28">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-40 h-72 w-xl -translate-x-1/2 rounded-full bg-linear-to-r from-brand-primary to-brand-secondary opacity-20 blur-[100px]"
      />

      <div className="relative mx-auto max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-paper/70 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" />
          </span>
          {t.hero.badge}
        </span>

        <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight text-paper md:text-6xl">
          {t.hero.titleLine1}
          <br />
          <span className="text-gradient">{t.hero.titleLine2}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base text-paper/60 md:text-lg">{t.hero.subtitle}</p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappLink(t.whatsapp.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-paper py-2 pr-6 pl-2 text-sm font-semibold text-ink shadow-[0_8px_40px_-8px_rgba(20,198,253,0.45)] transition-all hover:scale-[1.03] hover:shadow-[0_8px_50px_-6px_rgba(20,198,253,0.65)] sm:w-auto"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]">
              <WhatsAppIcon size={16} />
            </span>
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#casos"
            className="group flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/3 px-6 py-3 text-sm font-semibold text-paper backdrop-blur transition-colors hover:border-white/30 hover:bg-white/8 sm:w-auto"
          >
            {t.hero.ctaSecondary}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {t.hero.highlights.map((item) => (
            <li
              key={item}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs text-paper/65 backdrop-blur"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-brand-primary" aria-hidden>
                <path d="m5 12 5 5L20 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
