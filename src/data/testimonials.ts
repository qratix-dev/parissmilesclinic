export interface Testimonial {
  id: string
  name: string
  initials: string
  quote: string
  label: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Deborah A. Brock',
    initials: 'DB',
    quote: 'Very satisfied with the work of the orthodontic team. They corrected the bite, the gap between the teeth was gone, the smile became completely \'Hollywood\'. I will recommend to friends. Thank you!',
    label: 'Verified Patient',
  },
  {
    id: '2',
    name: 'Thomas Whitfield',
    initials: 'TW',
    quote: 'I was always afraid of the dentist, but here I felt completely at ease. The implant procedure was painless, and the result exceeded my expectations. Truly a luxury experience!',
    label: 'Verified Patient',
  },
]
