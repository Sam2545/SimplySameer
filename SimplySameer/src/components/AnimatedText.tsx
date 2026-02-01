interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedText({ children, className }: AnimatedTextProps) {
  return <span className={className}>{children}</span>
}
