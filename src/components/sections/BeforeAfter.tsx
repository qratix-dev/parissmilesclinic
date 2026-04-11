import { useState, useRef, useCallback } from 'react'
import SectionLabel from '../ui/SectionLabel'
import { useLanguage } from '../../contexts/LanguageContext'

const pairs = [
  {
    id: 1,
    before: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80',
    after:  'https://images.unsplash.com/photo-1559589689-577aabd1db4f?w=800&q=80',
  },
  {
    id: 2,
    before: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=800&q=80',
    after:  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
  },
  {
    id: 3,
    before: 'https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=800&q=80',
    after:  'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80',
  },
]

function Slider({ before, after }: { before: string; after: string }) {
  const [pct, setPct] = useState(50)
  const boxRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const move = useCallback((clientX: number) => {
    if (!boxRef.current) return
    const { left, width } = boxRef.current.getBoundingClientRect()
    setPct(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)))
  }, [])

  return (
    <div
      ref={boxRef}
      className="relative w-full rounded-2xl overflow-hidden select-none cursor-ew-resize"
      style={{ aspectRatio: '4/3', boxShadow: 'var(--shadow-card)' }}
      onMouseDown={(e) => { dragging.current = true; move(e.clientX); e.preventDefault() }}
      onMouseMove={(e) => { if (dragging.current) move(e.clientX) }}
      onMouseUp={() => { dragging.current = false }}
      onMouseLeave={() => { dragging.current = false }}
      onTouchStart={(e) => { dragging.current = true; move(e.touches[0].clientX) }}
      onTouchMove={(e) => { if (dragging.current) move(e.touches[0].clientX) }}
      onTouchEnd={() => { dragging.current = false }}
    >
      {/* AFTER — base layer (full width) */}
      <img
        src={after}
        alt="After"
        draggable={false}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
      />

      {/* BEFORE — clipped to left portion */}
      <div
        style={{
          position: 'absolute', inset: 0,
          width: `${pct}%`,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <img
          src={before}
          alt="Before"
          draggable={false}
          style={{ position: 'absolute', inset: 0, width: boxRef.current?.offsetWidth ?? 600, height: '100%', maxWidth: 'none', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Divider line */}
      <div
        style={{
          position: 'absolute', top: 0, bottom: 0,
          left: `${pct}%`,
          width: 2,
          background: 'rgba(255,255,255,0.9)',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}
      >
        {/* Handle */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 36, height: 36,
          borderRadius: '50%',
          background: '#fff',
          border: '2px solid var(--gold)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 8H11M5 8L3 6M5 8L3 10M11 8L13 6M11 8L13 10" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* BEFORE label */}
      <div style={{
        position: 'absolute', top: 12, left: 12,
        background: 'rgba(15,23,42,0.85)',
        color: '#fff',
        fontSize: 11,
        fontFamily: 'DM Sans, sans-serif',
        fontWeight: 700,
        letterSpacing: '0.08em',
        padding: '4px 10px',
        borderRadius: 6,
        pointerEvents: 'none',
        zIndex: 10,
      }}>
        BEFORE
      </div>

      {/* AFTER label */}
      <div style={{
        position: 'absolute', top: 12, right: 12,
        background: 'var(--gold)',
        color: 'var(--navy)',
        fontSize: 11,
        fontFamily: 'DM Sans, sans-serif',
        fontWeight: 700,
        letterSpacing: '0.08em',
        padding: '4px 10px',
        borderRadius: 6,
        pointerEvents: 'none',
        zIndex: 10,
      }}>
        AFTER
      </div>
    </div>
  )
}

export default function BeforeAfter() {
  const { t } = useLanguage()

  return (
    <section id="before-after" className="py-24 lg:py-32" style={{ backgroundColor: '#FBF6E8' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <SectionLabel>{t.beforeAfter.label}</SectionLabel>
          <h2 className="text-4xl lg:text-5xl text-[var(--navy)] mb-4">
            {t.beforeAfter.title}{' '}
            <em className="not-italic font-serif italic text-[var(--gold)]">{t.beforeAfter.titleGold}</em>
          </h2>
          <p className="font-sans text-[var(--muted)] max-w-xl mx-auto text-base">
            {t.beforeAfter.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pairs.map((pair, i) => {
            const treatment = t.beforeAfter.treatments[i]
            return (
              <div key={pair.id}>
                <Slider before={pair.before} after={pair.after} />
                <div className="mt-4 text-center">
                  <p className="font-sans font-semibold text-[var(--navy)] text-sm">{treatment?.name}</p>
                  <p className="font-sans text-xs text-[var(--muted)] mt-1">
                    {t.beforeAfter.durationPrefix} {treatment?.duration}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
