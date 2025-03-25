export function Card({ className, children, ...props }) {
  return (
    <div className={`glass-card p-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={`flex items-center justify-between mb-3 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={`text-lg font-semibold ${className}`} {...props}>
      {children}
    </h3>
  )
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div className={`mt-3 pt-3 border-t border-white/10 ${className}`} {...props}>
      {children}
    </div>
  )
}

