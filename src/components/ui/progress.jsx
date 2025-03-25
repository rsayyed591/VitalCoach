export function Progress({ value, max = 100, className, ...props }) {
  const percentage = (value / max) * 100

  return (
    <div className={`h-2 w-full bg-[#2A2D3A] rounded-full overflow-hidden ${className}`} {...props}>
      <div
        className="h-full bg-gradient-to-r from-[#16A34A] to-[#06B6D4] transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

