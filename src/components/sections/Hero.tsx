import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import { useLanguage } from '../../contexts/LanguageContext'

// ─── Partner logos (inline SVG) ───────────────────────────────────────────────

function StraumannLogo() {
  return (
    <svg viewBox="0 0 160 44" fill="none" xmlns="http://www.w3.org/2000/svg" width="120" height="33">
      <path d="M14 9 C14 9 10 13 10 19 C10 25 14 29 20 29 C26 29 28 25 28 21 C28 17 25 15 20 15 C17 15 16 17 16 19 C16 21 17 22 19 22" stroke="#6B7280" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <text x="33" y="25" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="400" letterSpacing="0.8" fill="#6B7280">straumann</text>
    </svg>
  )
}
function VitaLogo() {
  return (
    <svg viewBox="0 0 100 44" fill="none" xmlns="http://www.w3.org/2000/svg" width="80" height="35">
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontFamily="Georgia,serif" fontSize="24" fontWeight="700" letterSpacing="4" fill="#6B7280">VITA</text>
    </svg>
  )
}
function SironaLogo() {
  return (
    <svg viewBox="0 0 170 44" fill="none" xmlns="http://www.w3.org/2000/svg" width="130" height="34">
      <rect x="2" y="10" width="26" height="24" rx="4" fill="#6B7280"/>
      <text x="15" y="26" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="white">S</text>
      <text x="35" y="25" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="600" fill="#6B7280">sirona</text>
      <text x="35" y="36" fontFamily="Arial,sans-serif" fontSize="7" fill="#9CA3AF" letterSpacing="0.3">The Dental Company</text>
    </svg>
  )
}
function NobelBiocareLogo() {
  return (
    <svg viewBox="0 0 160 44" fill="none" xmlns="http://www.w3.org/2000/svg" width="120" height="34">
      <rect x="2" y="8" width="28" height="28" rx="5" fill="none" stroke="#6B7280" strokeWidth="2"/>
      <text x="16" y="27" textAnchor="middle" fontFamily="Georgia,serif" fontSize="17" fontWeight="700" fill="#6B7280">N</text>
      <text x="38" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="600" fill="#6B7280">Nobel</text>
      <text x="38" y="35" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="600" fill="#6B7280">Biocare</text>
    </svg>
  )
}
function OsstemLogo() {
  return (
    <svg viewBox="0 0 150 44" fill="none" xmlns="http://www.w3.org/2000/svg" width="115" height="34">
      <text x="50%" y="42%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="800" fill="#6B7280" letterSpacing="0.5">oSStem®</text>
      <text x="50%" y="72%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="600" letterSpacing="3" fill="#9CA3AF">IMPLANT</text>
    </svg>
  )
}
function IvoclarLogo() {
  return (
    <svg viewBox="0 0 165 44" fill="none" xmlns="http://www.w3.org/2000/svg" width="125" height="34">
      <circle cx="6" cy="12" r="2.5" fill="#6B7280"/>
      <circle cx="6" cy="19" r="1.5" fill="#6B7280"/>
      <circle cx="6" cy="25" r="1.5" fill="#6B7280"/>
      <text x="14" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="400" fill="#6B7280" letterSpacing="0.3">ivoclar</text>
      <text x="14" y="33" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="400" fill="#6B7280" letterSpacing="0.3">vivadent</text>
    </svg>
  )
}
function DentsplyLogo() {
  return (
    <svg viewBox="0 0 140 44" fill="none" xmlns="http://www.w3.org/2000/svg" width="110" height="34">
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontFamily="Georgia,serif" fontSize="15" fontWeight="700" letterSpacing="2" fill="#6B7280">DENTSPLY</text>
    </svg>
  )
}

const PARTNERS = [
  { id: 'straumann', name: 'Straumann',       logo: <StraumannLogo /> },
  { id: 'vita',      name: 'Vita Zahnfabrik', logo: <VitaLogo /> },
  { id: 'sirona',    name: 'Dentsply Sirona', logo: <SironaLogo /> },
  { id: 'nobel',     name: 'Nobel Biocare',   logo: <NobelBiocareLogo /> },
  { id: 'osstem',    name: 'Osstem Implant',  logo: <OsstemLogo /> },
  { id: 'ivoclar',   name: 'Ivoclar Vivadent',logo: <IvoclarLogo /> },
  { id: 'dentsply',  name: 'Dentsply',        logo: <DentsplyLogo /> },
]
const LOOP_PARTNERS = [...PARTNERS, ...PARTNERS]

function PartnersCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: 'start' },
    [AutoScroll({ playOnInit: true, speed: 0.6, stopOnInteraction: false })]
  )
  return (
    <div className="relative overflow-hidden bg-white py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
        style={{ background: 'linear-gradient(to right,white,transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
        style={{ background: 'linear-gradient(to left,white,transparent)' }} />
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4 px-6">
          {LOOP_PARTNERS.map((p, i) => (
            <div key={`${p.id}-${i}`} className="flex-none flex flex-col items-center gap-2" style={{ width: 148 }}>
              <div className="w-36 h-16 rounded-xl border border-[var(--border)] flex items-center justify-center px-3 bg-white hover:border-[var(--gold)]/40 hover:shadow-[0_4px_16px_rgba(203,161,53,0.1)] transition-all duration-200">
                {p.logo}
              </div>
              <span className="font-sans text-[10px] font-semibold text-[var(--gold)]">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    if (!contentRef.current) return
    const ctx = gsap.context(() => {
      const els = contentRef.current!.querySelectorAll('[data-hero]')
      gsap.fromTo(
        els,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.3 }
      )
    }, contentRef)
    return () => ctx.revert()
  }, [])

  const handleScrollDown = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-[100dvh] min-h-[600px] flex flex-col justify-end overflow-hidden" id="hero">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video-Dental/dental-fp.mp4"
        autoPlay muted loop playsInline
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.4) 60%, transparent 100%)' }}
      />

      {/* Hero sentinel for navbar */}
      <div id="hero-sentinel" className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-28 w-full" ref={contentRef}>
        <p data-hero className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[var(--gold)] mb-5 opacity-0">
          {t.hero.eyebrow}
        </p>

        <h1 className="mb-6 opacity-0" data-hero>
          <span className="block font-sans font-bold text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05]">
            {t.hero.line1}
          </span>
          <span className="block font-serif italic text-[var(--gold)] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05]">
            {t.hero.line2}
          </span>
        </h1>

        <p data-hero className="text-white/75 font-sans text-base sm:text-lg max-w-xl leading-relaxed mb-8 opacity-0">
          {t.hero.subtitle}
        </p>

        <div data-hero className="flex flex-wrap gap-4 opacity-0">
          <button
            onClick={() => handleScrollDown('contact')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-[var(--gold)] border-2 border-[var(--gold)] text-[var(--navy)] font-sans font-semibold text-sm hover:bg-[var(--gold-light)] hover:border-[var(--gold-light)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--gold)] focus-visible:outline-offset-2 active:scale-[0.98]"
          >
            {t.hero.ctaQuote}
          </button>
          <a
            href="https://wa.me/442034889319"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-transparent border-2 border-white/50 text-white font-sans font-semibold text-sm hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--gold)] focus-visible:outline-offset-2 active:scale-[0.98]"
          >
            {t.hero.ctaWhatsapp}
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 bg-[var(--gold)] w-full">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          {[
            { value: t.hero.statPatients, label: t.hero.statPatientsLabel },
            { value: t.hero.statExperience, label: t.hero.statExperienceLabel },
            { value: t.hero.statSatisfaction, label: t.hero.statSatisfactionLabel },
          ].map((s, i, arr) => (
            <div key={i} className="flex items-center gap-3">
              <span className="font-sans font-bold text-[var(--navy)] text-xl">{s.value}</span>
              <span className="font-sans text-[var(--navy)]/70 text-sm">{s.label}</span>
              {i < arr.length - 1 && (
                <span className="hidden sm:block w-px h-6 bg-[var(--navy)]/20 ml-3" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Partners carousel */}
      <PartnersCarousel />
    </section>
  )
}
