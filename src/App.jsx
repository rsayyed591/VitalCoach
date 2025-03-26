"use client"

import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { MobileNav } from "./components/MobileNav"
import { Home, Activity, BarChart3, Lightbulb, User } from "lucide-react"

import Dashboard from "./pages/Dashboard"
import StepTracker from "./pages/StepTracker"
import HealthSummary from "./pages/HeathSummary"
import Recommendations from "./pages/Recommendations"
import Profile from "./pages/Profile"
import ChatArogya from "./components/ChatArogya"

const navItems = [
  {
    label: "Home",
    icon: Home,
    href: "/",
  },
  {
    label: "MoveMate",
    icon: Activity,
    href: "/step-tracker",
  },
  {
    label: "VitalStats",
    icon: BarChart3,
    href: "/health",
  },
  {
    label: "Wellness",
    icon: Lightbulb,
    href: "/recommendations",
  },
  {
    label: "Profile",
    icon: User,
    href: "/profile",
  },
]

function App() {
  // Set up navigation style listener
  useEffect(() => {
    // Initialize navbar style if not set
    if (!localStorage.getItem("navbarStyle")) {
      localStorage.setItem("navbarStyle", "icons-labels")
    }

    // Listen for changes from the settings page
    const handleNavStyleChange = (event) => {
      if (event.key === "navbarStyle") {
        // The navbar style has been updated
        console.log("Navbar style changed to:", event.newValue)
      }
    }

    window.addEventListener("storage", handleNavStyleChange)
    return () => window.removeEventListener("storage", handleNavStyleChange)
  }, [])

  return (
    <Router>
      <div className="font-poppins bg-[#121212] text-[#E4E4E4] min-h-screen pb-16">
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/step-tracker" element={<StepTracker />} />
            <Route path="/health" element={<HealthSummary />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/profile" element={<Profile navItems={navItems} />} />
          </Routes>
        </main>
        <MobileNav navItems={navItems} />
        <ChatArogya />
      </div>
    </Router>
  )
}

export default App

