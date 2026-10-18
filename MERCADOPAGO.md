# Pagamentos — Mercado Pago (Checkout Bricks, Payment Brick)

Fluxo: botão **Realizar pagamento** nos preços → página `#/checkout/<pacote>` (Payment Brick: cartão, Pix, boleto) →
`POST /api/payments` (Cloudflare Pages Function) cria o pagamento na Payments API → página de resultado com o StatusScreen Brick
+ botão para enviar o briefing por WhatsApp.

| Arquivo | Papel |
|---|---|
| `src/lib/catalog.ts` | Preços e títulos dos pacotes. **Única fonte de verdade**: o navegador só envia o id do pacote |
| `src/components/Checkout.tsx` | Página do Brick (`data-mp-bricks-page`), estados de carregando/processando/erro/sucesso |
| `functions/api/mp-config.ts` | `GET` chave pública em runtime (`no-store`) |
| `functions/api/payments.ts` | `POST` cria o pagamento (valor vindo do catálogo, `X-Idempotency-Key`, `external_reference`) |
| `functions/api/mp-webhook.ts` | Recebe notificações, valida `x-signature` (HMAC-SHA256) e registra o status nos logs |
| `tests/functions.test.mjs` | Testes offline das funções |

## Configurar (uma vez)

1. Mercado Pago → **Suas integrações** → criar/abrir a aplicação → **Credenciais de teste**: copie *Public Key* e *Access Token*.
2. Cadastre os segredos no Cloudflare Pages (nunca no Git). Substitua `monetportfolio` pelo nome do projeto, se for outro:

   ```bash
   npx wrangler@3 pages secret put MP_ACCESS_TOKEN --project-name monetportfolio
   npx wrangler@3 pages secret put MP_PUBLIC_KEY --project-name monetportfolio
   npx wrangler@3 pages secret put MP_WEBHOOK_SECRET --project-name monetportfolio
   ```

   (ou Dashboard → Pages → projeto → Settings → Variables and Secrets).
3. **Webhooks** (painel do MP): URL `https://www.monetcreative.com.br/api/mp-webhook`, evento **Pagamentos**; copie a *chave secreta* para `MP_WEBHOOK_SECRET`.
4. Publicar de novo o site (as Functions só entram no deploy seguinte aos segredos).

## Testar localmente

```bash
cp .dev.vars.example .dev.vars   # preencha com credenciais de TESTE
npm run build
npx wrangler@3 pages dev dist --port 8799
# abra http://localhost:8799/#/checkout/images_1
```

Cartões de teste (Brasil): Visa `4235 6477 2802 5682`, CVV `123`, validade `11/30`, titular `APRO` (aprova), CPF `12345678909`.
Em ambiente local o webhook não é registrado (precisa de URL pública HTTPS).

```bash
node --experimental-strip-types tests/functions.test.mjs   # testes das Functions
```

## Ir para produção

- Troque os três segredos pelos valores de **produção** e rode `/mp-review` antes.
- `purchase` (GA4) só marca cartão aprovado na hora; Pix/boleto aprovam depois e aparecem no log do webhook (Cloudflare → Pages → Functions → Logs).
- Não há banco de dados: o registro de vendas fica no painel do Mercado Pago. Para guardar pedidos/enviar aviso, estenda `mp-webhook.ts` (ponto marcado com o `console.log`).
