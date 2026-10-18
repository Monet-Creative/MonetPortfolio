// GET /api/mp-config -> { "publicKey": "..." }
// Public runtime configuration for the Bricks. Served no-store so a key rotation never leaves a
// stale copy in a CDN or browser cache. The access token is never exposed here.

import { json, type Ctx } from "../_lib/http.ts"

export const onRequest = async ({ request, env }: Ctx): Promise<Response> => {
  if (request.method !== "GET") return json({ error: "method_not_allowed" }, 405)
  if (!env.MP_PUBLIC_KEY) {
    console.error("[mp-config] MP_PUBLIC_KEY is not configured")
    return json({ error: "checkout_not_configured" }, 503)
  }
  return json({ publicKey: env.MP_PUBLIC_KEY })
}
