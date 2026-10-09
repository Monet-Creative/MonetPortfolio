import { GITHUB_URL, useLanguage } from "../i18n"
import chaRevelacaoImage from "../assets/ChaRevelacaoImage.jpg"
import aviatorImage from "../assets/AviatorImage.jpg"
import gamingCodeImage from "../assets/GamingCodeImage.jpg"
import pokemonImage from "../assets/PokemonImage.jpg"

const CASE_IMAGES = [chaRevelacaoImage, aviatorImage, gamingCodeImage, pokemonImage]

// Projects without a public URL render as non-clickable cards.
const CASE_LINKS: (string | undefined)[] = [
  undefined,
  "https://lpaviatorinfo.pages.dev/",
  "https://gaming-code.vercel.app/pg-home.html",
  "https://desafio-treinamento-front-fabrica.vercel.app/battlePage.html",
]

const CARD_CLASS =
  "group relative flex flex-col rounded-2xl border border-white/10 bg-white/3 p-2 backdrop-blur transition-all duration-300"

export default function Cases() {
  const { t } = useLanguage()

  return (
    <section id="casos" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {t.cases.eyebrow}
            </span>
            <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight text-paper md:text-4xl">
              {t.cases.headingPrefix} <span className="text-gradient">{t.cases.headingGradient}</span>
            </h2>
            <p className="mt-4 text-paper/60">{t.cases.subtitle}</p>
          </div>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm text-paper/60 transition-colors hover:text-paper"
          >
            {t.cases.link}
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.cases.items.map((item, i) => {
            const href = CASE_LINKS[i]
            const body = (
              <>
                <div className="overflow-hidden rounded-xl border border-white/5 bg-black">
                  <div aria-hidden className="flex h-5 items-center gap-1 bg-white/5 px-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                  </div>
                  <div className="aspect-16/10 overflow-hidden">
                    <img
                      src={CASE_IMAGES[i]}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 px-2 pt-3 pb-1.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-paper">{item.title}</p>
                    <p className="mt-0.5 text-xs text-paper/50">{item.tag}</p>
                  </div>
                  {href && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                      className="shrink-0 text-paper/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper"
                    >
                      <path
                        d="M7 17 17 7M17 7H9m8 0v8"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </>
            )

            return href ? (
              <a
                key={item.title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${CARD_CLASS} hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/6`}
              >
                {body}
              </a>
            ) : (
              <div key={item.title} className={CARD_CLASS}>
                {body}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
