import { useState } from "react"
import Logo from "./Logo"
import LanguageSwitch from "./LanguageSwitch"
import { useLanguage } from "../i18n"

export default function Header() {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()

  const navLinks = [
    { label: t.nav.inicio, href: "#inicio" },
    { label: t.nav.metodo, href: "#metodo" },
    { label: t.nav.portfolio, href: "#casos" },
    { label: t.nav.faq, href: "#faq" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#inicio">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-paper/60 transition-colors hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitch />
          <a
            href="#contato"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-paper transition-colors hover:bg-white/10"
          >
            {t.nav.contato}
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitch />
          <button
            type="button"
            className="text-paper"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <path d="M0 1h22M0 8h22M0 15h22" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="flex flex-col gap-4 border-t border-white/10 px-6 py-6 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-paper/70 hover:text-paper"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-center text-sm font-medium text-paper"
          >
            {t.nav.contato}
          </a>
        </div>
      )}
    </header>
  )
}
