import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '../ui/SectionLabel'
import { useLanguage } from '../../contexts/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const partners = [
  'Zahnfabrik', 'Dentsply Sirona', 'Nobel Biocare',
  'Osstem Implant', 'Ivoclar Vivadent', 'Dentsply', 'Straumann',
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const els = sectionRef.current!.querySelectorAll('[data-animate]')
      els.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="py-24 lg:py-32 bg-[var(--navy)]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <SectionLabel light>{t.about.label}</SectionLabel>

            <h2 data-animate className="text-4xl lg:text-5xl text-white mb-6 opacity-0">
              {t.about.title}{' '}
              <span className="font-serif italic text-[var(--gold)]">{t.about.titleGold}</span>
            </h2>

            <p data-animate className="font-sans text-white/70 leading-relaxed mb-8 opacity-0">
              {t.about.body}
            </p>

            <ul data-animate className="grid grid-cols-2 gap-4 mb-10 opacity-0">
              {t.about.checkItems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--gold)]/20 flex items-center justify-center">
                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                      <path d="M1 4.5L4 7.5L10 1" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="font-sans text-sm font-medium text-white">{item}</span>
                </li>
              ))}
            </ul>

            <div data-animate className="opacity-0">
              <p className="text-xs font-sans font-bold uppercase tracking-widest text-white/30 mb-4">
                {t.about.partnersLabel}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {partners.map((p) => (
                  <span key={p} className="font-sans text-sm font-semibold text-white/40 hover:text-white/70 transition-colors duration-200">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Videos */}
          <div data-animate className="grid grid-cols-2 gap-4 opacity-0">
            <div className="rounded-xl overflow-hidden border border-[var(--gold)]/30 aspect-[9/16]">
              <video src="/video-Dental/sort-video.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden border border-[var(--gold)]/30 aspect-[9/16] mt-8">
              <video src="/video-Dental/sort-video-2.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
