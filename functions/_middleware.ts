// Keeps the site on its own domain: the default *.pages.dev address 301-redirects to the
// canonical origin (path and query preserved). /api/* is skipped so payment webhooks that
// may still point at pages.dev keep working. Custom domains and preview deployments pass through.
const PAGES_HOST = "monetportfolio.pages.dev"
const CANONICAL_ORIGIN = "https://www.monetcreative.com.br"

export const onRequest = async (context: { request: Request; next: () => Promise<Response> }) => {
  const url = new URL(context.request.url)
  if (url.hostname === PAGES_HOST && !url.pathname.startsWith("/api/")) {
    return Response.redirect(`${CANONICAL_ORIGIN}${url.pathname}${url.search}`, 301)
  }
  return context.next()
}
