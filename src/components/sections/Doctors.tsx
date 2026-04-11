import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '../ui/SectionLabel'
import { useLanguage } from '../../contexts/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const doctors = [
  {
    name: 'Dt. Abdullah Fida',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
  },
  {
    name: 'Dt. Hatice Gül Dal',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80',
  },
  {
    name: 'Dt. Murat Demiral',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80',
  },
  {
    name: 'Dt. Nevzat Çakmak',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80',
  },
]

export default function Doctors() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('[data-card]')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="doctors" className="py-24 lg:py-32 bg-[var(--bg)]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <SectionLabel>{t.doctors.label}</SectionLabel>
          <h2 className="text-4xl lg:text-5xl text-[var(--navy)] mb-4">
            <em className="not-italic font-serif italic text-[var(--gold)]">{t.doctors.titleEm}</em>{' '}
            {t.doctors.titleRest && <span className="font-serif">{t.doctors.titleRest}</span>}
          </h2>
          <p className="font-sans text-[var(--muted)] max-w-xl mx-auto text-base">
            {t.doctors.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {doctors.map((doctor) => (
            <article
              key={doctor.name}
              data-card
              className="relative rounded-xl overflow-hidden group cursor-default opacity-0"
              style={{ boxShadow: 'var(--shadow-card)', aspectRatio: '4/5' }}
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="absolute inset-0 w-full h-full object-cover filter grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.15) 55%, transparent 100%)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-sans text-[10px] font-bold text-[var(--gold)] uppercase tracking-widest mb-1">
                  {t.doctors.titles[doctor.name] ?? 'Cosmetic Dentist'}
                </p>
                <h3 className="font-serif text-base font-bold text-white leading-snug">{doctor.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
