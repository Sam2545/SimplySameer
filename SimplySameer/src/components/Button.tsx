import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

export function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  return (
    <button type="button" data-variant={variant} {...props}>
      {children}
    </button>
  )
}
