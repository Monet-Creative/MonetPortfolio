import { useLanguage } from "../i18n"
import aviatorImage from "../assets/AviatorImage.jpg"
import gamingCodeImage from "../assets/GamingCodeImage.jpg"
import pokemonImage from "../assets/PokemonImage.jpg"

const CASE_IMAGES = [aviatorImage, gamingCodeImage, pokemonImage]

const CASE_LINKS = [
  "https://lpaviatorinfo.pages.dev/",
  "https://gaming-code.vercel.app/pg-home.html",
  "https://desafio-treinamento-front-fabrica.vercel.app/battlePage.html",
]

export default function Cases() {
  const { t } = useLanguage()

  return (
    <section id="casos" className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-balance text-center font-display text-3xl font-semibold text-paper md:text-4xl">
          {t.cases.heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.cases.items.map((item, i) => (
            <a
              key={item.title}
              href={CASE_LINKS[i]}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex aspect-4/3 flex-col justify-end overflow-hidden rounded-xl p-6 text-paper transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src={CASE_IMAGES[i]}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
              <span className="relative z-10 text-xs font-medium uppercase tracking-wider opacity-80">
                {item.tag}
              </span>
              <p className="relative z-10 mt-2 text-lg font-semibold leading-snug">{item.title}</p>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#" className="text-sm text-paper/50 transition-colors hover:text-paper">
            {t.cases.link}
          </a>
        </div>
      </div>
    </section>
  )
}
