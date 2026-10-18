---
name: site-launch
description: Receita completa para colocar um site (Cloudflare Pages) no ar com domínio próprio, SEO, GTM + GA4 + Search Console, consentimento LGPD (Consent Mode v2) com política de privacidade e checkout Mercado Pago (Payment Brick) via Pages Functions. Use quando o usuário pedir para repetir "tudo o que fizemos no site da Monet" em outro site/domínio, conectar GTM/GA/GSC, SEO/llms.txt/robots/sitemap, cookies/LGPD, ou integrar pagamentos Mercado Pago em site estático, mesmo sem citar a palavra "skill".
---

# site-launch — lançar um site completo (domínio, SEO, analytics, LGPD, pagamentos)

Implementação de referência, já testada e em produção: **`D:\MonetPortfolio`** (repo `Monet-Creative/MonetPortfolio`, site https://www.monetcreative.com.br). Para outro site, **copie os arquivos de lá** (mapa em `reference.md`) e troque os parâmetros abaixo. Não reescreva do zero.

Usuário: fala pt-BR, não é técnico em painéis. Dê passos curtos e numerados, diga **em qual tela** clicar, e peça captura quando algo diferir. Veja também [[site-deploy]] e [[monet-site-analytics]] na memória.

## Regras de conduta (aprendidas)
- **Nunca peça nem escreva chaves** (Access Token, Public Key, assinatura do webhook). O usuário cola no terminal quando o `wrangler pages secret put` pedir. Se uma chave vazar no chat, mande gerar outra.
- **Confirme antes de dar push/deploy** (cada push na `main` publica o site). Dê o comando e o commit.
- **Publicar dado pessoal** (CPF, e-mail pessoal) só com ok explícito; sugira **mascarar o CPF** (`***.980.284-**`).
- Não prometa o que não verificou: conferir com `curl`/captura. Taxas, nomes de menu e prazos mudam; diga quando for estimativa.
- Windows + Git Bash: **não deixe `vite preview`/`wrangler pages dev` rodando** (trava `dist/`, EPERM no build). Mate com PowerShell antes de `npm run build`.

## Parâmetros a coletar (pergunte uma vez)
`DOMINIO` (ex.: www.exemplo.com.br), `NOME_MARCA`, `GTM_ID`, `GA4_ID` (G-…), `WHATSAPP`, `EMAIL_CONTATO`, dados do controlador (nome/razão social, CPF/CNPJ **mascarado**, cidade/UF, encarregado + e-mail), catálogo de preços (id → título, valor), nome do projeto Cloudflare Pages, repo GitHub.

## Ordem de execução
1. **Domínio** (A) → 2. **Trocar a origem nos arquivos** (B) → 3. **SEO** (C) → 4. **GTM/GA4 + consentimento** (D, F) → 5. **Search Console** (E) → 6. **Mercado Pago** (G) → 7. **Verificação final** (H).
Dá para fazer G antes do domínio usando `*.pages.dev`; depois troque o webhook.

## A. Domínio próprio (Registro.br → Cloudflare Pages)
1. Cloudflare → **Add a site** (domínio sem www), plano **Free**. Deixe "Import DNS records" em Automatic. "Bot Preference Sync": ok ligado; permitir buscadores/IA.
2. Cloudflare mostra **2 nameservers** (variam por conta, ex.: `nick`/`ruth.ns.cloudflare.com`). No **Registro.br** → domínio → DNS → *Alterar servidores DNS*: deixe **só esses dois**, apague `a.auto.dns.br`/`b.auto.dns.br`. **DNSSEC desligado** (não clicar em "+ DNSSEC"). Se houver e-mail no domínio, confira os registros **MX** importados.
3. Volte ao Cloudflare → **I updated my nameservers** → espera **Active** (minutos a horas).
4. Workers & Pages → projeto → **Custom domains** → *Set up a custom domain*: cadastre `www.DOMINIO` e o apex. Se mostrar o registro CNAME (`www` → `<projeto>.pages.dev`), clique **Check DNS records** (ele costuma criar sozinho). Status **Active** + SSL.
5. **Bot Fight Mode: deixar desligado** (pode barrar webhooks do Mercado Pago).
6. Teste: `nslookup`; se o PC ainda tiver cache DNS, `curl --resolve www.dominio:443:<IP Cloudflare> https://www.dominio/`.
7. Apex responde 200 com `canonical` para o www (suficiente; redirecionamento é opcional).

## B. Trocar a origem do site
`grep -rIl "<origem antiga>"` (sem `node_modules`, `dist`, `.git`) e `sed` para `https://www.DOMINIO` em: `index.html` (canonical, OG, JSON-LD), `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, `public/llms-full.txt`, `public/privacidade.html`, `functions/_lib/http.ts` (comentário), `gtm/*`, `MERCADOPAGO.md`, `.dev.vars.example`. Rode `node gtm/build-container.mjs`, build e teste.

## C. SEO e LLMs
Arquivos em `public/`: `robots.txt` (libera buscadores e bots de IA, `Disallow: /api/` e `/cdn-cgi/`, `Sitemap:`), `sitemap.xml` (home + `/privacidade`), `llms.txt` + `llms-full.txt` (resumo, preços, FAQ, contato, pagamento, privacidade), `og-image.png` 1200×630 (gerada com PIL + fonte do site), `404.html` (noindex), `_headers` (nosniff, referrer, cache `/assets/*`, content-type dos .txt/.xml). No `index.html`: title ≤60, description ≤160, canonical, robots, OG/Twitter, JSON-LD (WebSite, WebPage, Organization/ProfessionalService com `hasOfferCatalog` e `paymentAccepted`, FAQPage com o FAQ visível), fallback `<noscript>` com o conteúdo, `alt` descritivo nas imagens.
Atenção: **`404.html` presente desliga o fallback SPA** do Pages; rotas devem ser hash (`#/checkout/...`) ou arquivos reais.

## D. GTM + GA4 (sem gtag.js hardcoded)
- Só o snippet do **GTM** no HTML (head + noscript). **Não** colar o `gtag.js` do GA4 junto: duplica `page_view`. O GA4 sai de uma tag "Google tag" **dentro do GTM**.
- Eventos vão para o `dataLayer` por `src/lib/analytics.ts`. O container é **gerado** por `gtm/build-container.mjs` → `gtm/monet-gtm-container.json` (config + 1 tag GA4 por evento + gatilhos Custom Event + Scroll Depth 25/50/75/90). Evento novo = entrada em `EVENTS` + push no código, depois regerar.
- Ecommerce (`begin_checkout`, `add_payment_info`, `purchase`): site empurra `ecommerce:{currency,value,items[]}`; tag usa `sendEcommerceData=true` + `getEcommerceDataFrom=dataLayer`. **`purchase` só quando o servidor viu `approved`** (cartão); Pix/boleto aprovam depois (webhook).
- **Importar no GTM:** Administrador → *Importar contêiner* → arquivo → *Default Workspace* → **Mesclar** + **Substituir conflitantes** → Confirmar → **Enviar → Publicar** (nome da versão). "Excluídos" na lista = itens trocados pelo mesmo nome (ok).
- Conferir o publicado: `curl https://www.googletagmanager.com/gtm.js?id=GTM-XXXX | grep -c "<evento>"`.
- Se existir outra tag do Google antiga (`GT-…`), **pause-a** (page_view em dobro).
- **GA4 (Admin → Configurações da propriedade):** *Coleta e modificação de dados → Retenção de dados = 14 meses*. `purchase` já vem como evento-chave e não dá para desmarcar. `generate_lead`: só aparece em *Exibição de dados → Eventos → Eventos recentes* em até 24 h; aí marcar a **estrela**. Dimensões personalizadas de evento (lista no `gtm/README.md`) para ver parâmetros nos relatórios.
- Teste: aba anônima → **Aceitar todos** no banner → clicar WhatsApp → GA4 **Relatórios → Tempo real**. Sem aceitar, **nada** é medido (modo básico).

## E. Search Console
Propriedade de **Domínio** costuma verificar sozinha pelo DNS do Cloudflare (aparece "Provedor do nome de domínio"; **não apagar o TXT**). A meta `google-site-verification` no `index.html` fica de reserva. Depois: **Sitemaps** → `sitemap.xml`; **Inspeção de URL** → testar URL publicado → **Solicitar indexação** (home; `/privacidade` opcional). "Detectada, mas não indexada" é normal por dias; `site:www.dominio` mostra quando entrar.

## F. LGPD / cookies (Consent Mode v2)
- `index.html`: script **antes do GTM** com `gtag('consent','default',{…denied…, functionality/security granted, wait_for_update:500})` + `ads_data_redaction` + replay da escolha salva (`localStorage monet-consent`, v1).
- `src/lib/consent.ts` (salvar, `consent update`, apagar cookies `_ga*` ao revogar, evento `consent_analytics_granted` só em nova concessão), `ConsentBanner.tsx` (Aceitar/Recusar com o **mesmo peso**, Personalizar com Necessários/Estatísticas/Marketing, reabre por rodapé "Cookies" e `/#cookies`), textos pt/en em `i18n.tsx`, links no rodapé.
- Tags GA4 do container com `consentSettings NEEDED` + `analytics_storage`; a tag de config também dispara no gatilho `consent_analytics_granted` (tag bloqueada por consentimento **não é reenviada** sozinha).
- `public/privacidade.html` (URL `/privacidade`): controlador, bases legais (art. 7º), tabela de cookies, compartilhamento (Mercado Pago, Google, Cloudflare, WhatsApp/Meta), retenção (GA4 14 meses), direitos (art. 18), ANPD, crianças. **Preencher** controlador/encarregado; avisar que é modelo e vale revisão jurídica.

## G. Mercado Pago (Payment Brick, Payments API)
**Código (copiar do repo de referência):** `src/lib/catalog.ts` (preços só aqui; browser manda só o id), `src/components/Checkout.tsx` (rota hash `#/checkout/<id>` e `/payment/<paymentId>` com StatusScreen), `ErrorBoundary.tsx`, `functions/api/{mp-config,payments,mp-webhook}.ts`, `functions/_lib/http.ts`, `tests/functions.test.mjs`, `.dev.vars.example`, `MERCADOPAGO.md`. SDK: `@mercadopago/sdk-react` (**pedir autorização** antes de instalar; conferir versão estável com `npm view`). Rodar `validate-bricks-integration.mjs . payment` do plugin `mercadopago` e `node --experimental-strip-types tests/functions.test.mjs`.
**Painel do Mercado Pago (passo a passo para o usuário):**
1. `mercadopago.com.br/developers/panel/app` → criar aplicação **pelo painel manual** (não "com IA") → **Checkout Transparente** (= Bricks no Brasil, não Checkout Pro) → tipo de API **API de payments** ("legacy" mas **não desligada**; Orders API só se um dia migrar) → site informado.
2. **Credenciais de teste** → copiar Public Key e Access Token.
3. **Webhooks → Configurar notificações → Modo de teste**: URL `https://DOMINIO/api/mp-webhook`, evento **Pagamentos (legacy)** (= tópico `payment`; "Order" é da Orders API) → Salvar → revelar **Assinatura secreta**.
4. Segredos (usuário cola no terminal; um por vez): `npx wrangler@3 pages secret put MP_PUBLIC_KEY|MP_ACCESS_TOKEN|MP_WEBHOOK_SECRET --project-name <projeto>`. Só valem no **próximo deploy** (commit vazio resolve).
5. Teste: cartão Visa `4235 6477 2802 5682`, CVV 123, validade 11/30, titular **APRO**, CPF 12345678909. Esperado: "Pagamento aprovado" + botão de briefing por WhatsApp.
6. Produção: **Credenciais de produção** → ativar (site; setor **Serviços de TI**) → webhook em **Modo produção** (assinatura **diferente**) → trocar os 3 segredos → deploy → compra real de R$ 35 (e estorno se quiser).
- `/api/mp-config` 503 = falta `MP_PUBLIC_KEY`; webhook 400 sem assinatura / 401 assinatura errada / 503 sem secret.
- Simulação do painel ("Simular notificação") dá 200 se o secret bate; notificação de pagamento de **teste** pode não chegar.
- Taxas (estimativa de blogs 2021–2025, variam por conta): Pix ~0,99%, crédito ~3,99–4,99%, boleto ~R$ 3,49. Ver *Seu negócio → Custos*.
- Pix só aparece se a conta tiver Pix habilitado; saldo MP exigiria outro Brick.

## H. Verificação final (comandos)
```bash
curl -s https://www.DOMINIO/api/mp-config | head -c 60           # 200 + publicKey
curl -s https://www.DOMINIO/ | grep -o 'rel="canonical" href="[^"]*"'
curl -s https://www.DOMINIO/sitemap.xml | grep -o "<loc>[^<]*"
curl -s "https://www.googletagmanager.com/gtm.js?id=GTM-XXXX" | grep -c generate_lead
npx tsc -b && node --experimental-strip-types tests/functions.test.mjs && npm run build
```
Checklist de aceite: domínio www+apex ativo, HTTPS ok; GTM publicado; GA4 Tempo real mostra `page_view`/`generate_lead` após aceitar cookies; GSC verificado + sitemap; `/privacidade` com dados reais; compra de teste aprovada; webhook 200; retenção 14 meses; sem segredos no Git (`.dev.vars` ignorado).
