// Gera gtm/monet-gtm-container.json (import no GTM-NV7MXJHN).
// Uso: node gtm/build-container.mjs
// Para novo evento: adicione em EVENTS aqui e o push correspondente em src/lib/analytics.ts.

import { writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const GA4_ID = "G-E7JQV3MPT5"
const PUBLIC_ID = "GTM-NV7MXJHN"
const ACCOUNT = "0"
const CONTAINER = "0"
const ALL_PAGES = "2147479553" // trigger nativo "All Pages"

const EVENTS = [
  { name: "generate_lead", params: ["method", "lead_location", "offer_name", "value", "currency"] },
  { name: "social_click", params: ["network", "link_location", "link_url"] },
  { name: "nav_click", params: ["link_text", "link_url", "link_location"] },
  { name: "cta_click", params: ["cta_text", "cta_location", "link_url"] },
  { name: "case_click", params: ["case_title", "link_url"] },
  { name: "pricing_tab_select", params: ["pricing_tab"] },
  { name: "faq_toggle", params: ["faq_question", "faq_position", "faq_state"] },
  { name: "reel_interaction", params: ["reel_action", "reel_title", "reel_position"] },
  { name: "language_change", params: ["site_language"] },
  { name: "section_view", params: ["section_id"] },
]

const base = { accountId: ACCOUNT, containerId: CONTAINER }
const CONST_VAR = "Const - GA4 Measurement ID"
const CONFIG_TAG = "GA4 - Google tag (config)"

let nextId = 1
const id = () => String(nextId++)

const folders = {
  ga4: { ...base, folderId: id(), name: "GA4", fingerprint: "0" },
  events: { ...base, folderId: id(), name: "GA4 - Eventos", fingerprint: "0" },
  vars: { ...base, folderId: id(), name: "Variáveis dataLayer", fingerprint: "0" },
}

// --- variáveis ---
const variables = [
  {
    ...base,
    variableId: id(),
    name: CONST_VAR,
    type: "c",
    parameter: [{ type: "TEMPLATE", key: "value", value: GA4_ID }],
    fingerprint: "0",
    parentFolderId: folders.ga4.folderId,
    formatValue: {},
  },
]

const allParams = [...new Set(EVENTS.flatMap((e) => e.params))]
const dlvName = (p) => `DLV - ${p}`
for (const p of allParams) {
  variables.push({
    ...base,
    variableId: id(),
    name: dlvName(p),
    type: "v",
    parameter: [
      { type: "INTEGER", key: "dataLayerVersion", value: "2" },
      { type: "BOOLEAN", key: "setDefaultValue", value: "false" },
      { type: "TEMPLATE", key: "name", value: p },
    ],
    fingerprint: "0",
    parentFolderId: folders.vars.folderId,
    formatValue: {},
  })
}

// --- triggers ---
const triggers = []
const customEvent = (name) => {
  const t = {
    ...base,
    triggerId: id(),
    name: `CE - ${name}`,
    type: "CUSTOM_EVENT",
    customEventFilter: [
      {
        type: "EQUALS",
        parameter: [
          { type: "TEMPLATE", key: "arg0", value: "{{_event}}" },
          { type: "TEMPLATE", key: "arg1", value: name },
        ],
      },
    ],
    fingerprint: "0",
    parentFolderId: folders.events.folderId,
  }
  triggers.push(t)
  return t.triggerId
}

const scrollTrigger = {
  ...base,
  triggerId: id(),
  name: "Scroll Depth - 25/50/75/90",
  type: "SCROLL_DEPTH",
  parameter: [
    { type: "BOOLEAN", key: "verticalThresholdOn", value: "true" },
    { type: "BOOLEAN", key: "horizontalThresholdOn", value: "false" },
    { type: "TEMPLATE", key: "verticalThresholdUnits", value: "PERCENT" },
    { type: "TEMPLATE", key: "verticalThresholdsPercent", value: "25,50,75,90" },
    { type: "TEMPLATE", key: "triggerStartOption", value: "WINDOW_LOAD" },
  ],
  fingerprint: "0",
  parentFolderId: folders.events.folderId,
}
triggers.push(scrollTrigger)

// --- tags ---
const tagCommon = {
  ...base,
  fingerprint: "0",
  tagFiringOption: "ONCE_PER_EVENT",
  monitoringMetadata: { type: "MAP" },
  consentSettings: { consentStatus: "NOT_SET" },
}

const tags = [
  {
    ...tagCommon,
    tagId: id(),
    name: CONFIG_TAG,
    type: "googtag",
    parameter: [{ type: "TEMPLATE", key: "tagId", value: `{{${CONST_VAR}}}` }],
    firingTriggerId: [ALL_PAGES],
    parentFolderId: folders.ga4.folderId,
  },
]

const ga4Event = (eventName, settings, triggerId) => ({
  ...tagCommon,
  tagId: id(),
  name: `GA4 - Evento - ${eventName}`,
  type: "gaawe",
  parameter: [
    { type: "BOOLEAN", key: "sendEcommerceData", value: "false" },
    { type: "TEMPLATE", key: "eventName", value: eventName },
    { type: "TEMPLATE", key: "measurementIdOverride", value: `{{${CONST_VAR}}}` },
    {
      type: "LIST",
      key: "eventSettingsTable",
      list: settings.map(([parameter, parameterValue]) => ({
        type: "MAP",
        map: [
          { type: "TEMPLATE", key: "parameter", value: parameter },
          { type: "TEMPLATE", key: "parameterValue", value: parameterValue },
        ],
      })),
    },
  ],
  firingTriggerId: [triggerId],
  parentFolderId: folders.events.folderId,
})

for (const ev of EVENTS) {
  tags.push(
    ga4Event(
      ev.name,
      ev.params.map((p) => [p, `{{${dlvName(p)}}}`]),
      customEvent(ev.name),
    ),
  )
}
tags.push(ga4Event("scroll_depth", [["percent_scrolled", "{{Scroll Depth Threshold}}"]], scrollTrigger.triggerId))

// --- validação ---
const varNames = new Set(variables.map((v) => v.name))
const builtIn = new Set(["_event", "Scroll Depth Threshold"])
const triggerIds = new Set([...triggers.map((t) => t.triggerId), ALL_PAGES])
const names = new Set()
for (const item of [...tags, ...triggers, ...variables]) {
  if (names.has(item.name)) throw new Error(`nome duplicado: ${item.name}`)
  names.add(item.name)
}
for (const m of JSON.stringify([tags, triggers]).matchAll(/\{\{([^}]+)\}\}/g)) {
  if (!varNames.has(m[1]) && !builtIn.has(m[1])) throw new Error(`variável inexistente: ${m[1]}`)
}
for (const t of tags) for (const tid of t.firingTriggerId) if (!triggerIds.has(tid)) throw new Error(`trigger inexistente: ${tid}`)

const container = {
  exportFormatVersion: 2,
  exportTime: "2026-10-17 12:00:00",
  containerVersion: {
    path: `accounts/${ACCOUNT}/containers/${CONTAINER}/versions/0`,
    ...base,
    containerVersionId: "0",
    name: "Monet - GA4 + eventos do site",
    description: `GA4 ${GA4_ID} via GTM. Eventos disparados pelo site (dataLayer) + scroll depth. Veja gtm/README.md.`,
    container: {
      path: `accounts/${ACCOUNT}/containers/${CONTAINER}`,
      ...base,
      name: "monetportfolio.pages.dev",
      publicId: PUBLIC_ID,
      usageContext: ["WEB"],
      fingerprint: "0",
      tagManagerUrl: `https://tagmanager.google.com/#/container/accounts/${ACCOUNT}/containers/${CONTAINER}/workspaces?apiLink=container`,
    },
    folder: Object.values(folders),
    builtInVariable: [
      { ...base, type: "EVENT", name: "Event" },
      { ...base, type: "SCROLL_DEPTH_THRESHOLD", name: "Scroll Depth Threshold" },
      { ...base, type: "PAGE_URL", name: "Page URL" },
      { ...base, type: "PAGE_HOSTNAME", name: "Page Hostname" },
      { ...base, type: "PAGE_PATH", name: "Page Path" },
      { ...base, type: "REFERRER", name: "Referrer" },
    ],
    variable: variables,
    trigger: triggers,
    tag: tags,
    fingerprint: "0",
    tagManagerUrl: `https://tagmanager.google.com/#/versions/accounts/${ACCOUNT}/containers/${CONTAINER}/versions/0?apiLink=version`,
  },
}

const out = join(dirname(fileURLToPath(import.meta.url)), "monet-gtm-container.json")
writeFileSync(out, JSON.stringify(container, null, 2) + "\n")
console.log(`OK ${out}: ${tags.length} tags, ${triggers.length} triggers, ${variables.length} variáveis`)
