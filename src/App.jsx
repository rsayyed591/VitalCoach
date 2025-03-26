"use client"

import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { MobileNav } from "./components/MobileNav"
import { Home, Activity, BarChart3, Lightbulb, User } from "lucide-react"

import Dashboard from "./pages/Dashboard"
import StepTracker from "./pages/StepTracker"
import HealthSummary from "./pages/HeathSummary"
import Recommendations from "./pages/Recommendations"
import Profile from "./pages/Profile"
import Auth from "./pages/Auth"
import OTP from "./pages/OTP"
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

    // For demo purposes, set a user in localStorage if not present
    if (!localStorage.getItem("user")) {
      localStorage.setItem("user", JSON.stringify({ authenticated: true }))
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

  // Check if user is authenticated
  const isAuthenticated = () => {
    // In a real app, you would check for a valid token or session
    // For demo purposes, we'll just check if there's any user data in localStorage
    const user = localStorage.getItem("user")
    return user !== null && JSON.parse(user).authenticated === true
  }

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/auth" replace />
    }
    return children
  }

  // Layout component for protected routes
  const ProtectedLayout = ({ children }) => (
    <div className="font-poppins bg-[#121212] text-[#E4E4E4] min-h-screen pb-16">
      <main className="container mx-auto px-4 py-6">{children}</main>
      <MobileNav navItems={navItems} />
      <ChatArogya />
    </div>
  )

  return (
    <Router>
      <Routes>
        {/* Auth routes - no navigation */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/otp" element={<OTP />} />

        {/* Protected routes with navigation */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/step-tracker"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <StepTracker />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/health"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <HealthSummary />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Recommendations />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Profile />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App

