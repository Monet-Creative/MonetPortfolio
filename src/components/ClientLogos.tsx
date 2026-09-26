const CLIENTS = ["LandingPages", "Sites", "Eventos", "Aniversários", "Designs"]

export default function ClientLogos() {
  const row = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS]

  return (
    <section className="overflow-hidden border-y border-white/5 py-10">
      <div className="flex w-max animate-marquee gap-16 hover:[animation-play-state:paused]">
        {row.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="shrink-0 whitespace-nowrap text-lg font-semibold tracking-wide text-paper/30"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  )
}
