import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '../ui/SectionLabel'
import { testimonials } from '../../data/testimonials'
import { useLanguage } from '../../contexts/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const Stars = ({ count = 5 }: { count?: number }) => (
  <div className="flex gap-0.5">
    {[...Array(count)].map((_, i) => (
      <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--gold)">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
)

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-stat]',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '[data-stat]', start: 'top 85%', toggleActions: 'play none none none' },
        }
      )
      gsap.fromTo(
        '[data-card]',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '[data-card]', start: 'top 80%', toggleActions: 'play none none none' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, var(--navy) 0%, #1a2744 100%)' }}
    >
      {/* Background decorative quote mark */}
      <div
        className="absolute top-0 right-0 select-none pointer-events-none"
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(200px, 30vw, 420px)',
          lineHeight: 0.8,
          color: 'rgba(203,161,53,0.06)',
          fontWeight: 700,
          userSelect: 'none',
        }}
      >
        "
      </div>

      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: 'linear-gradient(to right, transparent, var(--gold), transparent)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <SectionLabel light>{t.testimonials.label}</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-serif text-white mb-4">
            {t.testimonials.title}{' '}
            <em className="italic text-[var(--gold)]">{t.testimonials.titleGold}</em>
          </h2>
          <p className="font-sans text-white/55 max-w-xl mx-auto text-base leading-relaxed">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 max-w-3xl mx-auto">
          {t.testimonials.stats.map((s) => (
            <div
              key={s.label}
              data-stat
              className="text-center opacity-0 py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <p className="font-serif font-bold text-2xl sm:text-3xl text-[var(--gold)] leading-none mb-1">{s.value}</p>
              <p className="font-sans text-xs text-white/50 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t_item) => (
            <div
              key={t_item.id}
              data-card
              className="relative rounded-2xl p-8 opacity-0 flex flex-col gap-6 group"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
                transition: 'border-color 0.3s, transform 0.3s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(203,161,53,0.5)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              <div className="absolute top-6 right-7 font-serif text-6xl leading-none text-[var(--gold)] opacity-20 select-none pointer-events-none">"</div>
              <Stars />
              <blockquote className="font-serif italic text-base sm:text-lg text-white/85 leading-relaxed flex-1">
                "{t_item.quote}"
              </blockquote>
              <div className="h-px bg-white/10" />
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-sans font-bold text-sm flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)', color: 'var(--navy)' }}
                >
                  {t_item.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans font-bold text-white text-sm truncate">{t_item.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="font-sans text-xs text-[var(--gold)]">{t_item.label}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/8 border border-white/10">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="font-sans text-[10px] font-bold text-white/50">Google</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="font-sans text-white/40 text-sm mb-5">{t.testimonials.bottomText}</p>
          <a
            href="https://wa.me/442034889319"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-sans font-bold text-sm text-[var(--navy)] focus-visible:outline-2 focus-visible:outline-[var(--gold)] focus-visible:outline-offset-2 active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)',
              boxShadow: '0 4px 24px rgba(203,161,53,0.4)',
              transition: 'opacity 0.2s, transform 0.1s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.9' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--navy)">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            {t.testimonials.ctaBtn}
          </a>
        </div>
      </div>
    </section>
  )
}
