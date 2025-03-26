import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Home, Activity, Heart, User, BarChart2, MoreHorizontal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function MobileNav() {
  const location = useLocation()
  const pathname = location.pathname
  const [showMore, setShowMore] = useState(false)
  const [navStyle, setNavStyle] = useState("icons-labels") // icons-only, icons-labels, minimal
  const [isMinimal, setIsMinimal] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  // Get navigation style from local storage
  useEffect(() => {
    const storedStyle = localStorage.getItem("navbarStyle")
    if (storedStyle) {
      setNavStyle(storedStyle)
      setIsMinimal(storedStyle === "minimal")
    }
  }, [])

  // Update when settings change
  useEffect(() => {
    const handleStorageChange = () => {
      const storedStyle = localStorage.getItem("navbarStyle")
      if (storedStyle) {
        setNavStyle(storedStyle)
        setIsMinimal(storedStyle === "minimal")
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const toggleMore = () => {
    setShowMore(!showMore)
  }

  const toggleMinimal = () => {
    if (isMinimal) {
      setIsExpanded(!isExpanded)
    }
  }

  // Main navigation items
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/step-tracker", label: "MoveMate", icon: Activity },
    { path: "/health", label: "VitalStats", icon: BarChart2 },
    { path: "/recommendations", label: "Wellness", icon: Heart },
    { path: "/profile", label: "Profile", icon: User },
  ]

  // More navigation items
  const moreNavItems = [{ path: "/settings", label: "Settings", icon: MoreHorizontal }]

  if (isMinimal) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleMinimal}
            className="w-14 h-14 rounded-full bg-[#16A34A] flex items-center justify-center shadow-lg"
          >
            <Home className="w-6 h-6 text-white" />
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="fixed bottom-24 right-6 z-50 flex flex-col gap-3"
            >
              {navItems.map((item, index) => (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                      pathname === item.path ? "bg-[#16A34A]" : "bg-[#2A2D3A]"
                    }`}
                  >
                    <item.icon className="w-5 h-5 text-white" />
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-[#2A2D3A] bg-[#1E1E1E] z-50">
      <nav className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link key={item.path} to={item.path} className="flex-1">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center justify-center h-full ${
                  isActive ? "text-[#16A34A]" : "text-[#A1A1A1]"
                }`}
              >
                <motion.div animate={isActive ? { y: [0, -5, 0] } : {}} transition={{ duration: 0.3 }}>
                  <item.icon className={`w-6 h-6 ${isActive ? "text-[#16A34A]" : "text-[#A1A1A1]"}`} />
                </motion.div>
                {navStyle === "icons-labels" && (
                  <span className={`text-xs mt-1 ${isActive ? "text-[#16A34A] font-medium" : "text-[#A1A1A1]"}`}>
                    {item.label}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 w-1/5 h-0.5 bg-gradient-to-r from-[#16A34A] to-[#06B6D4]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute bottom-full left-0 right-0 bg-[#1E1E1E] border-t border-[#2A2D3A] shadow-lg"
          >
            <div className="grid grid-cols-5 p-4">
              {moreNavItems.map((item) => {
                const isActive = pathname === item.path
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-1 p-2">
                      <item.icon className={`w-6 h-6 ${isActive ? "text-[#16A34A]" : "text-[#A1A1A1]"}`} />
                      <span className={`text-xs ${isActive ? "text-[#16A34A] font-medium" : "text-[#A1A1A1]"}`}>
                        {item.label}
                      </span>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

