interface SectionLabelProps {
  children: string
  className?: string
  light?: boolean
}

export default function SectionLabel({ children, className = '', light = false }: SectionLabelProps) {
  return (
    <p
      className={`text-xs font-sans font-bold uppercase tracking-[0.18em] mb-4 ${
        light ? 'text-[var(--gold-light)]' : 'text-[var(--gold)]'
      } ${className}`}
    >
      {children}
    </p>
  )
}
