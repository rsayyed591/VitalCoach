export function Badge({ children, variant = "default", className, ...props }) {
  const variants = {
    default: "bg-[#2A2D3A] text-[#E4E4E4]",
    success: "bg-[#22C55E]/20 text-[#22C55E]",
    warning: "bg-amber-500/20 text-amber-500",
    danger: "bg-[#FF4D4D]/20 text-[#FF4D4D]",
    info: "bg-[#06B6D4]/20 text-[#06B6D4]",
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

