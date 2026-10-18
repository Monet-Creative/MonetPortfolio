import { useEffect, useState } from "react"
import { useLanguage } from "../i18n"
import { OPEN_CONSENT_EVENT, readConsent, saveConsent, type Consent } from "../lib/consent"

const BUTTON = "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"

function Toggle({
  id,
  title,
  text,
  checked,
  locked,
  lockedLabel,
  onChange,
}: {
  id: string
  title: string
  text: string
  checked: boolean
  locked?: boolean
  lockedLabel?: string
  onChange?: (value: boolean) => void
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/3 p-3">
      <div className="min-w-0 flex-1">
        <label htmlFor={id} className="text-sm font-semibold text-paper">
          {title}
        </label>
        <p className="mt-0.5 text-xs leading-relaxed text-paper/55">{text}</p>
      </div>
      {locked ? (
        <span className="shrink-0 pt-0.5 text-xs font-medium text-paper/50">{lockedLabel}</span>
      ) : (
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#14c6fd]"
        />
      )}
    </div>
  )
}

export default function ConsentBanner() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(() => readConsent() === null)
  const [details, setDetails] = useState(false)
  const [choice, setChoice] = useState<Consent>(() => readConsent() ?? { analytics: false, marketing: false })

  // Footer button and the privacy page (/#cookies) reopen the panel to change a previous choice.
  useEffect(() => {
    const reopen = () => {
      setChoice(readConsent() ?? { analytics: false, marketing: false })
      setDetails(true)
      setOpen(true)
    }
    if (window.location.hash === "#cookies") {
      history.replaceState(null, "", window.location.pathname + window.location.search)
      reopen()
    }
    window.addEventListener(OPEN_CONSENT_EVENT, reopen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen)
  }, [])

  if (!open) return null

  const decide = (consent: Consent) => {
    saveConsent(consent)
    setChoice(consent)
    setOpen(false)
    setDetails(false)
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-text"
      className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-lg rounded-2xl border border-white/15 bg-ink/95 p-5 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] backdrop-blur sm:right-auto sm:left-5 sm:mx-0 sm:max-w-md"
    >
      <h2 id="consent-title" className="text-base font-semibold text-paper">
        {t.consent.title}
      </h2>
      <p id="consent-text" className="mt-2 text-sm leading-relaxed text-paper/65">
        {t.consent.text}{" "}
        <a href="/privacidade" className="text-brand-primary underline underline-offset-2 hover:text-paper">
          {t.consent.policy}
        </a>
        .
      </p>

      {details && (
        <div className="mt-4 flex flex-col gap-2">
          <Toggle id="consent-necessary" title={t.consent.necessaryTitle} text={t.consent.necessaryText} checked locked lockedLabel={t.consent.alwaysOn} />
          <Toggle
            id="consent-analytics"
            title={t.consent.analyticsTitle}
            text={t.consent.analyticsText}
            checked={choice.analytics}
            onChange={(analytics) => setChoice((c) => ({ ...c, analytics }))}
          />
          <Toggle
            id="consent-marketing"
            title={t.consent.marketingTitle}
            text={t.consent.marketingText}
            checked={choice.marketing}
            onChange={(marketing) => setChoice((c) => ({ ...c, marketing }))}
          />
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {/* Accept and decline carry the same visual weight on purpose. */}
        <button
          type="button"
          onClick={() => decide({ analytics: true, marketing: true })}
          className={`${BUTTON} border border-white/20 bg-paper text-ink hover:bg-white`}
        >
          {t.consent.acceptAll}
        </button>
        <button
          type="button"
          onClick={() => decide({ analytics: false, marketing: false })}
          className={`${BUTTON} border border-white/20 bg-paper text-ink hover:bg-white`}
        >
          {t.consent.rejectAll}
        </button>
        {details ? (
          <button
            type="button"
            onClick={() => decide(choice)}
            className={`${BUTTON} border border-white/20 bg-white/5 text-paper hover:bg-white/10`}
          >
            {t.consent.save}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setDetails(true)}
            className={`${BUTTON} border border-white/20 bg-white/5 text-paper hover:bg-white/10`}
          >
            {t.consent.customize}
          </button>
        )}
      </div>
    </div>
  )
}
