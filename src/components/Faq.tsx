import { useState } from "react"
import { useLanguage } from "../i18n"

export default function Faq() {
  const { t } = useLanguage()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
          {t.faq.eyebrow}
        </span>
        <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight text-paper md:text-4xl">
          {t.faq.headingPrefix} {t.faq.headingGradient}
        </h2>

        <div className="mt-10 text-left divide-y divide-paper/10 border-y border-paper/10">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q}>
                <button
                  type="button"
                  id={`faq-btn-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-base font-bold text-white md:text-lg">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-all duration-300 ${
                      isOpen ? "rotate-45 border-brand-primary text-brand-primary" : ""
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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
                    <p className="pb-5 pr-12 text-sm leading-relaxed text-paper/55 md:text-base">{item.a}</p>
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
