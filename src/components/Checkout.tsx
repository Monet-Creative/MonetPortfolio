import { useEffect, useMemo, useRef, useState } from "react"
import { initMercadoPago, Payment, StatusScreen } from "@mercadopago/sdk-react"
import { OFFERS, type OfferId } from "../lib/catalog"
import { trackEcommerce } from "../lib/analytics"
import { useLanguage, whatsappLink } from "../i18n"
import Logo from "./Logo"
import { WhatsAppIcon } from "./WhatsAppButton"

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
const PAYMENT_ID = /^\d{5,20}$/

type SdkState = "loading" | "ready" | "error"

// Public key comes from /api/mp-config at runtime (no rebuild on key rotation, never cached).
function useMercadoPagoSdk(locale: "pt-BR" | "en-US"): SdkState {
  const [state, setState] = useState<SdkState>("loading")

  useEffect(() => {
    let cancelled = false
    fetch("/api/mp-config", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`mp-config ${res.status}`))))
      .then(({ publicKey }: { publicKey?: unknown }) => {
        if (typeof publicKey !== "string" || !publicKey) throw new Error("mp-config without publicKey")
        initMercadoPago(publicKey, { locale })
        if (!cancelled) setState("ready")
      })
      .catch((err) => {
        console.error(err)
        if (!cancelled) setState("error")
      })
    return () => {
      cancelled = true
    }
  }, [locale])

  return state
}

function Shell({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <a href="#inicio" aria-label="Monet">
            <Logo />
          </a>
          <a href="#precos" className="text-sm text-paper/60 transition-colors hover:text-paper">
            ← {t.checkout.back}
          </a>
        </div>
      </header>
      <main className="px-6 py-12">
        <div className="mx-auto max-w-xl">{children}</div>
      </main>
    </div>
  )
}

function Notice({ tone, children }: { tone: "info" | "error"; children: React.ReactNode }) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-xl border px-4 py-3 text-sm ${
        tone === "error" ? "border-red-400/40 bg-red-500/10 text-red-200" : "border-white/10 bg-white/5 text-paper/70"
      }`}
    >
      {children}
    </p>
  )
}

function WhatsAppLink({ message, children }: { message: string; children: React.ReactNode }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 rounded-full bg-paper py-1.5 pr-5 pl-1.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366]">
        <WhatsAppIcon size={14} />
      </span>
      {children}
    </a>
  )
}

function PaymentBrickPanel({ offerId, sdk }: { offerId: OfferId; sdk: SdkState }) {
  const { t } = useLanguage()
  const offer = OFFERS[offerId]
  const [brickReady, setBrickReady] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // One key per purchase attempt: a network retry reuses it, a fresh visit gets a new one.
  const idempotencyKey = useRef(crypto.randomUUID())

  const initialization = useMemo(() => ({ amount: offer.price }), [offer.price])
  const customization = useMemo(
    () => ({
      paymentMethods: { creditCard: "all" as const, debitCard: "all" as const, bankTransfer: "all" as const, ticket: "all" as const },
      visual: { style: { theme: "dark" as const } },
    }),
    [],
  )

  // The SDK can fail without calling onError (bad key, blocked script, ad-blocker): never spin forever.
  useEffect(() => {
    if (sdk !== "ready" || brickReady) return
    const timer = window.setTimeout(() => setError(t.checkout.configError), 20000)
    return () => window.clearTimeout(timer)
  }, [sdk, brickReady, t.checkout.configError])

  const startedFor = useRef<OfferId | null>(null)
  useEffect(() => {
    if (startedFor.current === offerId) return
    startedFor.current = offerId
    trackEcommerce("begin_checkout", offerId)
  }, [offerId])

  return (
    <>
      {sdk === "loading" && <Notice tone="info">{t.checkout.loading}</Notice>}
      {sdk === "error" && <Notice tone="error">{t.checkout.configError}</Notice>}

      {sdk === "ready" && (
        <div aria-busy={!brickReady || processing}>
          {!brickReady && <Notice tone="info">{t.checkout.loading}</Notice>}
          {processing && <Notice tone="info">{t.checkout.processing}</Notice>}
          <Payment
            initialization={initialization}
            customization={customization}
            onReady={() => setBrickReady(true)}
            onError={(err) => {
              console.error("Payment Brick error", err)
              setError(t.checkout.configError)
            }}
            onSubmit={async ({ selectedPaymentMethod, formData }) => {
              setError(null)
              setProcessing(true)
              trackEcommerce("add_payment_info", offerId, { payment_type: selectedPaymentMethod })
              try {
                const res = await fetch("/api/payments", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ offer: offerId, idempotencyKey: idempotencyKey.current, formData }),
                })
                const data = (await res.json().catch(() => null)) as { paymentId?: string; status?: string } | null
                if (!res.ok || !data?.paymentId) throw new Error(`payments ${res.status}`)
                if (data.status === "approved") trackPurchaseOnce(offerId, data.paymentId)
                window.location.hash = `#/checkout/${offerId}/payment/${data.paymentId}`
              } catch (err) {
                setProcessing(false)
                setError(t.checkout.paymentError)
                throw err
              }
            }}
          />
        </div>
      )}

      {error && (
        <div className="mt-4 flex flex-col gap-3">
          <Notice tone="error">{error}</Notice>
          <div>
            <WhatsAppLink message={t.whatsapp.message}>{t.whatsapp.floatingLabel}</WhatsAppLink>
          </div>
        </div>
      )}
    </>
  )
}

// A purchase is only reported for a payment the server saw as approved, once per payment id.
function trackPurchaseOnce(offerId: OfferId, paymentId: string) {
  const key = `mp-purchase-${paymentId}`
  try {
    if (window.sessionStorage.getItem(key)) return
    window.sessionStorage.setItem(key, "1")
  } catch {
    // storage blocked: report anyway, GA4 dedupes on transaction_id
  }
  trackEcommerce("purchase", offerId, { transaction_id: paymentId })
}

function wasApproved(paymentId: string): boolean {
  try {
    return window.sessionStorage.getItem(`mp-purchase-${paymentId}`) === "1"
  } catch {
    return false
  }
}

function PaymentResult({ offerId, paymentId, sdk }: { offerId: OfferId; paymentId: string; sdk: SdkState }) {
  const { t } = useLanguage()
  const [brickReady, setBrickReady] = useState(false)
  const [error, setError] = useState(false)
  const initialization = useMemo(() => ({ paymentId }), [paymentId])
  // Set by onSubmit when our server saw the payment as approved (card); Pix/boleto stay pending.
  const approved = wasApproved(paymentId)

  return (
    <>
      <h2 className="font-display text-xl font-semibold text-paper">{t.checkout.statusHeading}</h2>
      {approved && (
        <p role="status" className="mt-4 rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {t.checkout.approved}
        </p>
      )}
      <div className="mt-4" data-mp-bricks-page="status-screen">
        {(sdk === "loading" || (sdk === "ready" && !brickReady)) && <Notice tone="info">{t.checkout.statusLoading}</Notice>}
        {(sdk === "error" || error) && <Notice tone="error">{t.checkout.configError}</Notice>}
        {sdk === "ready" && (
          <StatusScreen
            initialization={initialization}
            onReady={() => setBrickReady(true)}
            onError={(err) => {
              console.error("Status Screen Brick error", err)
              setError(true)
            }}
          />
        )}
      </div>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/3 p-5">
        <h3 className="text-sm font-semibold text-paper">{t.checkout.briefTitle}</h3>
        <p className="mt-1 text-sm text-paper/60">{t.checkout.briefText}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <WhatsAppLink message={t.checkout.briefMessage.replace("{item}", t.checkout.offers[offerId]).replace("{id}", paymentId)}>
            {t.checkout.briefButton}
          </WhatsAppLink>
          <a href="#inicio" className="text-sm text-paper/60 transition-colors hover:text-paper">
            {t.checkout.backToSite}
          </a>
        </div>
      </section>
    </>
  )
}

export default function Checkout({ offerId, paymentId }: { offerId: OfferId; paymentId?: string }) {
  const { lang, t } = useLanguage()
  const sdk = useMercadoPagoSdk(lang === "pt" ? "pt-BR" : "en-US")
  const offer = OFFERS[offerId]
  const validPayment = paymentId === undefined || PAYMENT_ID.test(paymentId)

  useEffect(() => window.scrollTo(0, 0), [paymentId])

  return (
    <Shell>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">{t.checkout.eyebrow}</span>
      <h1 className="mt-3 text-balance font-display text-2xl font-semibold leading-tight text-paper md:text-3xl">
        {t.checkout.offers[offerId]}
      </h1>

      {paymentId === undefined && (
        <>
          <p className="checkout-total mt-4 flex items-baseline justify-between rounded-xl border border-white/10 bg-white/3 px-4 py-3 text-paper/70">
            <span>{t.checkout.summary}</span>
            <span>
              {t.checkout.total}: <strong className="text-xl text-paper">{brl.format(offer.price)}</strong>
            </span>
          </p>
          <div className="mt-6">
            <div data-mp-bricks-page="payment">
              <PaymentBrickPanel offerId={offerId} sdk={sdk} />
            </div>
          </div>
          <p className="mt-6 text-xs text-paper/40">{t.checkout.secure}</p>
        </>
      )}

      {paymentId !== undefined && (
        <div className="mt-8">
          {validPayment ? (
            <PaymentResult offerId={offerId} paymentId={paymentId} sdk={sdk} />
          ) : (
            <Notice tone="error">{t.checkout.invalidPayment}</Notice>
          )}
        </div>
      )}
    </Shell>
  )
}
