import { useLanguage, whatsappLink } from "../i18n"

export function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.45 15.07L2 22l5.08-1.33A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.01.79.8-2.94-.2-.31a8.2 8.2 0 1 1 6.89 3.78Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.78.96-.14.17-.29.19-.53.06a6.7 6.7 0 0 1-3.33-2.9c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.16 1.73 2.64 4.2 3.7 1.57.68 2.19.74 2.98.62.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  )
}

export default function WhatsAppButton() {
  const { t } = useLanguage()

  return (
    <a
      href={whatsappLink(t.whatsapp.message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.floatingLabel}
      title={t.whatsapp.floatingLabel}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_30px_-6px_rgba(37,211,102,0.6)] transition-transform hover:scale-110"
    >
      <WhatsAppIcon size={28} />
    </a>
  )
}
