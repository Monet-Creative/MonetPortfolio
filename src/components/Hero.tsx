import Logo from "./Logo"
import { useLanguage } from "../i18n"

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section id="inicio" className="relative overflow-hidden px-6 pt-20 pb-16 text-center md:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-40 h-72 w-xl -translate-x-1/2 rounded-full bg-linear-to-r from-brand-primary to-brand-secondary opacity-20 blur-[100px]"
      />

      <div className="relative mx-auto max-w-3xl">
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>

        <h1 className="mt-8 text-balance font-display text-4xl font-semibold leading-[1.15] tracking-tight text-paper md:text-6xl">
          {t.hero.titleLine1}
          <br />
          {t.hero.titleLine2}
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base text-paper/50 md:text-lg">{t.hero.subtitle}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#contato"
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
      </div>
    </section>
  )
}
