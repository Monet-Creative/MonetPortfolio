// Shared helpers for the Cloudflare Pages Functions under functions/api/.
// Secrets (set with `wrangler pages secret put` or the Pages dashboard, never committed):
//   MP_ACCESS_TOKEN    Mercado Pago access token (server only)
//   MP_PUBLIC_KEY      Mercado Pago public key (served to the Bricks via /api/mp-config)
//   MP_WEBHOOK_SECRET  signature secret from the Mercado Pago webhooks panel
//   APP_URL            optional public origin, e.g. https://monetportfolio.pages.dev

export interface Env {
  MP_ACCESS_TOKEN?: string
  MP_PUBLIC_KEY?: string
  MP_WEBHOOK_SECRET?: string
  APP_URL?: string
}

export interface Ctx {
  request: Request
  env: Env
  waitUntil(promise: Promise<unknown>): void
}

export const MP_API = "https://api.mercadopago.com"

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  })
}

export function appBaseUrl(env: Env, request: Request): string {
  const configured = env.APP_URL?.trim().replace(/\/+$/, "")
  return configured || new URL(request.url).origin
}

// Mercado Pago rejects auto_return / notification_url that point to a local or non-HTTPS origin.
export function isPublicHttps(url: string): boolean {
  return /^https:\/\//i.test(url) && !/^https:\/\/(?:localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])(?::|\/|$)/i.test(url)
}

export function mpHeaders(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
}
