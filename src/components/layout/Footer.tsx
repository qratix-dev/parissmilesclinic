import { Link } from 'react-router-dom'
import { services } from '../../data/services'
import { useLanguage } from '../../contexts/LanguageContext'

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/luxurydentalturkey',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const { t } = useLanguage()

  const navLinks = [
    { label: t.footer.links.services, href: '/#services' },
    { label: t.footer.links.about, href: '/#about' },
    { label: t.footer.links.prices, href: '/#pricing' },
    { label: t.footer.links.doctors, href: '/#doctors' },
    { label: t.footer.links.reviews, href: '/#testimonials' },
    { label: t.footer.links.beforeAfter, href: '/#before-after' },
    { label: t.footer.links.contact, href: '/#contact' },
  ]

  return (
    <footer className="bg-[var(--navy)] text-white rounded-t-[3rem] pt-16 pb-8" style={{ marginTop: 0 }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[var(--gold)] flex items-center justify-center flex-shrink-0">
                <span className="font-serif font-bold text-[var(--navy)] text-xl leading-none">D</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-sans font-bold text-sm tracking-widest text-white">LUXURY DENTAL</span>
                <span className="font-sans text-[10px] tracking-[0.2em] text-[var(--gold)] font-semibold">TURKEY</span>
              </div>
            </div>
            <p className="text-white/60 font-sans text-sm leading-relaxed mb-6">{t.footer.tagline}</p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-[var(--gold)] mb-5">{t.footer.navigationTitle}</h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="font-sans text-sm text-white/60 hover:text-[var(--gold)] transition-colors duration-200">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-[var(--gold)] mb-5">{t.footer.servicesTitle}</h4>
            <ul className="flex flex-col gap-3">
              {services.map((s) => {
                const key = {
                  'implantation': 'implants', 'dental-veneer': 'veneers',
                  'teeth-whitening': 'whitening', 'dental-crown': 'crowns',
                  'sinus-lifting': 'sinus', 'bone-grafting': 'bone', 'zygomatic-implant': 'zygomatic',
                }[s.id] || s.id
                const name = t.services.items[key]?.name ?? s.name
                return (
                  <li key={s.id}>
                    <Link to="/#services" className="font-sans text-sm text-white/60 hover:text-[var(--gold)] transition-colors duration-200">{name}</Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-[var(--gold)] mb-5">{t.footer.contactTitle}</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60 font-sans">
              <li>Şirinyalı, İsmet Gökşen Cd. No:30/B</li>
              <li>Muratpaşa/Antalya, Turkey</li>
              <li><a href="tel:+442034889319" className="hover:text-[var(--gold)] transition-colors duration-200">UK: +44 20 3488 9319</a></li>
              <li><a href="tel:+491783488639" className="hover:text-[var(--gold)] transition-colors duration-200">DE: +49 178 3488639</a></li>
              <li><a href="mailto:info@luxurydental.uk" className="hover:text-[var(--gold)] transition-colors duration-200">info@luxurydental.uk</a></li>
              <li className="text-white/40">{t.footer.hours}</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-sm text-white/40">{t.footer.copyright}</p>
          <div className="flex gap-6">
            <a href="#" className="font-sans text-sm text-white/40 hover:text-[var(--gold)] transition-colors duration-200">{t.footer.privacy}</a>
            <a href="#" className="font-sans text-sm text-white/40 hover:text-[var(--gold)] transition-colors duration-200">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
