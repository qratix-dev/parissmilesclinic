import { useState } from 'react'
import SectionLabel from '../ui/SectionLabel'
import { pricingCategories, type Currency, formatPrice, currencySymbols } from '../../data/pricing'
import { useLanguage } from '../../contexts/LanguageContext'

const currencies: Currency[] = ['GBP', 'USD', 'EUR']

export default function Pricing() {
  const [currency, setCurrency] = useState<Currency>('GBP')
  const [openCategory, setOpenCategory] = useState<string | null>('implants-surgical')
  const { t } = useLanguage()

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <SectionLabel>{t.pricing.label}</SectionLabel>
          <h2 className="text-4xl lg:text-5xl text-[var(--navy)] mb-4">
            <em className="not-italic font-serif italic text-[var(--gold)]">{t.pricing.titleEm}</em>{' '}
            <span className="font-serif">{t.pricing.titleRest}</span>
          </h2>
          <p className="font-sans text-[var(--muted)] max-w-2xl mx-auto text-base leading-relaxed">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Currency toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-lg border border-[var(--border)] bg-white p-1" style={{ boxShadow: 'var(--shadow-card)' }}>
            {currencies.map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-5 py-2 rounded-md font-sans font-semibold text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--gold)] focus-visible:outline-offset-1 active:scale-[0.98] ${
                  currency === c ? 'bg-[var(--gold)] text-[var(--navy)]' : 'text-[var(--muted)] hover:text-[var(--navy)]'
                }`}
              >
                {currencySymbols[c]} {c}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion tables */}
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {pricingCategories.map((category) => {
            const isOpen = openCategory === category.id
            const categoryTitle = t.pricing.categories[category.id] ?? category.title
            return (
              <div key={category.id} className="rounded-xl border border-[var(--border)] overflow-hidden bg-white" style={{ boxShadow: 'var(--shadow-card)' }}>
                <button
                  onClick={() => setOpenCategory(isOpen ? null : category.id)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[var(--bg)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--gold)] focus-visible:outline-offset-[-2px]"
                >
                  <span className="font-sans font-bold text-[var(--navy)] text-sm sm:text-base">{categoryTitle}</span>
                  <span className="flex-shrink-0 ml-4 text-[var(--gold)] transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-[var(--border)]">
                    <table className="w-full">
                      <tbody>
                        {category.items.map((item, idx) => (
                          <tr
                            key={idx}
                            className={`${idx < category.items.length - 1 ? 'border-b border-[var(--border)]' : ''} hover:bg-[var(--bg)] transition-colors duration-100`}
                          >
                            <td className="px-6 py-3.5 font-sans text-sm text-[var(--text)]">{item.treatment}</td>
                            <td className="px-6 py-3.5 font-sans font-bold text-sm text-right text-[var(--gold)] whitespace-nowrap">
                              {formatPrice(item.gbp, currency, item.note)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <p className="text-center font-sans text-sm text-[var(--muted)] mt-8">
          {t.pricing.footerNote}
        </p>
      </div>
    </section>
  )
}
