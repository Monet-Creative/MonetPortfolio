import { CONTACT_EMAIL, INSTAGRAM_URL, useLanguage, whatsappLink } from "../i18n"
import { WhatsAppIcon } from "./WhatsAppButton"

type CardKey = "whatsapp" | "instagram" | "email"

type CardMeta = {
  key: CardKey
  title: string
  text: string
  icon: React.ReactNode
  iconBg: string
}

const CARDS: CardMeta[] = [
  {
    key: "whatsapp",
    title: "WhatsApp",
    text: "(24) 98129-7207",
    iconBg: "bg-[#25D366]",
    icon: <WhatsAppIcon />,
  },
  {
    key: "instagram",
    title: "Instagram",
    text: "@monetcreative_",
    iconBg: "bg-linear-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5]",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="#fff" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
      </svg>
    ),
  },
  {
    key: "email",
    title: "Email",
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
    instagram: INSTAGRAM_URL,
    email: `mailto:${CONTACT_EMAIL}`,
  }

  return (
    <section id="contato" className="px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
          {t.contact.eyebrow}
        </span>
        <h2 className="mx-auto mt-4 max-w-xl text-balance font-display text-3xl font-semibold leading-tight text-paper md:text-4xl">
          {t.contact.headingPrefix} <span className="text-gradient">{t.contact.headingGradient}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-paper/60">{t.contact.subtitle}</p>

        <div className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-3 text-left lg:max-w-none lg:grid-cols-[1fr_1fr_1.3fr]">
          {CARDS.map((card) => {
            const external = card.key !== "email"
            return (
              <a
                key={card.key}
                href={hrefs[card.key]}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                className="group relative flex items-center gap-4 rounded-2xl border border-white/10 bg-white/3 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/6"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110 ${card.iconBg}`}
                >
                  {card.icon}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-paper">{card.title}</span>
                    {card.key === "whatsapp" && (
                      <span className="rounded-full bg-[#25D366]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#25D366]">
                        {t.contact.fastest}
                      </span>
                    )}
                  </span>
                  <span title={card.text} className="mt-0.5 block truncate text-sm text-paper/55">
                    {card.text}
                  </span>
                </span>

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                  className="shrink-0 text-paper/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper"
                >
                  <path
                    d="M7 17 17 7M17 7H9m8 0v8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
