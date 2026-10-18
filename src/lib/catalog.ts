// Single source of truth for package prices. Imported by the pricing UI and by the
// Cloudflare Pages Functions (functions/api/*), which are the only authority on what
// gets charged: the browser sends an offer id, never a price.

export const CURRENCY = "BRL"

export const OFFERS = {
  images_1: { price: 35, title: "Criativos para redes sociais — Pacote Único (1 imagem)" },
  images_3: { price: 89.7, title: "Criativos para redes sociais — Pacote 3 Imagens" },
  images_5: { price: 129.5, title: "Criativos para redes sociais — Pacote 5 Imagens" },
  videos_1: { price: 60, title: "Vídeo animado — Pacote Único (1 vídeo)" },
  videos_3: { price: 149.7, title: "Vídeos animados — Pacote 3 Vídeos" },
  videos_5: { price: 229.5, title: "Vídeos animados — Pacote 5 Vídeos" },
  landing_static: { price: 649.9, title: "Landing Page Estática" },
  landing_admin: { price: 799.9, title: "Landing Page com Painel Administrativo" },
} as const

export type OfferId = keyof typeof OFFERS

export function isOfferId(value: unknown): value is OfferId {
  return typeof value === "string" && Object.hasOwn(OFFERS, value)
}
