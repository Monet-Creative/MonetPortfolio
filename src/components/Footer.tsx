import Logo from "./Logo"
import { GITHUB_URL, useLanguage } from "../i18n"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-white/10 px-6 pt-8 pb-24 sm:pb-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Logo />
        <p className="text-xs text-paper/50">
          © {new Date().getFullYear()} Monet. {t.footer.rights}
        </p>
        <div className="flex items-center gap-5 text-xs text-paper/50">
          <a href="#inicio" className="hover:text-paper">{t.footer.inicio}</a>
          <a href="#casos" className="hover:text-paper">{t.footer.portfolio}</a>
          <a href="#contato" className="hover:text-paper">{t.footer.contato}</a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-paper">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
