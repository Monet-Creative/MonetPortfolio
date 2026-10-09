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
  "group relative flex aspect-16/10 flex-col justify-end overflow-hidden rounded-xl p-6 text-paper ring-1 ring-white/10"

export default function Cases() {
  const { t } = useLanguage()

  return (
    <section id="casos" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-balance font-display text-3xl font-semibold text-paper md:text-4xl">{t.cases.heading}</h2>
          <p className="mt-3 text-paper/60">{t.cases.subtitle}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {t.cases.items.map((item, i) => {
            const href = CASE_LINKS[i]
            const body = (
              <>
                <img
                  src={CASE_IMAGES[i]}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
                {href && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className="absolute right-5 top-5 text-paper/70 transition-colors group-hover:text-paper"
                  >
                    <path d="M7 17 17 7M17 7H9m8 0v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                <span className="relative z-10 text-xs font-medium uppercase tracking-wider opacity-80">{item.tag}</span>
                <p className="relative z-10 mt-2 text-lg font-semibold leading-snug">{item.title}</p>
              </>
            )

            return href ? (
              <a
                key={item.title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${CARD_CLASS} transition-transform duration-300 hover:-translate-y-1`}
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

        <div className="mt-10 text-center">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-paper/60 transition-colors hover:text-paper"
          >
            {t.cases.link}
          </a>
        </div>
      </div>
    </section>
  )
}
