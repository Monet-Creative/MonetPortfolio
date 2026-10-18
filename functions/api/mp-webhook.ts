// POST /api/mp-webhook  (register this URL in Mercado Pago: Your integrations -> Webhooks -> payment topic)
// Validates the x-signature HMAC-SHA256 before touching the payload, answers 200 immediately and
// looks the payment up afterwards. Results go to the Cloudflare Pages function logs (no database here).

import { json, mpHeaders, MP_API, type Ctx } from "../_lib/http.ts"

const encoder = new TextEncoder()

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"])
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message))
  return [...new Uint8Array(signature)].map((b) => b.toString(16).padStart(2, "0")).join("")
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export const onRequest = async (ctx: Ctx): Promise<Response> => {
  const { request, env } = ctx
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405)
  if (!env.MP_WEBHOOK_SECRET) {
    console.error("[mp-webhook] MP_WEBHOOK_SECRET is not configured")
    return json({ error: "webhook_not_configured" }, 503)
  }

  const url = new URL(request.url)
  let body: { type?: string; data?: { id?: string | number } } = {}
  try {
    body = JSON.parse(await request.text())
  } catch {
    // the signed id also travels in the query string; an empty body is tolerated
  }

  // Mercado Pago signs the lower-cased data.id taken from the query string.
  const dataId = String(url.searchParams.get("data.id") ?? body.data?.id ?? "").toLowerCase()
  const type = url.searchParams.get("type") ?? body.type ?? ""
  const requestId = request.headers.get("x-request-id") ?? ""
  const parts = Object.fromEntries(
    (request.headers.get("x-signature") ?? "").split(",").map((p) => p.split("=").map((s) => s.trim()) as [string, string]),
  )
  const { ts, v1 } = parts
  if (!ts || !v1 || !dataId || !requestId) return json({ error: "bad_request" }, 400)

  const expected = await hmacHex(env.MP_WEBHOOK_SECRET, `id:${dataId};request-id:${requestId};ts:${ts};`)
  if (!safeEqual(expected, v1)) return json({ error: "invalid_signature" }, 401)

  if (type === "payment" && env.MP_ACCESS_TOKEN) {
    const token = env.MP_ACCESS_TOKEN
    // Keep the call on ctx: detaching waitUntil loses its `this` in the Workers runtime.
    ctx.waitUntil(
      (async () => {
        try {
          const res = await fetch(`${MP_API}/v1/payments/${encodeURIComponent(dataId)}`, { headers: mpHeaders(token) })
          if (!res.ok) return console.error(`[mp-webhook] payment ${dataId} lookup failed: ${res.status}`)
          const p = (await res.json()) as { status?: string; status_detail?: string; external_reference?: string; transaction_amount?: number }
          console.log(
            `[mp-webhook] payment=${dataId} status=${p.status} detail=${p.status_detail} ref=${p.external_reference} amount=${p.transaction_amount}`,
          )
        } catch (err) {
          console.error("[mp-webhook] processing error", err)
        }
      })(),
    )
  } else {
    console.log(`[mp-webhook] type=${type} id=${dataId} (no action)`)
  }

  return json({ received: true })
}
