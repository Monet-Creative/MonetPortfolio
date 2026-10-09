import { CONTACT_EMAIL, useLanguage, whatsappLink } from "../i18n"
import { WhatsAppIcon } from "./WhatsAppButton"

type CardKey = "whatsapp" | "email"

type CardMeta = {
  key: CardKey
  label: string
  text: string
  icon: React.ReactNode
  iconBg: string
}

const CARDS: CardMeta[] = [
  {
    key: "whatsapp",
    label: "WHATSAPP",
    text: "(24) 98129-7207",
    iconBg: "bg-[#25D366]",
    icon: <WhatsAppIcon />,
  },
  {
    key: "email",
    label: "EMAIL",
    text: CONTACT_EMAIL,
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

  const hrefs: Record<CardKey, string> = {
    whatsapp: whatsappLink(t.whatsapp.message),
    email: `mailto:${CONTACT_EMAIL}`,
  }

  return (
    <section id="contato" className="px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
          {t.contact.eyebrow}
        </span>
        <h2 className="mx-auto mt-4 max-w-xl text-balance font-display text-3xl font-semibold leading-tight text-paper md:text-4xl">
          {t.contact.headingPrefix} <span className="text-gradient">{t.contact.headingGradient}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-paper/60">{t.contact.subtitle}</p>

        <div className="mt-10 grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
          {CARDS.map((card) => {
            const copy = t.contact.cards[card.key]
            const external = card.key !== "email"
            return (
              <a
                key={card.key}
                href={hrefs[card.key]}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                className="group relative rounded-2xl bg-[rgba(246,247,251,0.95)] p-6 text-ink transition-transform hover:-translate-y-1"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
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

                <span className="mt-5 block text-xs font-semibold tracking-wider text-ink/50">{card.label}</span>
                <span className="mt-1 block text-lg font-semibold">{copy.title}</span>
                <span className="mt-1 block text-sm text-ink/60">{copy.description}</span>
                <span className="mt-3 block break-all text-sm font-medium text-ink">{card.text}</span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
