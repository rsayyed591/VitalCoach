"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Phone, ArrowRight, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"

export default function AuthPage() {
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState("1234567890")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid phone number")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Store phone number in session storage for OTP page
      sessionStorage.setItem("phoneNumber", phoneNumber)
      navigate("/otp")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#121212]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-lg bg-[#1E1E1E]">
          <CardHeader className="pb-2">
            <div className="w-16 h-16 rounded-full bg-[#16A34A]/20 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-[#16A34A]" />
            </div>
            <CardTitle className="text-2xl font-bold text-center text-white">Welcome to HealthTracker</CardTitle>
            <p className="text-[#A1A1A1] text-center mt-2">Enter your phone number to continue</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Phone className="w-5 h-5 text-[#A1A1A1]" />
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-[#2A2D3A] text-white border-none rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
                    placeholder="Enter your phone number"
                    maxLength={10}
                  />
                </div>
                {error && <p className="text-[#FF4D4D] text-sm">{error}</p>}
              </div>

              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#16A34A] to-[#06B6D4] hover:opacity-90 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Send OTP <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </motion.div>

              <p className="text-[#A1A1A1] text-xs text-center mt-4">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

