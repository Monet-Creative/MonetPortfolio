import { useLanguage } from "../i18n"

const STACK = ["React", "TypeScript", "Tailwind", "Node.js", "Python", "PostgreSQL", "MySQL", "Git"]

export default function Method() {
  const { t } = useLanguage()

  return (
    <section id="metodo" className="relative overflow-hidden px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t.method.eyebrow}</span>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight text-paper md:text-4xl">
            {t.method.headingPrefix} <span className="text-gradient">{t.method.headingGradient}</span>
          </h2>
          <p className="mt-4 text-paper/60">{t.method.subtitle}</p>
        </div>

        <div className="relative mt-14">
          <div
            aria-hidden
            className="absolute left-4 right-0 top-4 hidden h-px bg-linear-to-r from-brand-primary/70 via-brand-secondary/50 to-transparent lg:block"
          />

          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {t.method.steps.map((step, i) => (
              <li key={step.title} className="group relative">
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black text-xs font-semibold text-paper transition-colors duration-300 group-hover:border-brand-primary group-hover:text-brand-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative mt-4 h-[calc(100%-3rem)] overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-white/25 group-hover:bg-white/6">
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <h3 className="text-base font-semibold text-paper">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/55">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
          <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-paper/50">
            {t.method.stackLabel}
          </span>
          <ul className="flex flex-wrap gap-2">
            {STACK.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-paper/70"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
