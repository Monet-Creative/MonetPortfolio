import { useLanguage } from "../i18n"

type CardKey = "github" | "linkedin" | "email"

type CardMeta = {
  key: CardKey
  label: string
  href: string
  icon: React.ReactNode
  iconBg: string
}

const CARDS: CardMeta[] = [
  {
    key: "github",
    label: "GITHUB",
    href: "#",
    iconBg: "bg-black",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
        <path d="M12 .5C5.7.5.5 5.7.5 12a11.5 11.5 0 0 0 7.86 10.94c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.28 5.69.42.36.78 1.06.78 2.15v3.19c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12c0-6.3-5.2-11.5-11.5-11.5Z" />
      </svg>
    ),
  },
  {
    key: "linkedin",
    label: "LINKEDIN",
    href: "#",
    iconBg: "bg-[#0A66C2]",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12M7.12 20.45H3.56V9h3.56z" />
      </svg>
    ),
  },
  {
    key: "email",
    label: "EMAIL",
    href: "#contato",
    iconBg: "bg-linear-to-br from-brand-primary to-brand-secondary",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 6h18v12H3zM3 6l9 7 9-7"
          stroke="#fff"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

export default function Contact() {
  const { t } = useLanguage()

  return (
    <section id="contato" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
          {t.contact.eyebrow}
        </span>
        <h2 className="mt-4 max-w-xl text-balance font-display text-3xl font-semibold leading-tight text-paper md:text-4xl">
          {t.contact.headingPrefix} <span className="text-gradient">{t.contact.headingGradient}</span>
        </h2>
        <p className="mt-4 max-w-md text-paper/50">{t.contact.subtitle}</p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CARDS.map((card) => {
            const copy = t.contact.cards[card.key]
            return (
              <a
                key={card.key}
                href={card.href}
                className="group relative rounded-2xl bg-paper/95 p-6 text-ink transition-transform hover:-translate-y-1"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute right-5 top-5 text-ink/30"
                >
                  <path
                    d="M7 17 17 7M17 7H9m8 0v8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg}`}>
                  {card.icon}
                </span>

                <span className="mt-5 block text-xs font-semibold tracking-wider text-ink/40">
                  {card.label}
                </span>
                <span className="mt-1 block text-lg font-semibold">{copy.title}</span>
                <span className="mt-1 block text-sm text-ink/55">{copy.description}</span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
