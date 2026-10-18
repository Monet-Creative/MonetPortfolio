# site-launch — mapa de arquivos (repo de referência `D:\MonetPortfolio`)

Commits principais (branch `main`, `Monet-Creative/MonetPortfolio`): `42badf5` SEO + GTM/GA4/GSC; `543a4a7` checkout Mercado Pago + LGPD; `864d345` rótulo "Realizar pagamento"; `33f6502` origem → www.monetcreative.com.br; `bfd8c79` política preenchida.

| Arquivo | O que faz | Ao replicar |
|---|---|---|
| `index.html` | consent default → GTM → meta SEO → JSON-LD → noscript | trocar IDs, domínio, textos, FAQ, preços |
| `public/robots.txt`, `sitemap.xml`, `llms*.txt`, `404.html`, `_headers`, `og-image.png` | SEO/LLM | trocar domínio e conteúdo; refazer a og-image |
| `public/privacidade.html` | política LGPD | preencher controlador/encarregado |
| `src/lib/analytics.ts` | `track*`, `trackEcommerce`, `observeSectionViews` | manter |
| `src/lib/consent.ts`, `src/components/ConsentBanner.tsx` | Consent Mode + banner | manter; textos em `i18n.tsx` |
| `src/lib/catalog.ts` | preços (fonte única, também usada pelas Functions) | trocar catálogo e ids |
| `src/components/Checkout.tsx`, `ErrorBoundary.tsx`, `App.tsx` | rota hash + Payment Brick + StatusScreen | trocar textos/ids |
| `functions/api/mp-config.ts`, `payments.ts`, `mp-webhook.ts`, `functions/_lib/http.ts` | backend Pages Functions (REST, sem SDK no servidor) | manter; payload `payments.ts` espelha o Payments API |
| `gtm/build-container.mjs` → `monet-gtm-container.json`, `gtm/README.md` | container GTM gerado | trocar `GA4_ID` e `PUBLIC_ID`; regenerar |
| `tests/functions.test.mjs` | testes offline das Functions (Node 22 `--experimental-strip-types`) | ajustar ids/preços |
| `MERCADOPAGO.md`, `.dev.vars.example` | doc e segredos locais | manter |

## Pegadinhas já resolvidas
- `Functions` em `functions/` viram rotas: **não** coloque testes ali (usei `tests/`).
- `ctx.waitUntil` precisa de `this`: use `ctx.waitUntil(...)`, não destruture.
- SDK do Brick pode **lançar ao desmontar** se o Brick falhou ao iniciar → `ErrorBoundary` remonta; e timeout de 20 s mostra erro em vez de "Carregando" infinito.
- Voltar do checkout para `#precos`: o alvo não existe quando o hash muda → `scrollIntoView({behavior:"instant"})` em rAF + retry 150 ms (CSS tem `scroll-behavior: smooth`).
- `consent update` precisa empurrar o objeto `arguments` no dataLayer (não array).
- Validador do plugin é por regex: precisa de `data-mp-bricks-page`, `derivePurchase(`, `PAYMENTS_URL` literal, `token:`/`installments:`/`payer: { email`.
- Porta 4173 já usada por outro app do usuário (`Estúdio de Sites`): usar outra porta e matar o processo depois.
