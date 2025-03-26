"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle, Shield, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"

export default function OTPPage() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(["1", "2", "3", "4", "5", "6"])
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [verified, setVerified] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const inputRefs = useRef([...Array(6)].map(() => React.createRef()))

  useEffect(() => {
    // Get phone number from session storage
    const storedPhoneNumber = sessionStorage.getItem("phoneNumber")
    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber)
    } else {
      navigate("/auth")
    }
  }, [navigate])

  useEffect(() => {
    if (timeLeft > 0 && !verified) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, verified])

  const handleResendOTP = () => {
    setTimeLeft(30)
    // Simulate OTP resend
    // In a real app, you would call your API here
  }

  const handleInputChange = (index, value) => {
    if (value.length > 1) {
      // If pasting multiple digits, only take the first one
      value = value.charAt(0)
    }

    // Update the OTP array
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input if a digit was entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const otpValue = otp.join("")
    if (!otpValue || otpValue.length < 6) {
      setError("Please enter a valid OTP")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setVerified(true)

      // Set user as authenticated in localStorage
      localStorage.setItem("user", JSON.stringify({ authenticated: true }))

      // Redirect to home page after showing success message
      setTimeout(() => {
        navigate("/")
      }, 2000)
    }, 1500)
  }

  const handleGoBack = () => {
    navigate("/auth")
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
            <CardTitle className="text-2xl font-bold text-center text-white">Verify OTP</CardTitle>
            <p className="text-[#A1A1A1] text-center mt-2">
              We've sent a verification code to {phoneNumber ? `+91 ${phoneNumber}` : "your phone"}
            </p>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {verified ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#16A34A]/20 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-[#16A34A]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Verification Successful</h3>
                  <p className="text-[#A1A1A1] text-center mt-2">Redirecting to dashboard...</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="space-y-2">
                    <div className="flex justify-center gap-2">
                      {[...Array(6)].map((_, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          value={otp[index] || ""}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          ref={(el) => (inputRefs.current[index] = el)}
                          className="w-12 h-14 text-center text-xl font-bold bg-[#2A2D3A] text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition-all"
                        />
                      ))}
                    </div>
                    {error && <p className="text-[#FF4D4D] text-sm text-center">{error}</p>}
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={handleGoBack}
                      className="text-[#A1A1A1] hover:text-white flex items-center gap-1 text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>

                    <button
                      type="button"
                      onClick={handleResendOTP}
                      className={`text-sm ${timeLeft === 0 ? "text-[#16A34A] hover:underline" : "text-[#A1A1A1]"}`}
                      disabled={timeLeft > 0}
                    >
                      {timeLeft > 0 ? `Resend in ${timeLeft}s` : "Resend OTP"}
                    </button>
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
                          Verify OTP <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

