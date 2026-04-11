export interface Service {
  id: string
  name: string
  description: string
  image: string
}

export const services: Service[] = [
  {
    id: 'implantation',
    name: 'Implantation',
    description: 'Permanent tooth replacement with premium titanium implants in Turkey',
    image: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=800&q=80',
  },
  {
    id: 'dental-veneer',
    name: 'Dental Veneer',
    description: 'Custom-crafted porcelain veneers for a natural, flawless smile',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&q=80',
  },
  {
    id: 'dental-crown',
    name: 'Dental Crown',
    description: 'Custom-fitted zirconia and porcelain crowns for lasting protection',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80',
  },
  {
    id: 'teeth-whitening',
    name: 'Teeth Whitening',
    description: 'Professional laser teeth whitening for an instantly brighter smile',
    image: '/beyazlatmaPic.jpg',
  },
  {
    id: 'sinus-lifting',
    name: 'Sinus Lifting',
    description: 'Sinus lift bone augmentation for secure dental implant placement',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
  },
  {
    id: 'bone-grafting',
    name: 'Bone Grafting',
    description: 'Jawbone regeneration to build a strong foundation for dental implants',
    image: 'https://images.unsplash.com/photo-1614350292382-c448d0110dfa?w=600&q=80',
  },
  {
    id: 'zygomatic-implant',
    name: 'Zygomatic Implant',
    description: 'Advanced implants anchored in the cheekbone for severe upper jaw bone loss',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80',
  },
]
