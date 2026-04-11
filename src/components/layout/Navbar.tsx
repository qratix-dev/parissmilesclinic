import { useState, useEffect, useRef, type ReactElement } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import type { Language } from '../../i18n/translations'

// ─── Flag SVG components ────────────────────────────────────────────────────

function UKFlag() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="14" fill="#012169" />
      <path d="M0 0L20 14M20 0L0 14" stroke="white" strokeWidth="3" />
      <path d="M0 0L20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1.8" />
      <path d="M10 0V14M0 7H20" stroke="white" strokeWidth="4.5" />
      <path d="M10 0V14M0 7H20" stroke="#C8102E" strokeWidth="3" />
    </svg>
  )
}

function DEFlag() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="4.67" fill="#000000" />
      <rect y="4.67" width="20" height="4.67" fill="#DD0000" />
      <rect y="9.33" width="20" height="4.67" fill="#FFCE00" />
    </svg>
  )
}

function FRFlag() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="6.67" height="14" fill="#002395" />
      <rect x="6.67" width="6.67" height="14" fill="#FFFFFF" />
      <rect x="13.33" width="6.67" height="14" fill="#ED2939" />
    </svg>
  )
}

function TRFlag() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="14" fill="#E30A17" />
      <circle cx="8.5" cy="7" r="3.2" fill="white" />
      <circle cx="9.8" cy="7" r="2.5" fill="#E30A17" />
      <polygon points="13,7 11.8,6.3 11.8,7.7" fill="white" transform="rotate(18 13 7) translate(-0.5 0)" />
      <polygon fill="white" points="13.4,5.8 12.0,6.7 12.5,8.3 13.9,7.4 13.9,5.8" transform="translate(0.3 -0.2) scale(0.75) rotate(18 13 7)" />
    </svg>
  )
}

const LANG_META: Record<Language, { name: string; flag: ReactElement }> = {
  en: { name: 'English',  flag: <UKFlag /> },
  de: { name: 'Deutsch',  flag: <DEFlag /> },
  fr: { name: 'Français', flag: <FRFlag /> },
  tr: { name: 'Türkçe',   flag: <TRFlag /> },
}

const LANGUAGES: Language[] = ['en', 'de', 'fr', 'tr']

// ─── Language Dropdown ───────────────────────────────────────────────────────

function LanguageDropdown({ scrolled, onSelect }: { scrolled: boolean; onSelect?: () => void }) {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const current = LANG_META[lang]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--gold)] ${
          scrolled
            ? 'border-[var(--border)] text-[var(--navy)] hover:border-[var(--gold)]'
            : 'border-white/20 text-white/90 hover:border-white/50'
        }`}
      >
        <span className="flex-shrink-0 rounded-sm overflow-hidden">{current.flag}</span>
        <span className="font-sans font-semibold text-[11px] uppercase tracking-wide">{current.name}</span>
        <svg
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 bg-white rounded-xl shadow-[0_8px_32px_rgba(15,23,42,0.12)] border border-[var(--border)] overflow-hidden z-50">
          {LANGUAGES.map((l) => (
            <button
              key={l}
              onClick={() => {
                setLang(l)
                setOpen(false)
                onSelect?.()
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors duration-150 hover:bg-[var(--bg)] ${
                lang === l ? 'bg-[var(--bg)]' : ''
              }`}
            >
              <span className="flex-shrink-0 rounded-sm overflow-hidden">{LANG_META[l].flag}</span>
              <span className={`font-sans text-xs font-semibold ${lang === l ? 'text-[var(--gold)]' : 'text-[var(--navy)]'}`}>
                {LANG_META[l].name}
              </span>
              {lang === l && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-auto flex-shrink-0">
                  <path d="M2 6L5 9L10 3" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { t } = useLanguage()

  const navLinks = [
    { label: t.nav.services,    href: '/#services' },
    { label: t.nav.about,       href: '/#about' },
    { label: t.nav.prices,      href: '/#pricing' },
    { label: t.nav.doctors,     href: '/#doctors' },
    { label: t.nav.reviews,     href: '/#testimonials' },
    { label: t.nav.beforeAfter, href: '/#before-after' },
  ]

  useEffect(() => {
    if (location.pathname !== '/') {
      setScrolled(true)
      return
    }

    const checkScrolled = () => {
      const sentinel = document.getElementById('hero-sentinel')
      if (!sentinel) {
        setScrolled(window.scrollY > 10)
        return
      }
      setScrolled(sentinel.getBoundingClientRect().bottom <= 0)
    }

    checkScrolled()
    window.addEventListener('scroll', checkScrolled, { passive: true })
    return () => window.removeEventListener('scroll', checkScrolled)
  }, [location.pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMenu = () => setMobileOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-xl bg-white/80 border-b border-[var(--border)] shadow-card'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0" onClick={() => { setMobileOpen(false); window.scrollTo(0, 0) }}>
            <div className="w-9 h-9 rounded-full bg-[var(--gold)] flex items-center justify-center flex-shrink-0">
              <span className="font-serif font-bold text-[var(--navy)] text-lg leading-none">D</span>
            </div>
            <div className="flex flex-col leading-none">
              <span
                className={`font-sans font-bold text-sm tracking-widest transition-colors duration-300 ${
                  scrolled ? 'text-[var(--navy)]' : 'text-white'
                }`}
              >
                LUXURY DENTAL
              </span>
              <span className="font-sans text-[10px] tracking-[0.2em] text-[var(--gold)] font-semibold">
                TURKEY
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`font-sans font-medium text-sm transition-colors duration-200 hover:text-[var(--gold)] ${
                  scrolled ? 'text-[var(--navy)]' : 'text-white/90'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <LanguageDropdown scrolled={scrolled} />

            <Link
              to="/#contact"
              className="inline-flex items-center px-5 py-2.5 rounded-md border-2 border-[var(--gold)] text-[var(--gold)] font-sans font-semibold text-sm hover:bg-[var(--gold)] hover:text-[var(--navy)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--gold)] focus-visible:outline-offset-2 active:scale-[0.98]"
            >
              {t.nav.getQuote}
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 focus-visible:outline-2 focus-visible:outline-[var(--gold)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-200 ${
                mobileOpen
                  ? 'translate-y-2 rotate-45 bg-[var(--navy)]'
                  : scrolled
                  ? 'bg-[var(--navy)]'
                  : 'bg-white'
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-200 ${
                mobileOpen
                  ? 'opacity-0 bg-[var(--navy)]'
                  : scrolled
                  ? 'bg-[var(--navy)]'
                  : 'bg-white'
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-200 ${
                mobileOpen
                  ? '-translate-y-2 -rotate-45 bg-[var(--navy)]'
                  : scrolled
                  ? 'bg-[var(--navy)]'
                  : 'bg-white'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-white flex flex-col items-center justify-center transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={closeMenu}
              className="font-serif text-3xl font-bold text-[var(--navy)] hover:text-[var(--gold)] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile language dropdown */}
          <div className="mt-2">
            <LanguageDropdown scrolled={true} onSelect={closeMenu} />
          </div>

          <Link
            to="/#contact"
            onClick={closeMenu}
            className="mt-4 inline-flex items-center px-8 py-4 rounded-md border-2 border-[var(--gold)] bg-[var(--gold)] text-[var(--navy)] font-sans font-bold text-base hover:bg-[var(--gold-light)] transition-colors duration-200"
          >
            {t.nav.getQuote}
          </Link>
        </nav>
      </div>
    </>
  )
}
