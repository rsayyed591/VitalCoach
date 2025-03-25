export function Button({ className, variant = "default", children, ...props }) {
  const baseClasses = "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 focus:outline-none"

  const variants = {
    default: "neuro-button text-[#E4E4E4]",
    primary: "neuro-button bg-[#16A34A] text-white",
    secondary: "neuro-button bg-[#06B6D4] text-white",
    outline: "border border-[#2A2D3A] bg-transparent hover:bg-[#2A2D3A]/20 text-[#E4E4E4]",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

