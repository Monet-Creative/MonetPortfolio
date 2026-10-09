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

        <ol className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.method.steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl border border-ink/5 bg-paper p-6 text-ink shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-brand-primary to-brand-secondary text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{step.description}</p>
            </li>
          ))}
        </ol>

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
