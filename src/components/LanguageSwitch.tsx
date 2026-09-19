import { useLanguage, type Lang } from "../i18n"

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "pt", label: "BR" },
  { value: "en", label: "US" },
]

export default function LanguageSwitch() {
  const { lang, setLang } = useLanguage()

  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className="flex items-center gap-0.5 rounded-full border border-white/15 bg-white/5 p-0.5"
    >
      {OPTIONS.map((option) => {
        const active = lang === option.value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => setLang(option.value)}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors ${
              active ? "bg-paper text-ink" : "text-paper/45 hover:text-paper/70"
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
