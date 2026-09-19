import { useLanguage } from "../i18n"

type ToolKey = "Frontend" | "Databases" | "Backend" | "Workflow" | "Development" | "Tools"

type ToolMeta = {
  key: ToolKey
  tags: string[]
  icon: React.ReactNode
  iconBg: string
  offset?: string
}

const TOOLS: ToolMeta[] = [
  {
    key: "Frontend",
    tags: ["React", "TypeScript", "HTML", "CSS", "Tailwind"],
    iconBg: "bg-brand-secondary/20 text-brand-secondary",
    offset: "lg:mt-10",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    key: "Databases",
    tags: ["MySQL", "PostgreSQL"],
    iconBg: "bg-brand-secondary/20 text-brand-secondary",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="6" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "Backend",
    tags: ["Node.js", "Python", "Elixir"],
    iconBg: "bg-brand-primary/20 text-brand-primary",
    icon: <span className="font-mono text-sm font-bold">{"{}"}</span>,
  },
  {
    key: "Workflow",
    tags: ["Scrum", "Agile", "Git"],
    iconBg: "bg-brand-primary/20 text-brand-primary",
    offset: "lg:mt-16",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M6 18 18 6M18 6H9m9 0v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "Development",
    tags: ["Clean Code", "Componentes"],
    iconBg: "bg-brand-secondary/20 text-brand-secondary",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "Tools",
    tags: ["Git", "GitHub", "VS Code", "Postman"],
    iconBg: "bg-brand-primary/20 text-brand-primary",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="m4 4 7 16 2-7 7-2z" fill="currentColor" />
      </svg>
    ),
  },
]

export default function ToolsSection() {
  const { t } = useLanguage()

  return (
    <section id="metodo" className="relative overflow-hidden px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <h2 className="text-balance font-display text-3xl font-semibold leading-tight text-paper md:text-4xl">
            {t.tools.headingLine1}
            <br />
            {t.tools.headingLine2}{" "}
            <span className="text-gradient">{t.tools.headingGradient}</span>
          </h2>
          <p className="mt-4 text-paper/50">{t.tools.subtitle}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => {
            const copy = t.tools.items[tool.key]
            return (
              <div
                key={tool.key}
                className={`rounded-2xl border border-ink/5 bg-paper p-6 text-ink shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] ${tool.offset ?? ""}`}
              >
                <div className="flex items-start justify-between">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${tool.iconBg}`}>
                    {tool.icon}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-ink/30">
                    <path d="M7 17 17 7M17 7H9m8 0v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <h3 className="mt-4 text-base font-semibold">{copy.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/55">{copy.description}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-ink/5 px-2.5 py-1 text-xs font-medium text-ink/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
