import type { ReactNode } from "react"
import Logo from "./Logo"
import { WhatsAppIcon } from "./WhatsAppButton"
import { CONTACT_EMAIL, GITHUB_URL, INSTAGRAM_URL, useLanguage, whatsappLink } from "../i18n"
import { trackLead, trackNav, trackSocial } from "../lib/analytics"
import { openConsentPreferences } from "../lib/consent"

const LINK = "transition-colors hover:text-paper"

function ColumnTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/80">{children}</h3>
}

function PayChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <li className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-paper/80">
      <span className="text-brand-primary">{icon}</span>
      {label}
    </li>
  )
}

const ICON_PROPS = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const

const PixIcon = (
  <svg {...ICON_PROPS}>
    <path d="M12 3 21 12 12 21 3 12Z" />
    <path d="M8.5 12 12 8.5 15.5 12 12 15.5Z" />
  </svg>
)
const CardIcon = (
  <svg {...ICON_PROPS}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="M3 10h18M7 15h3" />
  </svg>
)
const BoletoIcon = (
  <svg {...ICON_PROPS}>
    <path d="M4 6v12M7.5 6v12M11 6v12M14 6v12M17 6v12M20 6v12" />
  </svg>
)
const LockIcon = (
  <svg {...ICON_PROPS} width={14} height={14}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
)

export default function Footer() {
  const { t } = useLanguage()
  const f = t.footer

  return (
    <footer className="border-t border-white/10 px-6 pt-14 pb-28 sm:pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-paper/55">{f.tagline}</p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={whatsappLink(t.whatsapp.message)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                onClick={() => trackLead("whatsapp", "footer")}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#25D366] transition-transform hover:scale-110"
              >
                <WhatsAppIcon size={17} />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                onClick={() => trackSocial("instagram", "footer", INSTAGRAM_URL)}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] transition-transform hover:scale-110"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="#fff" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="1.8" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
                </svg>
              </a>
            </div>
          </div>

          <nav aria-label={f.navTitle} className="flex flex-col gap-3 text-sm text-paper/55">
            <ColumnTitle>{f.navTitle}</ColumnTitle>
            <a href="#inicio" onClick={() => trackNav(f.inicio, "#inicio", "footer")} className={LINK}>{f.inicio}</a>
            <a href="#casos" onClick={() => trackNav(f.portfolio, "#casos", "footer")} className={LINK}>{f.portfolio}</a>
            <a href="#contato" onClick={() => trackNav(f.contato, "#contato", "footer")} className={LINK}>{f.contato}</a>
          </nav>

          <div className="flex flex-col gap-3 text-sm text-paper/55">
            <ColumnTitle>{f.contactTitle}</ColumnTitle>
            <a
              href={whatsappLink(t.whatsapp.message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLead("whatsapp", "footer")}
              className={LINK}
            >
              (83) 92156-5651
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} onClick={() => trackLead("email", "footer")} className={`${LINK} break-all`}>
              {CONTACT_EMAIL}
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackSocial("github", "footer", GITHUB_URL)}
              className={LINK}
            >
              GitHub
            </a>
          </div>

          <div className="flex flex-col gap-3 text-sm text-paper/55">
            <ColumnTitle>{f.legalTitle}</ColumnTitle>
            <a href="/privacidade" className={LINK}>{f.privacy}</a>
            <button type="button" onClick={openConsentPreferences} className={`${LINK} text-left`}>{f.cookies}</button>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <ColumnTitle>{f.payTitle}</ColumnTitle>
              <p className="mt-2 flex max-w-md items-start gap-2 text-xs leading-relaxed text-paper/50">
                <span className="mt-0.5 shrink-0 text-brand-primary">{LockIcon}</span>
                {f.payNote}
              </p>
            </div>
            <ul className="flex flex-wrap gap-2.5" aria-label={f.payTitle}>
              <PayChip icon={PixIcon} label={f.pix} />
              <PayChip icon={CardIcon} label={f.credit} />
              <PayChip icon={CardIcon} label={f.debit} />
              <PayChip icon={BoletoIcon} label={f.boleto} />
            </ul>
          </div>
        </div>

        <p className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-paper/40">
          © {new Date().getFullYear()} Monet. {f.rights}
        </p>
      </div>
    </footer>
  )
}
