export type Currency = 'GBP' | 'USD' | 'EUR'

export const currencySymbols: Record<Currency, string> = {
  GBP: '£',
  USD: '$',
  EUR: '€',
}

export const currencyMultipliers: Record<Currency, number> = {
  GBP: 1.0,
  USD: 1.27,
  EUR: 1.18,
}

export interface PricingItem {
  treatment: string
  gbp: number | null
  note?: string
}

export interface PricingCategory {
  id: string
  title: string
  items: PricingItem[]
}

export const pricingCategories: PricingCategory[] = [
  {
    id: 'implants-surgical',
    title: 'Dental Implants & Surgical Procedures',
    items: [
      { treatment: 'Osstem® Dental Implant + Abutment', gbp: 435 },
      { treatment: 'Nobel® Dental Implant + Abutment', gbp: 549 },
      { treatment: 'Straumann BLX® Dental Implant + Abutment', gbp: 885 },
      { treatment: 'MegaGen Anyridge® Dental Implant + Abutment', gbp: 500 },
      { treatment: 'Temporary Acrylic Bridge (All on 6 only)', gbp: null, note: 'Free' },
      { treatment: 'All on 4 Both Jaw Zirconium Porcelain (24 Unit)', gbp: 8680 },
      { treatment: 'All on 4 Both Jaw Metal Fused Porcelain (24 Unit)', gbp: 7080 },
      { treatment: 'Temporary Denture (Per Jaw)', gbp: 250 },
      { treatment: 'Permanent Denture (Per Jaw)', gbp: 500 },
      { treatment: 'Temporary Zirconium Crown', gbp: 50 },
      { treatment: 'Temporary Metal Fused Crown', gbp: 40 },
      { treatment: 'Sinus Lifting', gbp: 225 },
      { treatment: 'Bone Grafting 1cc', gbp: 100 },
    ],
  },
  {
    id: 'veneers-crowns',
    title: 'Dental Veneers & Crowns',
    items: [
      { treatment: 'Metal Porcelain Crown / Full Veneer', gbp: 140 },
      { treatment: 'Zirconium Porcelain Crown / Full Veneer', gbp: 170 },
      { treatment: 'E.MAX® Crown / Full Veneer', gbp: 240 },
      { treatment: 'E.MAX® Laminate Veneer', gbp: 240 },
      { treatment: 'LD Premium Non-Prep Lumineer', gbp: 300 },
      { treatment: 'Zirconium Porcelain Implant Crown', gbp: 180 },
    ],
  },
  {
    id: 'whitening-cleaning',
    title: 'Teeth Whitening & Cleaning',
    items: [
      { treatment: 'Laser Teeth Whitening', gbp: 250 },
      { treatment: 'Home Teeth Whitening Kit', gbp: 140 },
      { treatment: 'Dental Hygiene', gbp: 50 },
      { treatment: 'Deep Cleaning', gbp: 115 },
    ],
  },
  {
    id: 'general',
    title: 'General Dental Procedures',
    items: [
      { treatment: 'Dental Post', gbp: 50 },
      { treatment: 'White Filling', gbp: 60 },
      { treatment: 'Root Canal Treatment (Per Root)', gbp: 120 },
      { treatment: 'Tooth Extraction', gbp: 50 },
      { treatment: 'Surgical Tooth Extraction', gbp: 120 },
      { treatment: 'Per Jaw Gum Contouring', gbp: 360 },
      { treatment: 'Gum Contouring (Per Tooth)', gbp: 60 },
      { treatment: 'Gumshield', gbp: 80 },
    ],
  },
]

export function formatPrice(gbpAmount: number | null, currency: Currency, note?: string): string {
  if (gbpAmount === null) return note ?? 'Free'
  const symbol = currencySymbols[currency]
  const multiplier = currencyMultipliers[currency]
  const amount = Math.round(gbpAmount * multiplier)
  return `${symbol}${amount.toLocaleString()}`
}
