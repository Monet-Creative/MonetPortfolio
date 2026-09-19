import { useLanguage } from "../i18n"

const CARD_STYLES = [
  "bg-linear-to-br from-white to-pink-100 text-black",
  "bg-linear-to-br from-neutral-800 to-black text-paper",
  "bg-linear-to-br from-emerald-950 to-black text-paper",
  "bg-linear-to-br from-brand-secondary to-blue-950 text-paper",
  "bg-linear-to-br from-neutral-100 to-white text-black",
  "bg-linear-to-br from-brand-primary/80 to-neutral-900 text-paper",
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
            <div
              key={item.title}
              className={`group relative flex aspect-4/3 flex-col justify-end overflow-hidden rounded-xl p-6 transition-transform duration-300 hover:-translate-y-1 ${CARD_STYLES[i]}`}
            >
              <span className="text-xs font-medium uppercase tracking-wider opacity-60">
                {item.tag}
              </span>
              <p className="mt-2 text-lg font-semibold leading-snug">{item.title}</p>
            </div>
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
