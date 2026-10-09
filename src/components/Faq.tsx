import { useState } from "react"
import { useLanguage, whatsappLink } from "../i18n"
import { WhatsAppIcon } from "./WhatsAppButton"

export default function Faq() {
  const { t } = useLanguage()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t.faq.eyebrow}</span>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight text-paper md:text-4xl">
            {t.faq.headingPrefix} <span className="text-gradient">{t.faq.headingGradient}</span>
          </h2>
          <p className="mt-4 max-w-sm text-paper/60">{t.faq.subtitle}</p>

          <div className="mt-8 max-w-sm rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur">
            <p className="text-sm font-semibold text-paper">{t.faq.ctaText}</p>
            <a
              href={whatsappLink(t.whatsapp.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-paper py-1.5 pr-5 pl-1.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366]">
                <WhatsAppIcon size={14} />
              </span>
              {t.faq.ctaButton}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className={`rounded-2xl border backdrop-blur transition-colors duration-300 ${
                  isOpen ? "border-brand-primary/40 bg-white/6" : "border-white/10 bg-white/3 hover:border-white/20"
                }`}
              >
                <button
                  type="button"
                  id={`faq-btn-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                >
                  <span
                    className={`w-6 shrink-0 text-xs font-semibold tabular-nums transition-colors ${
                      isOpen ? "text-brand-primary" : "text-paper/30"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-sm font-semibold text-paper md:text-base">{item.q}</span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 border-brand-primary bg-brand-primary text-ink"
                        : "border-white/15 text-paper/70"
                    }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pr-5 pb-5 pl-15 md:pr-14 text-sm leading-relaxed text-paper/60">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
