import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import SectionLabel from '../ui/SectionLabel'

// ─── Inline SVG brand wordmarks ───────────────────────────────────────────────

function StraumannLogo() {
  return (
    <svg viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g fill="#4A5568">
        <path d="M14 10 C14 10 10 14 10 20 C10 26 14 30 20 30 C26 30 28 26 28 22 C28 18 25 16 20 16 C17 16 16 18 16 20 C16 22 17 23 19 23" stroke="#4A5568" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <text x="34" y="26" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="400" letterSpacing="1" fill="#4A5568">straumann</text>
      </g>
    </svg>
  )
}

function VitaLogo() {
  return (
    <svg viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontFamily="Georgia, serif" fontSize="26" fontWeight="700" letterSpacing="4" fill="#4A5568">VITA</text>
    </svg>
  )
}

function SironaLogo() {
  return (
    <svg viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="4" y="12" width="28" height="24" rx="4" fill="#4A5568"/>
      <text x="11" y="28" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700" fill="white">S</text>
      <text x="38" y="27" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="600" fill="#4A5568">sirona</text>
      <text x="38" y="38" fontFamily="Arial, sans-serif" fontSize="7.5" fill="#9CA3AF" letterSpacing="0.3">The Dental Company</text>
    </svg>
  )
}

function NobelBiocareLogo() {
  return (
    <svg viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="4" y="10" width="28" height="28" rx="5" fill="none" stroke="#4A5568" strokeWidth="2"/>
      <text x="18" y="29" textAnchor="middle" fontFamily="Georgia, serif" fontSize="18" fontWeight="700" fill="#4A5568">N</text>
      <text x="40" y="27" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="600" fill="#4A5568">Nobel</text>
      <text x="40" y="40" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="600" fill="#4A5568">Biocare</text>
    </svg>
  )
}

function OsstemLogo() {
  return (
    <svg viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <text x="50%" y="44%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="17" fontWeight="800" fill="#4A5568" letterSpacing="1">
        <tspan>o</tspan><tspan fontWeight="900" fontSize="18">SS</tspan><tspan>tem</tspan><tspan fontSize="8" dx="1" dy="-4">®</tspan>
      </text>
      <text x="50%" y="72%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="600" letterSpacing="3" fill="#9CA3AF">IMPLANT</text>
    </svg>
  )
}

function IvoclarLogo() {
  return (
    <svg viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="8" cy="13" r="3" fill="#4A5568"/>
      <circle cx="8" cy="20" r="1.5" fill="#4A5568"/>
      <circle cx="8" cy="26" r="1.5" fill="#4A5568"/>
      <text x="16" y="22" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="400" fill="#4A5568" letterSpacing="0.3">ivoclar</text>
      <text x="16" y="36" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="400" fill="#4A5568" letterSpacing="0.3">vivadent</text>
      <circle cx="107" cy="36" r="1.5" fill="#4A5568"/>
    </svg>
  )
}

function DentsplyLogo() {
  return (
    <svg viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontFamily="Georgia, serif" fontSize="16" fontWeight="700" letterSpacing="2" fill="#4A5568">DENTSPLY</text>
    </svg>
  )
}

// ─── Partner data ─────────────────────────────────────────────────────────────

const PARTNERS = [
  { id: 'straumann',  name: 'Straumann',        logo: <StraumannLogo /> },
  { id: 'vita',       name: 'Vita Zahnfabrik',   logo: <VitaLogo /> },
  { id: 'sirona',     name: 'Dentsply Sirona',   logo: <SironaLogo /> },
  { id: 'nobel',      name: 'Nobel Biocare',     logo: <NobelBiocareLogo /> },
  { id: 'osstem',     name: 'Osstem Implant',    logo: <OsstemLogo /> },
  { id: 'ivoclar',    name: 'Ivoclar Vivadent',  logo: <IvoclarLogo /> },
  { id: 'dentsply',   name: 'Dentsply',          logo: <DentsplyLogo /> },
]

// Duplicate for seamless loop
const LOOP = [...PARTNERS, ...PARTNERS]

export default function Partners() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: 'start' },
    [AutoScroll({ playOnInit: true, speed: 1.2, stopOnInteraction: false })]
  )

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <SectionLabel>OUR PARTNERS</SectionLabel>
        <h2 className="text-4xl lg:text-5xl text-[var(--navy)] mb-4">
          Brands We{' '}
          <em className="not-italic font-serif italic text-[var(--gold)]">Trust</em>
        </h2>
        <p className="font-sans text-[var(--muted)] max-w-lg mx-auto text-sm leading-relaxed">
          We exclusively use products from world-leading dental brands in Turkey, ensuring premium materials and cutting-edge technology for every treatment.
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
          style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
          style={{ background: 'linear-gradient(to left, white, transparent)' }} />

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-5 px-6">
            {LOOP.map((partner, i) => (
              <div
                key={`${partner.id}-${i}`}
                className="flex-none flex flex-col items-center gap-3"
                style={{ width: 160 }}
              >
                <div className="w-40 h-20 rounded-xl border border-[var(--border)] flex items-center justify-center p-4 bg-white hover:border-[var(--gold)]/40 hover:shadow-[0_4px_16px_rgba(203,161,53,0.12)] transition-all duration-200">
                  <div className="w-full h-full flex items-center justify-center">
                    {partner.logo}
                  </div>
                </div>
                <span className="font-sans text-xs font-semibold text-[var(--gold)]">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
