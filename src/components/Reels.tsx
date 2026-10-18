import { useEffect, useRef, useState } from "react"
import { INSTAGRAM_URL, useLanguage } from "../i18n"
import { track, trackSocial } from "../lib/analytics"
import clinicaClientesVideo from "../assets/reels/clinica-clientes.mp4"
import clinicaClientesFrame from "../assets/reels/clinica-clientes-frame.jpg"
import painelClinicaVideo from "../assets/reels/painel-clinica.mp4"
import painelClinicaFrame from "../assets/reels/painel-clinica-frame.jpg"
import agendamentoOnlineVideo from "../assets/reels/agendamento-online.mp4"
import agendamentoOnlineFrame from "../assets/reels/agendamento-online-frame.jpg"
import siteNoGoogleVideo from "../assets/reels/site-no-google.mp4"
import siteNoGoogleFrame from "../assets/reels/site-no-google-frame.jpg"
import obraPrimaDigitalVideo from "../assets/reels/obra-prima-digital.mp4"
import obraPrimaDigitalFrame from "../assets/reels/obra-prima-digital-frame.jpg"

type Reel = {
  id: string
  video: string
  frame: string
}

// Same order as t.reels.titles.
const REELS: Reel[] = [
  { id: "DeZ64iOBTqq", video: clinicaClientesVideo, frame: clinicaClientesFrame },
  { id: "DeYdWPqBAlT", video: painelClinicaVideo, frame: painelClinicaFrame },
  { id: "DeVxiHHBKnf", video: agendamentoOnlineVideo, frame: agendamentoOnlineFrame },
  { id: "DeQwQj7hKlK", video: siteNoGoogleVideo, frame: siteNoGoogleFrame },
  { id: "DeQrZCkB4du", video: obraPrimaDigitalVideo, frame: obraPrimaDigitalFrame },
]

const ARROW_CLASS =
  "flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/3 text-paper/60 transition-colors hover:border-white/25 hover:text-paper"

// Signed distance from the active reel, wrapping around so the carousel loops.
function offsetFrom(active: number, index: number) {
  const half = REELS.length / 2
  let offset = index - active
  if (offset > half) offset -= REELS.length
  if (offset < -half) offset += REELS.length
  return offset
}

function Chevron({ flip = false }: { flip?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className={flip ? "rotate-180" : ""}>
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Reels() {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const [wantPlay, setWantPlay] = useState(
    () => typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  // Only the active video loads, and only while the carousel is on screen.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (inView && wantPlay) {
      video.play().catch(() => setWantPlay(false))
    } else {
      video.pause()
    }
  }, [active, inView, wantPlay])

  function trackReel(action: string, index = active) {
    track("reel_interaction", { reel_action: action, reel_title: t.reels.titles[index], reel_position: index + 1 })
  }

  function select(index: number, manual = true) {
    const next = (index + REELS.length) % REELS.length
    if (next === active) return
    if (manual) trackReel("select", next)
    setProgress(0)
    setPlaying(false)
    setActive(next)
    setWantPlay(true)
  }

  return (
    <section id="instagram" className="relative overflow-hidden px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {t.reels.eyebrow}
            </span>
            <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight text-paper md:text-4xl">
              {t.reels.headingPrefix} <span className="text-gradient">{t.reels.headingGradient}</span>
            </h2>
            <p className="mt-4 text-paper/60">{t.reels.subtitle}</p>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackSocial("instagram", "reels_header", INSTAGRAM_URL)}
            className="shrink-0 text-sm text-paper/60 transition-colors hover:text-paper"
          >
            @monetcreative_ →
          </a>
        </div>

        <div ref={stageRef} className="relative mx-auto mt-12 aspect-4/5 w-[min(72vw,26rem)]">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-16 rounded-full bg-brand-secondary/25 blur-[100px]"
          />

          {REELS.map((reel, i) => {
            const offset = offsetFrom(active, i)
            const isActive = offset === 0
            const hidden = Math.abs(offset) > 1

            return (
              <div
                key={reel.id}
                inert={hidden}
                className={`absolute inset-0 overflow-hidden rounded-2xl border bg-ink transition-all duration-500 ease-out motion-reduce:transition-none ${
                  isActive
                    ? "z-20 border-white/15 shadow-[0_30px_80px_-30px_rgba(78,59,254,0.8)]"
                    : hidden
                      ? "border-white/10 opacity-0"
                      : "z-10 border-white/10 opacity-40 hover:opacity-70"
                }`}
                style={{ transform: `translateX(${offset * 96}%) scale(${isActive ? 1 : 0.8})` }}
              >
                <img src={reel.frame} alt={t.reels.titles[i]} loading="lazy" decoding="async" className="h-full w-full object-contain" />

                {isActive ? (
                  <>
                    <video
                      ref={videoRef}
                      src={reel.video}
                      poster={reel.frame}
                      muted={muted}
                      playsInline
                      preload="none"
                      className="absolute inset-0 h-full w-full bg-ink object-contain"
                      onPlay={() => setPlaying(true)}
                      onPause={() => setPlaying(false)}
                      onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / e.currentTarget.duration || 0)}
                      onEnded={() => {
                        trackReel("complete")
                        select(active + 1, false)
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => {
                        trackReel(playing ? "pause" : "play")
                        setWantPlay(!playing)
                      }}
                      aria-label={playing ? t.reels.pause : t.reels.play}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span
                        className={`flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/50 text-paper backdrop-blur transition-all duration-300 ${
                          playing ? "scale-90 opacity-0" : "opacity-100"
                        }`}
                      >
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10.4-6.5a1 1 0 0 0 0-1.7l-10.4-6.5A1 1 0 0 0 8 5.5Z" />
                        </svg>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        trackReel(muted ? "unmute" : "mute")
                        setMuted((m) => !m)
                      }}
                      aria-label={muted ? t.reels.unmute : t.reels.mute}
                      className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/55 text-paper backdrop-blur transition-colors hover:bg-black/80"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Z" fill="currentColor" />
                        {muted ? (
                          <path d="m16 9.5 5 5m0-5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        ) : (
                          <path
                            d="M15.5 9a4.2 4.2 0 0 1 0 6m2.6-8.6a8 8 0 0 1 0 11.2"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        )}
                      </svg>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-label={`${t.reels.play}: ${t.reels.titles[i]}`}
                    className="absolute inset-0"
                  />
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold text-paper">{t.reels.titles[active]}</h3>
          <a
            href={`https://www.instagram.com/reel/${REELS[active].id}/`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackReel("open_instagram")}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-paper transition-colors hover:border-white/30 hover:bg-white/10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="text-brand-primary">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
            </svg>
            {t.reels.watch}
          </a>

          <div className="mt-6 flex items-center gap-4">
            <button type="button" onClick={() => select(active - 1)} aria-label={t.reels.previous} className={ARROW_CLASS}>
              <Chevron flip />
            </button>

            <div className="flex items-center gap-1.5">
              {REELS.map((reel, i) => (
                <button
                  key={reel.id}
                  type="button"
                  onClick={() => select(i)}
                  aria-label={t.reels.titles[i]}
                  aria-current={i === active}
                  className={`h-1.5 overflow-hidden rounded-full bg-white/15 transition-all duration-300 ${
                    i === active ? "w-8" : "w-1.5 hover:bg-white/40"
                  }`}
                >
                  {i === active && (
                    <span
                      className="block h-full origin-left bg-linear-to-r from-brand-primary to-brand-secondary"
                      style={{ transform: `scaleX(${progress})` }}
                    />
                  )}
                </button>
              ))}
            </div>

            <button type="button" onClick={() => select(active + 1)} aria-label={t.reels.next} className={ARROW_CLASS}>
              <Chevron />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
