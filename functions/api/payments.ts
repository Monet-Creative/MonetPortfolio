// POST /api/payments  { offer, idempotencyKey, formData }  ->  { paymentId, status, statusDetail }
// Payment Brick backend: creates the payment through the Payments API (POST /v1/payments).
// The amount, description and reference come from the server-side catalog; whatever amount the
// browser sends is ignored. Only whitelisted Brick fields are forwarded to Mercado Pago, and card
// tokens are never logged.

import { CURRENCY, OFFERS, isOfferId, type OfferId } from "../../src/lib/catalog.ts"
import { appBaseUrl, isPublicHttps, json, mpHeaders, type Ctx } from "../_lib/http.ts"

const PAYMENTS_URL = "https://api.mercadopago.com/v1/payments"

type Json = Record<string, unknown>

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const METHOD_ID = /^[a-z0-9_]{2,40}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isObject = (v: unknown): v is Json => typeof v === "object" && v !== null && !Array.isArray(v)
const text = (v: unknown, max = 120): string | undefined =>
  typeof v === "string" && v.length > 0 && v.length <= max ? v : undefined

function pick(source: unknown, keys: string[]): Json | undefined {
  if (!isObject(source)) return undefined
  const out: Json = {}
  for (const key of keys) {
    const value = text(source[key]) ?? (typeof source[key] === "number" ? source[key] : undefined)
    if (value !== undefined) out[key] = value
  }
  return Object.keys(out).length ? out : undefined
}

// Email is mandatory; the rest of the payer data (boleto needs name, CPF and address) is whitelisted.
function buildPayer(raw: unknown): { email: string; rest: Json } | undefined {
  if (!isObject(raw)) return undefined
  const email = text(raw.email, 254)
  if (!email || !EMAIL.test(email)) return undefined
  const identification = pick(raw.identification, ["type", "number"])
  const address = pick(raw.address, ["zip_code", "street_name", "street_number", "neighborhood", "city", "federal_unit"])
  return { email, rest: { ...pick(raw, ["first_name", "last_name"]), ...(identification && { identification }), ...(address && { address }) } }
}

// Everything that gets charged is derived here from the server-side catalog, never from the browser.
function derivePurchase(offerId: OfferId, reference: string) {
  const offer = OFFERS[offerId]
  return { amount: offer.price, title: offer.title, externalReference: `monet-${offerId}-${reference}` }
}

export const onRequestPost = async ({ request, env }: Ctx): Promise<Response> => {
  if (!env.MP_ACCESS_TOKEN) {
    console.error("[payments] MP_ACCESS_TOKEN is not configured")
    return json({ error: "checkout_not_configured" }, 503)
  }

  let body: Json
  try {
    const parsed: unknown = await request.json()
    if (!isObject(parsed)) throw new Error("not an object")
    body = parsed
  } catch {
    return json({ error: "invalid_body" }, 400)
  }

  const { offer: offerId, idempotencyKey, formData } = body
  if (!isOfferId(offerId)) return json({ error: "unknown_offer" }, 400)
  if (typeof idempotencyKey !== "string" || !UUID.test(idempotencyKey)) return json({ error: "invalid_idempotency_key" }, 400)
  if (!isObject(formData)) return json({ error: "invalid_form_data" }, 400)

  const methodId = text(formData.payment_method_id, 40)
  const payer = buildPayer(formData.payer)
  if (!methodId || !METHOD_ID.test(methodId) || !payer) return json({ error: "invalid_payment_data" }, 400)

  const purchase = derivePurchase(offerId, idempotencyKey)
  if (!Number.isFinite(purchase.amount) || purchase.amount <= 0) return json({ error: "invalid_amount" }, 500)
  const base = appBaseUrl(env, request)

  const payment: Json = {
    transaction_amount: purchase.amount,
    description: purchase.title,
    payment_method_id: methodId,
    payer: { email: payer.email, ...payer.rest },
    external_reference: purchase.externalReference,
    statement_descriptor: "MONET",
    additional_info: { items: [{ id: offerId, title: purchase.title, quantity: 1, unit_price: purchase.amount }] },
    ...(isPublicHttps(base) && { notification_url: `${base}/api/mp-webhook` }),
  }

  // Card flows carry a single-use token (never logged); Pix/boleto flows do not.
  const cardToken = text(formData.token, 200)
  if (cardToken) {
    const requested = Number(formData.installments)
    const card = {
      token: cardToken,
      installments: Number.isInteger(requested) && requested >= 1 && requested <= 12 ? requested : 1,
    }
    Object.assign(payment, card)
    const issuer = text(formData.issuer_id, 20) ?? (typeof formData.issuer_id === "number" ? String(formData.issuer_id) : undefined)
    if (issuer && /^\d+$/.test(issuer)) payment.issuer_id = Number(issuer)
  }
  const details = pick(formData.transaction_details, ["financial_institution"])
  if (details) payment.transaction_details = details

  let response: Response
  try {
    response = await fetch(PAYMENTS_URL, {
      method: "POST",
      headers: { ...mpHeaders(env.MP_ACCESS_TOKEN), "X-Idempotency-Key": idempotencyKey },
      body: JSON.stringify(payment),
    })
  } catch (err) {
    console.error("[payments] network error", err)
    return json({ error: "payment_failed" }, 502)
  }

  const result = (await response.json().catch(() => ({}))) as { id?: number | string; status?: string; status_detail?: string; message?: string }
  if (!response.ok || result.id === undefined) {
    console.error(`[payments] Mercado Pago ${response.status}: ${result.message ?? "no message"}`)
    return json({ error: "payment_failed" }, response.status >= 500 ? 502 : 400)
  }

  return json({ paymentId: String(result.id), status: result.status ?? "unknown", statusDetail: result.status_detail ?? null, currency: CURRENCY })
}

// Any other method (onRequestPost wins for POST).
export const onRequest = async (): Promise<Response> => json({ error: "method_not_allowed" }, 405)
