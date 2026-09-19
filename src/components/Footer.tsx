import Logo from "./Logo"
import { useLanguage } from "../i18n"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Logo />
        <p className="text-xs text-paper/40">
          © {new Date().getFullYear()} Monet. {t.footer.rights}
        </p>
        <div className="flex items-center gap-5 text-xs text-paper/40">
          <a href="#inicio" className="hover:text-paper">{t.footer.inicio}</a>
          <a href="#casos" className="hover:text-paper">{t.footer.portfolio}</a>
          <a href="#contato" className="hover:text-paper">{t.footer.contato}</a>
        </div>
      </div>
    </footer>
  )
}
