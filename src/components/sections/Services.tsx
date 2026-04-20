import { useState, useEffect, useRef, type ReactElement } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '../ui/SectionLabel'
import { services } from '../../data/services'
import { useLanguage } from '../../contexts/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const SERVICE_KEY_MAP: Record<string, string> = {
  'implantation':    'implants',
  'dental-veneer':   'veneers',
  'teeth-whitening': 'whitening',
  'dental-crown':    'crowns',
  'sinus-lifting':   'sinus',
  'bone-grafting':   'bone',
}

function ServiceIcon({ id }: { id: string }) {
  const icons: Record<string, ReactElement> = {
    implantation: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    'dental-veneer': (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3L4 8v5c0 5.5 3.5 10.7 8 12 4.5-1.3 8-6.5 8-12V8l-8-5z" />
      </svg>
    ),
    'teeth-whitening': (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
    'dental-crown': (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 8l4 8h12l4-8-5 3-5-7-5 7-5-3z" />
      </svg>
    ),
    'sinus-lifting': (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V4M4 12h16" /><circle cx="12" cy="4" r="2" />
      </svg>
    ),
    'bone-grafting': (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 3a3 3 0 0 0-3 3 3 3 0 0 0-3-3 3 3 0 0 0-3 3v10a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z" />
      </svg>
    ),
  }
  return icons[id] || icons['dental-veneer']
}

interface ServiceCardProps {
  service: typeof services[0]
  name: string
  description: string
  learnMore: string
  isPopular?: boolean
}

function ServiceCard({ service, name, description, learnMore, isPopular }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      data-card
      className="relative overflow-hidden opacity-0 group"
      style={{
        borderRadius: 'var(--radius-lg)',
        aspectRatio: '4/3',
        boxShadow: hovered ? 'var(--shadow-hover)' : 'var(--shadow-card)',
        border: `2px solid ${hovered ? 'var(--emerald)' : 'transparent'}`,
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={service.image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transition: 'transform 0.7s ease',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}
        loading="lazy"
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = service.fallback }}
      />

      <div
        className="absolute inset-0 transition-opacity duration-350"
        style={{
          background: `linear-gradient(to top, rgba(10,22,40,${hovered ? 0.98 : 0.9}) 0%, rgba(10,22,40,0.4) 60%, rgba(10,22,40,0.05) 100%)`,
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{
          background: 'var(--emerald)',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.4s ease',
        }}
      />

      {isPopular && (
        <div className="absolute top-4 left-4">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest text-white"
            style={{ background: 'var(--emerald)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
            Most Popular
          </span>
        </div>
      )}

      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div
          className="mb-3"
          style={{
            color: 'var(--emerald)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          <ServiceIcon id={service.id} />
        </div>

        <h3 className="font-sans font-black text-white mb-2 leading-tight" style={{ fontSize: '1.05rem', letterSpacing: '-0.02em' }}>
          {name}
        </h3>

        <div
          style={{
            maxHeight: hovered ? '100px' : '0px',
            opacity: hovered ? 1 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.4s ease, opacity 0.35s ease',
          }}
        >
          <p className="font-sans text-xs text-white/65 leading-relaxed mb-3">{description}</p>
          <span className="inline-flex items-center gap-1.5 font-sans font-semibold text-xs" style={{ color: 'var(--emerald)' }}>
            {learnMore}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
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
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const getTranslation = (id: string) => {
    const key = SERVICE_KEY_MAP[id] || id
    return t.services.items[key] || { name: id, description: '' }
  }

  return (
    <section id="services" className="py-24 lg:py-32" style={{ background: 'var(--bg)' }} ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <SectionLabel>{t.services.eyebrow}</SectionLabel>
            <h2 className="text-4xl lg:text-5xl" style={{ color: 'var(--navy)', letterSpacing: '-0.03em' }}>
              <span className="font-sans font-black" style={{ color: 'var(--emerald)' }}>
                {t.services.titleEm}
              </span>
              {t.services.titleRest && (
                <span className="font-sans font-black"> {t.services.titleRest}</span>
              )}
            </h2>
          </div>
          <p className="font-sans text-sm max-w-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => {
            const tr = getTranslation(service.id)
            return (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="block"
                style={{ textDecoration: 'none' }}
              >
                <ServiceCard
                  service={service}
                  name={tr.name}
                  description={tr.description}
                  learnMore={t.services.learnMore}
                  isPopular={service.id === 'implantation'}
                />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
