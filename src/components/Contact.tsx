import { useLanguage } from "../i18n"

type CardKey = "whatsapp" | "github" | "email"

type CardMeta = {
  key: CardKey
  label: string
  href?: string
  text?: string
  icon: React.ReactNode
  iconBg: string
}

const CARDS: CardMeta[] = [
  {
    key: "whatsapp",
    label: "WHATSAPP",
    href: "https://wa.me/5524981297207",
    text: "(24) 98129-7207",
    iconBg: "bg-[#25D366]",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.45 15.07L2 22l5.08-1.33A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.01.79.8-2.94-.2-.31a8.2 8.2 0 1 1 6.89 3.78Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.78.96-.14.17-.29.19-.53.06a6.7 6.7 0 0 1-3.33-2.9c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.16 1.73 2.64 4.2 3.7 1.57.68 2.19.74 2.98.62.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
      </svg>
    ),
  },
  {
    key: "github",
    label: "GITHUB",
    href: "https://github.com/Monet-Creative",
    iconBg: "bg-black",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
        <path d="M12 .5C5.7.5.5 5.7.5 12a11.5 11.5 0 0 0 7.86 10.94c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.28 5.69.42.36.78 1.06.78 2.15v3.19c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12c0-6.3-5.2-11.5-11.5-11.5Z" />
      </svg>
    ),
  },
  {
    key: "email",
    label: "EMAIL",
    text: "contato.monetcreative@gmail.com",
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
            const body = (
              <>
                {card.href && (
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
                )}

                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg}`}>
                  {card.icon}
                </span>

                <span className="mt-5 block text-xs font-semibold tracking-wider text-ink/40">
                  {card.label}
                </span>
                <span className="mt-1 block text-lg font-semibold">{copy.title}</span>
                <span className={`mt-1 block text-sm ${card.text ? "select-text break-all font-medium text-ink" : "text-ink/55"}`}>
                  {card.text ?? copy.description}
                </span>
              </>
            )

            return card.href ? (
              <a
                key={card.key}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl bg-paper/95 p-6 text-ink transition-transform hover:-translate-y-1"
              >
                {body}
              </a>
            ) : (
              <div key={card.key} className="relative rounded-2xl bg-paper/95 p-6 text-ink">
                {body}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
