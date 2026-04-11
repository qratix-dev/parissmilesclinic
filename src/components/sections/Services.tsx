import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '../ui/SectionLabel'
import { services } from '../../data/services'
import { useLanguage } from '../../contexts/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

// Map service IDs in data to translation keys
const SERVICE_KEY_MAP: Record<string, string> = {
  'implantation': 'implants',
  'dental-veneer': 'veneers',
  'teeth-whitening': 'whitening',
  'dental-crown': 'crowns',
  'sinus-lifting': 'sinus',
  'bone-grafting': 'bone',
  'zygomatic-implant': 'zygomatic',
}


interface ServiceCardProps {
  service: typeof services[0]
  featured?: boolean
  name: string
  description: string
  mostPopular: string
  learnMore: string
}

function ServiceCard({ service, featured = false, name, description, mostPopular, learnMore }: ServiceCardProps) {
  return (
    <article
      data-card
      className="relative overflow-hidden group cursor-pointer opacity-0 rounded-2xl w-full"
      style={{
        aspectRatio: featured ? '21/7' : '4/3',
        boxShadow: 'var(--shadow-card)',
        border: '2px solid transparent',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--gold)'
        el.style.boxShadow = 'var(--shadow-hover)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'transparent'
        el.style.boxShadow = 'var(--shadow-card)'
      }}
    >
      <img
        src={service.image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        loading="lazy"
      />
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: featured
            ? 'linear-gradient(to right, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.55) 50%, rgba(15,23,42,0.2) 100%)'
            : 'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.45) 55%, rgba(15,23,42,0.1) 100%)',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {featured ? (
        <div className="absolute inset-0 flex flex-col justify-center px-10 sm:px-16 max-w-xl">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-[var(--gold)]" />
            <span className="font-sans font-bold text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">
              {mostPopular}
            </span>
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">{name}</h3>
          <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed mb-6">{description}</p>
          <span className="inline-flex items-center gap-2 font-sans font-semibold text-sm text-[var(--gold)] group-hover:gap-3 transition-all duration-200">
            {learnMore}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      ) : (
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-serif text-lg font-bold text-white mb-1.5 leading-snug">{name}</h3>
          <p className="font-sans text-xs text-white/65 leading-relaxed">{description}</p>
        </div>
      )}
    </article>
  )
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('[data-card]')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const [featured, ...rest] = services

  const getTranslation = (id: string) => {
    const key = SERVICE_KEY_MAP[id] || id
    return t.services.items[key] || { name: id, description: '' }
  }

  return (
    <section id="services" className="py-24 lg:py-32 bg-[var(--bg)]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <SectionLabel>{t.services.eyebrow}</SectionLabel>
            <h2 className="text-4xl lg:text-5xl text-[var(--navy)]">
              <em className="not-italic font-serif italic text-[var(--gold)]">{t.services.titleEm}</em>{' '}
              {t.services.titleRest && <span className="font-serif">{t.services.titleRest}</span>}
            </h2>
          </div>
          <p className="font-sans text-sm text-[var(--muted)] max-w-xs leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="col-span-full">
            <ServiceCard
              service={featured}
              featured
              name={getTranslation(featured.id).name}
              description={getTranslation(featured.id).description}
              mostPopular={t.services.mostPopular}
              learnMore={t.services.learnMore}
            />
          </div>
          {rest.map((service) => {
            const tr = getTranslation(service.id)
            return (
              <ServiceCard
                key={service.id}
                service={service}
                name={tr.name}
                description={tr.description}
                mostPopular={t.services.mostPopular}
                learnMore={t.services.learnMore}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
