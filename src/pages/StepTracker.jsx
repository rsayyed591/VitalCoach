import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Footprints, Award, Users, ChevronRight, Calendar, Clock, Flame, Zap } from "lucide-react"
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import confetti from "canvas-confetti"
import { motion } from "framer-motion"
import { vitalService } from "../services/api"

// Dummy data for demonstration
const stepData = {
  today: 8432,
  goal: 10000,
  week: [
    { day: "Mon", steps: 6543 },
    { day: "Tue", steps: 7821 },
    { day: "Wed", steps: 9432 },
    { day: "Thu", steps: 5678 },
    { day: "Fri", steps: 8432 },
    { day: "Sat", steps: 10234 },
    { day: "Sun", steps: 8432 },
  ],
  friends: [
    { name: "Emma", steps: 12453, avatar: "E" },
    { name: "John", steps: 9876, avatar: "J" },
    { name: "Sarah", steps: 8765, avatar: "S" },
    { name: "Mike", steps: 7654, avatar: "M" },
  ],
}

export default function StepTracker() {
  const [currentSteps, setCurrentSteps] = useState(stepData.today)
  const [selectedDate, setSelectedDate] = useState("Today")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({})
  const [goalReached, setGoalReached] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Custom tooltip component for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#2A2D3A] p-2 rounded-md border border-[#16A34A]/30">
          <p className="text-[#E4E4E4]">{`${label}: ${payload[0].value.toLocaleString()} steps`}</p>
        </div>
      )
    }
    return null
  }

  // Simulate step count increasing in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSteps((prev) => {
        const newSteps = prev + Math.floor(Math.random() * 5)

        // Check if goal is reached
        if (newSteps >= stepData.goal && !goalReached) {
          setGoalReached(true)
          // Trigger confetti
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })
        }

        return newSteps
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [goalReached])

  // Reset goal reached state when component unmounts
  useEffect(() => {
    return () => setGoalReached(false)
  }, [])

  useEffect(() => {
      const fetchDashboardStats = async () => {
        setLoading(true)
        try {
          const data = await vitalService.getDashboardStats()
          console.log("Net", data)
          setStats(data)
        } catch (err) {
          setError(err.message || "Failed to fetch dashboard stats")
        } finally {
          setLoading(false)
        }
      }
  
      fetchDashboardStats()
    }, [])

  // Calculate percentage of goal
  const goalPercentage = stats.vitals ? Math.min(100, Math.round((stats.vitals.step_count / (stats.vitals.step_count + 100)) * 100)) : 0

  // Calculate calories burned (rough estimate)
  const caloriesBurned = Math.round(currentSteps * 0.04)

  // Calculate distance (rough estimate)
  const distanceKm = (currentSteps * 0.0008).toFixed(2)

  if (loading) {
    return (
      <div className="flex items-center justify-center lg:h-[70vh] bg-[#191E29]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-8 h-8 border-2 border-[#16A34A] border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (error) {
    return <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">{error}</div>
  }
  return (
    <div className="space-y-6 page-transition">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">MoveMate</h1>
        <p className="text-[#A1A1A1]">Track your daily steps and activity</p>
      </header>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4">
        <Button
          variant={activeTab === "overview" ? "primary" : "default"}
          className="whitespace-nowrap"
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </Button>
        <Button
          variant={activeTab === "history" ? "primary" : "default"}
          className="whitespace-nowrap"
          onClick={() => setActiveTab("history")}
        >
          History
        </Button>
        <Button
          variant={activeTab === "leaderboard" ? "primary" : "default"}
          className="whitespace-nowrap"
          onClick={() => setActiveTab("leaderboard")}
        >
          Leaderboard
        </Button>
      </div>

      {activeTab === "overview" && (
        <>
          {/* Step Counter */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-[#16A34A]/20 to-[#06B6D4]/20 z-0"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-48 h-48 relative mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#2A2D3A" strokeWidth="8" />
                        {/* Progress circle */}
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#16A34A"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 45}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                          animate={{
                            strokeDashoffset: 2 * Math.PI * 45 * (1 - goalPercentage / 100),
                          }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Footprints className="w-8 h-8 text-[#16A34A] mb-1" />
                        <p className="text-4xl font-bold">{stats.vitals.step_count}</p>
                        <p className="text-sm text-[#A1A1A1]">steps</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-sm text-[#A1A1A1] mb-4">
                    {goalPercentage}% of daily goal ({stats.vitals.step_count.toLocaleString()} steps)
                  </p>

                  {goalReached && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2"
                    >
                      <Badge variant="success" className="text-sm px-3 py-1">
                        <Award className="w-4 h-4 mr-1" /> Goal Reached!
                      </Badge>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Cards - Fixed to have same height */}
          <div className="grid grid-cols-3 gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-3 flex flex-col items-center justify-center h-full">
                  <Flame className="w-5 h-5 text-[#FF4D4D] mb-1" />
                  <p className="text-xs text-[#A1A1A1]">Calories</p>
                  <p className="text-lg font-bold">{stats.vitals.calories_burned}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="p-3 flex flex-col items-center justify-center h-full">
                  <Zap className="w-5 h-5 text-[#16A34A] mb-1" />
                  <p className="text-xs text-[#A1A1A1]">Distance</p>
                  <p className="text-lg font-bold">{distanceKm} km</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card className="h-full">
                <CardContent className="p-3 flex flex-col items-center justify-center h-full">
                  <Clock className="w-5 h-5 text-[#06B6D4] mb-1" />
                  <p className="text-xs text-[#A1A1A1]">Active Time</p>
                  <p className="text-lg font-bold">{Math.round(currentSteps / 1000)} min</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Weekly Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stepData.week}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2A2D3A" />
                      <XAxis dataKey="day" stroke="#A1A1A1" />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="steps" fill="#06B6D4" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}

      {activeTab === "history" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {/* Date Selector */}
          <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 mb-4">
            {["Today", "Yesterday", "This Week", "This Month"].map((date) => (
              <Button
                key={date}
                variant={selectedDate === date ? "primary" : "default"}
                className="whitespace-nowrap"
                onClick={() => setSelectedDate(date)}
              >
                {date}
              </Button>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stepData.week.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#2A2D3A] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#16A34A]/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#16A34A]" />
                    </div>
                    <div>
                      <p className="font-medium">{day.day}</p>
                      <p className="text-xs text-[#A1A1A1]">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">{day.steps.toLocaleString()}</p>
                      <p className="text-xs text-[#A1A1A1]">steps</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#A1A1A1]" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeTab === "leaderboard" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" /> Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stepData.friends.map((friend, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${index === 0 ? "bg-[#FFD700]" : index === 1 ? "bg-[#C0C0C0]" : index === 2 ? "bg-[#CD7F32]" : "bg-[#2A2D3A]"} flex items-center justify-center text-sm font-medium`}
                    >
                      {friend.avatar}
                    </div>
                    <div>
                      <p className="font-medium">{friend.name}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-[#A1A1A1]">{friend.steps.toLocaleString()} steps</p>
                        {index === 0 && (
                          <Badge variant="success" className="text-xs">
                            Leader
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge variant={index === 0 ? "success" : "default"}>#{index + 1}</Badge>
                </motion.div>
              ))}

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#2A2D3A]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#16A34A] flex items-center justify-center text-sm font-medium">
                    V
                  </div>
                  <div>
                    <p className="font-medium">You</p>
                    <p className="text-xs text-[#A1A1A1]">{currentSteps.toLocaleString()} steps</p>
                  </div>
                </div>
                <Badge variant="info">#3</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

