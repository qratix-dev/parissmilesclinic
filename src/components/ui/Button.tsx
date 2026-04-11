import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const base =
      'inline-flex items-center gap-2 font-sans font-semibold rounded-md border-2 cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 active:scale-[0.98]'

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-7 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    }

    const variants = {
      primary:
        'bg-[var(--gold)] border-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-light)] hover:border-[var(--gold-light)] focus-visible:outline-[var(--gold)]',
      ghost:
        'bg-transparent border-white/50 text-white hover:border-[var(--gold)] hover:text-[var(--gold)] focus-visible:outline-[var(--gold)]',
    }

    return (
      <button
        ref={ref}
        className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
