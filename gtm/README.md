# GTM + GA4 + Search Console — Monet Creative

| Item | Valor |
|---|---|
| Container GTM | `GTM-NV7MXJHN` |
| Propriedade GA4 (Measurement ID) | `G-E7JQV3MPT5` |
| Search Console | meta `google-site-verification` no `<head>` de `index.html` |
| Site | https://monetportfolio.pages.dev/ |

## Arquitetura

O site carrega **só o GTM**. O GA4 é enviado pelo container (tag "Google tag" com `G-E7JQV3MPT5`).
Não existe `gtag.js` direto no HTML: ter os dois contaria cada visita em dobro.

O site emite eventos no `dataLayer` (`src/lib/analytics.ts`); o container tem um gatilho (Custom Event) + uma tag GA4 por evento.

## Importar o container

1. GTM → **Admin → Importar contêiner** → escolha `gtm/monet-gtm-container.json`.
2. Espaço de trabalho: **Existente** (Default Workspace).
3. Opção: **Mesclar** → **Renomear tags, gatilhos e variáveis conflitantes** (ou "Substituir" se o container está vazio).
4. Confirmar, abrir **Visualizar** (Tag Assistant), testar, **Enviar → Publicar**.

Regenerar o JSON depois de mudar eventos: `node gtm/build-container.mjs`.

## Eventos

| Evento (GA4) | Quando dispara | Parâmetros |
|---|---|---|
| `page_view` | Carregamento (tag Google tag, All Pages) | automático |
| `generate_lead` | Clique em WhatsApp (hero, botão flutuante, FAQ, preços, contato) ou e-mail | `method` (whatsapp/email), `lead_location`, `offer_name`*, `value`*, `currency`* |
| `social_click` | Clique em Instagram / GitHub | `network`, `link_location`, `link_url` |
| `nav_click` | Clique no menu (header, header mobile, footer) | `link_text`, `link_url`, `link_location` |
| `cta_click` | "Ver projetos" e "Fale conosco" | `cta_text`, `cta_location`, `link_url` |
| `case_click` | Clique em um case do portfólio | `case_title`, `link_url` |
| `pricing_tab_select` | Troca de aba de preços | `pricing_tab` (images/videos/landing) |
| `faq_toggle` | Abre/fecha pergunta do FAQ | `faq_question`, `faq_position`, `faq_state` |
| `reel_interaction` | Carrossel de Reels (select, play, pause, mute, unmute, complete, open_instagram) | `reel_action`, `reel_title`, `reel_position` |
| `language_change` | Troca BR/US | `site_language` |
| `section_view` | 1ª vez que cada seção entra na tela | `section_id` |
| `scroll_depth` | Scroll 25/50/75/90% (gatilho nativo do GTM) | `percent_scrolled` |

\* só nos cliques de **preços**: `offer_name` = `images_1|3|5`, `videos_1|3|5`, `landing_static`, `landing_admin`; `value` em BRL.

`lead_location`: `hero`, `floating_button`, `faq`, `pricing`, `contact`.
`section_id`: `inicio`, `servicos`, `casos`, `instagram`, `metodo`, `faq`, `precos`, `contato`.

`faq_question` e `reel_title` seguem o idioma ativo; para análise estável use `faq_position` e `reel_position`.

## No GA4 (Admin) depois de publicar

1. **Eventos → marcar como evento-chave**: `generate_lead`.
2. **Definições personalizadas → Dimensões personalizadas** (escopo **Evento**), criar:
   `lead_location`, `method`, `offer_name`, `link_location`, `cta_location`, `case_title`, `pricing_tab`,
   `faq_question`, `reel_action`, `reel_position`, `site_language`, `section_id`, `network`.
   Sem isso os parâmetros chegam, mas não aparecem nos relatórios.
3. **Fluxo de dados → Medição otimizada**: pode deixar ligada. Rolagem/cliques de saída nativos do GA4 coexistem com `scroll_depth`/`social_click` (nomes diferentes, sem duplicar).

## Search Console

- Propriedade **Prefixo do URL** `https://monetportfolio.pages.dev/` → método **Tag HTML** (a meta já está no site, publicar antes de clicar em Verificar).
- O texto `google-site-verification=...` colado originalmente é a forma **registro DNS TXT**; vale para propriedade de **Domínio** (domínio próprio). `*.pages.dev` não permite DNS: use a tag HTML.
- Se a verificação por tag falhar, método alternativo: **Google Tag Manager** (usa o snippet já instalado).
- Depois: **Sitemaps → enviar** `sitemap.xml`.

## Testar

- GTM → **Visualizar** → URL do site → clicar nos botões → eventos aparecem na timeline.
- GA4 → **Administrador → DebugView** (com o Tag Assistant ativo).
- Console do navegador: `dataLayer` mostra todos os pushes.

## Arquivos de SEO (em `public/`)

`robots.txt` · `sitemap.xml` · `llms.txt` · `llms-full.txt` · `og-image.png` · `404.html` · `_headers` (cache + segurança, Cloudflare Pages).
Dados estruturados (Organization, WebSite, WebPage, FAQPage, OfferCatalog) estão em `index.html`.
Se o site ganhar domínio próprio, troque `https://monetportfolio.pages.dev` por ele em `index.html`, `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`.
