// Offline checks for the Pages Functions (no network, no real credentials).
// Run: node --experimental-strip-types tests/functions.test.mjs
import assert from "node:assert/strict"
import { createHmac } from "node:crypto"

const payments = await import("../functions/api/payments.ts")
const config = await import("../functions/api/mp-config.ts")
const webhook = await import("../functions/api/mp-webhook.ts")

const calls = []
globalThis.fetch = async (url, init) => {
  calls.push({ url: String(url), init })
  if (String(url).endsWith("/v1/payments"))
    return new Response(JSON.stringify({ id: 1234567890, status: "approved", status_detail: "accredited" }), { status: 201 })
  return new Response(JSON.stringify({ status: "approved", external_reference: "monet-x", transaction_amount: 1 }), { status: 200 })
}

const env = { MP_ACCESS_TOKEN: "APP_USR-fake", MP_PUBLIC_KEY: "APP_USR-public", MP_WEBHOOK_SECRET: "s3cret", APP_URL: "https://site.example" }
const KEY = "11111111-2222-4333-8444-555555555555"
const post = (body, e = env) =>
  payments.onRequestPost({
    request: new Request("https://site.example/api/payments", { method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json" } }),
    env: e,
    waitUntil() {},
  })
const cardForm = { token: "tok_abc", installments: 1, payment_method_id: "visa", issuer_id: "24", transaction_amount: 0.01, payer: { email: "a@b.co", identification: { type: "CPF", number: "123" }, evil: "x" } }

// happy path: amount comes from the catalog, not from the browser
let res = await post({ offer: "landing_static", idempotencyKey: KEY, formData: cardForm })
assert.equal(res.status, 200)
assert.deepEqual(await res.json(), { paymentId: "1234567890", status: "approved", statusDetail: "accredited", currency: "BRL" })
const sent = JSON.parse(calls.at(-1).init.body)
assert.equal(sent.transaction_amount, 649.9)
assert.equal(sent.installments, 1)
assert.equal(sent.issuer_id, 24)
assert.equal(sent.payer.evil, undefined)
assert.equal(sent.payer.identification.number, "123")
assert.equal(sent.external_reference, `monet-landing_static-${KEY}`)
assert.equal(sent.notification_url, "https://site.example/api/mp-webhook")
assert.equal(calls.at(-1).init.headers["X-Idempotency-Key"], KEY)
assert.equal(calls.at(-1).init.headers.Authorization, "Bearer APP_USR-fake")

// local origin: no notification_url
res = await post({ offer: "images_1", idempotencyKey: KEY, formData: { payment_method_id: "pix", payer: { email: "a@b.co" } } }, { ...env, APP_URL: "http://localhost:8788" })
assert.equal(res.status, 200)
const pix = JSON.parse(calls.at(-1).init.body)
assert.equal(pix.transaction_amount, 35)
assert.equal(pix.token, undefined)
assert.equal(pix.notification_url, undefined)

// rejections
assert.equal((await post({ offer: "nope", idempotencyKey: KEY, formData: cardForm })).status, 400)
assert.equal((await post({ offer: "images_1", idempotencyKey: "bad", formData: cardForm })).status, 400)
assert.equal((await post({ offer: "images_1", idempotencyKey: KEY, formData: { payment_method_id: "visa", payer: { email: "nope" } } })).status, 400)
assert.equal((await post({ offer: "images_1", idempotencyKey: KEY, formData: cardForm }, {})).status, 503)
assert.equal((await payments.onRequest()).status, 405)

// config route
res = await config.onRequest({ request: new Request("https://site.example/api/mp-config"), env })
assert.deepEqual(await res.json(), { publicKey: "APP_USR-public" })
assert.match(res.headers.get("cache-control"), /no-store/)
assert.equal((await config.onRequest({ request: new Request("https://site.example/api/mp-config"), env: {} })).status, 503)

// webhook signature
const sign = (id, reqId, ts, secret = "s3cret") => `ts=${ts},v1=${createHmac("sha256", secret).update(`id:${id};request-id:${reqId};ts:${ts};`).digest("hex")}`
const hook = (headers, env2 = env) => {
  const waits = []
  const p = webhook.onRequest({
    request: new Request("https://site.example/api/mp-webhook?data.id=ABC123&type=payment", { method: "POST", headers, body: JSON.stringify({ type: "payment", data: { id: "ABC123" } }) }),
    env: env2,
    waitUntil: (x) => waits.push(x),
  })
  return p.then(async (r) => (await Promise.all(waits), r))
}
assert.equal((await hook({ "x-request-id": "r1", "x-signature": sign("abc123", "r1", "1700000000") })).status, 200)
assert.equal((await hook({ "x-request-id": "r1", "x-signature": sign("abc123", "r1", "1700000000", "wrong") })).status, 401)
assert.equal((await hook({ "x-request-id": "r1" })).status, 400)
assert.equal((await hook({ "x-request-id": "r1", "x-signature": sign("abc123", "r1", "1") }, { ...env, MP_WEBHOOK_SECRET: undefined })).status, 503)

console.log("functions: all checks passed")
