import { useState, useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { services } from '../data/services'
import { serviceDetails } from '../data/serviceDetails'
import { useLanguage } from '../contexts/LanguageContext'

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5">
      <circle cx="9" cy="9" r="9" fill="var(--emerald)" opacity="0.12" />
      <path d="M5 9L7.5 11.5L13 6.5" stroke="var(--emerald)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StepIcon({ n }: { n: number }) {
  return (
    <span
      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-sans font-bold text-sm text-white"
      style={{ background: 'var(--emerald)' }}
    >
      {n}
    </span>
  )
}

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>()
  const { t } = useLanguage()

  const service = services.find((s) => s.id === id)
  const detail = serviceDetails.find((d) => d.id === id)

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!service || !detail) return <Navigate to="/" replace />

  const serviceName = t.services.items[
    id === 'implantation' ? 'implants'
    : id === 'dental-veneer' ? 'veneers'
    : id === 'dental-crown' ? 'crowns'
    : id === 'teeth-whitening' ? 'whitening'
    : id === 'sinus-lifting' ? 'sinus'
    : id === 'bone-grafting' ? 'bone'
    : id
  ]?.name ?? service.name

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-16 lg:pt-[80px]" style={{ minHeight: '52vh' }}>
        <img
          src={service.image}
          alt={serviceName}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = service.fallback }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.55) 55%, rgba(10,22,40,0.15) 100%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-20 flex flex-col justify-end" style={{ minHeight: '52vh' }}>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6 text-xs font-sans" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/#services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span style={{ color: 'var(--emerald)' }}>{serviceName}</span>
          </nav>

          <div
            className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest text-white w-fit"
            style={{ background: 'var(--emerald)' }}
          >
            Paris Smiles Clinic
          </div>

          <h1
            className="font-sans font-black text-white mb-4 leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.04em' }}
          >
            {serviceName}
          </h1>

          <div className="flex flex-wrap gap-4">
            <span className="flex items-center gap-2 text-sm font-sans text-white/70">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              {detail.duration}
            </span>
            <span className="flex items-center gap-2 text-sm font-sans text-white/70">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              {detail.recovery}
            </span>
            <span className="flex items-center gap-2 text-sm font-sans font-semibold" style={{ color: 'var(--emerald)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              {detail.startingPrice}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28" style={{ background: 'var(--surface)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Left: description + process */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <p
                  className="text-xs font-sans font-bold uppercase tracking-[0.22em] mb-3"
                  style={{ color: 'var(--emerald)' }}
                >
                  About this treatment
                </p>
                <p className="font-sans leading-relaxed text-[1.05rem]" style={{ color: 'var(--muted)' }}>
                  {detail.longDescription}
                </p>
              </div>

              <div>
                <p
                  className="text-xs font-sans font-bold uppercase tracking-[0.22em] mb-6"
                  style={{ color: 'var(--emerald)' }}
                >
                  Treatment Process
                </p>
                <ol className="space-y-5">
                  {detail.process.map((p, i) => (
                    <li key={i} className="flex gap-4">
                      <StepIcon n={i + 1} />
                      <div>
                        <p className="font-sans font-bold text-[0.95rem] mb-1" style={{ color: 'var(--navy)' }}>{p.step}</p>
                        <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{p.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Right: benefits + CTA */}
            <div className="space-y-6">
              <div
                className="rounded-2xl p-7"
                style={{ background: 'var(--bg)', border: '1.5px solid var(--border)' }}
              >
                <p
                  className="text-xs font-sans font-bold uppercase tracking-[0.22em] mb-5"
                  style={{ color: 'var(--emerald)' }}
                >
                  Key Benefits
                </p>
                <ul className="space-y-3.5">
                  {detail.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckIcon />
                      <span className="font-sans text-sm leading-relaxed" style={{ color: 'var(--navy)' }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-2xl p-7 space-y-4"
                style={{ background: 'var(--navy)', border: '1.5px solid var(--navy)' }}
              >
                <p className="font-sans font-black text-white text-lg leading-snug" style={{ letterSpacing: '-0.02em' }}>
                  Ready to transform your smile?
                </p>
                <p className="font-sans text-sm text-white/60 leading-relaxed">
                  Get a free consultation with our specialists — no commitment required.
                </p>
                <a
                  href="https://wa.me/442034889319"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-sans font-bold text-sm text-white transition-opacity duration-200 hover:opacity-90"
                  style={{ background: '#25D366' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </a>
                <Link
                  to="/#contact"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-sans font-semibold text-sm text-white/80 transition-colors duration-200 hover:text-white"
                  style={{ border: '1.5px solid rgba(255,255,255,0.2)' }}
                >
                  Send a Message
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Contact Form */}
      <section className="py-20 lg:py-28" style={{ background: 'var(--bg)' }}>
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <p
              className="text-xs font-sans font-bold uppercase tracking-[0.22em] mb-3"
              style={{ color: 'var(--emerald)' }}
            >
              Book an Appointment
            </p>
            <h2
              className="font-sans font-black mb-3"
              style={{ color: 'var(--navy)', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', letterSpacing: '-0.04em' }}
            >
              Interested in{' '}
              <span style={{ color: 'var(--emerald)' }}>{serviceName}</span>?
            </h2>
            <p className="font-sans text-sm" style={{ color: 'var(--muted)' }}>
              Fill in your details and our team will contact you within 24 hours to discuss your treatment plan.
            </p>
          </div>

          {submitted ? (
            <div
              className="rounded-2xl p-10 text-center"
              style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-card)' }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(37,99,235,0.1)' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <p className="font-sans font-bold text-lg mb-2" style={{ color: 'var(--navy)' }}>Message sent!</p>
              <p className="font-sans text-sm" style={{ color: 'var(--muted)' }}>
                We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 lg:p-10 space-y-5"
              style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-card)' }}
            >
              <input type="hidden" name="service" value={serviceName} />

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-sans font-semibold mb-1.5" style={{ color: 'var(--navy)' }}>Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl font-sans text-sm outline-none transition-colors duration-200"
                    style={{
                      background: 'var(--bg)',
                      border: '1.5px solid var(--border)',
                      color: 'var(--navy)',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--emerald)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans font-semibold mb-1.5" style={{ color: 'var(--navy)' }}>Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl font-sans text-sm outline-none transition-colors duration-200"
                    style={{
                      background: 'var(--bg)',
                      border: '1.5px solid var(--border)',
                      color: 'var(--navy)',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--emerald)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans font-semibold mb-1.5" style={{ color: 'var(--navy)' }}>Phone Number</label>
                <input
                  type="tel"
                  placeholder="+44 ..."
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl font-sans text-sm outline-none transition-colors duration-200"
                  style={{
                    background: 'var(--bg)',
                    border: '1.5px solid var(--border)',
                    color: 'var(--navy)',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--emerald)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-semibold mb-1.5" style={{ color: 'var(--navy)' }}>Message</label>
                <textarea
                  rows={4}
                  placeholder={`Tell us about your interest in ${serviceName}...`}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl font-sans text-sm outline-none resize-none transition-colors duration-200"
                  style={{
                    background: 'var(--bg)',
                    border: '1.5px solid var(--border)',
                    color: 'var(--navy)',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--emerald)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-sans font-bold text-sm text-white transition-opacity duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{ background: 'var(--emerald)', boxShadow: '0 4px 16px rgba(37,99,235,0.35)' }}
              >
                Request Free Consultation
              </button>

              <p className="text-center text-xs font-sans" style={{ color: 'var(--muted)' }}>
                No commitment required · We respond within 24 hours
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
