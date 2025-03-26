"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { Heart, Footprints, Droplets, Award, TrendingUp, Lightbulb, Flame } from "lucide-react"
import { vitalService } from "../services/api"
import { GoalSettingModal } from "../components/GoalSettingModal"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

// Dummy data for demonstration
const healthData = {
  heartRate: 72,
  steps: 8432,
  glucose: 98,
  sleep: 7.5,
  water: 1.8,
  calories: 1850,
  goalSteps: 2000,
  goalWater: 2.5,
  goalCalories: 2000,
}

const quotes = [
  "The greatest wealth is health.",
  "Take care of your body. It's the only place you have to live.",
  "Health is not valued until sickness comes.",
  "Your health is an investment, not an expense.",
  "The first wealth is health.",
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [quote, setQuote] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({})
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false)
  const [goalSaved, setGoalSaved] = useState(false)

  // Hide chat bot when modal is open
  useEffect(() => {
    const chatBot = document.querySelector(".fixed.bottom-20.right-4.z-50")
    if (chatBot) {
      if (isGoalModalOpen) {
        chatBot.style.display = "none"
      } else {
        chatBot.style.display = "block"
      }
    }

    return () => {
      if (chatBot) {
        chatBot.style.display = "block"
      }
    }
  }, [isGoalModalOpen])

  useEffect(() => {
    // Get a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
  }, [])

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setLoading(true)
      try {
        const data = await vitalService.getDashboardStats()
        console.log("Data", data)
        setStats(data)
      } catch (err) {
        setError(err.message || "Failed to fetch dashboard stats")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardStats()
  }, [])

  const handleSaveGoal = async (goalData) => {
    try {
      // In a real app, you would update the stats with the new goal
      console.log("Goal saved:", goalData)

      // Show success message
      setGoalSaved(true)
      setTimeout(() => setGoalSaved(false), 3000)
    } catch (error) {
      console.error("Error saving goal:", error)
    }
  }

  const handleViewInsights = () => {
    navigate("/health")
  }

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
        <h1 className="text-2xl font-bold">Hello, Vivek</h1>
        <p className="text-[#A1A1A1]">Here's your health summary for today</p>
      </header>

      {/* Quote Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="border-l-4 border-l-[#06B6D4]">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-[#06B6D4] mt-1 flex-shrink-0" />
              <div>
                <p className="italic text-[#E4E4E4]">"{quote}"</p>
                <p className="text-[#A1A1A1] text-sm mt-2">Daily Motivation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Vitals */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Heart className="w-8 h-8 text-[#FF4D4D] mb-2" />
              <p className="text-[#A1A1A1] text-sm">Heart Rate</p>
              <p className="text-2xl font-bold">{stats.vitals.heart_rate}</p>
              <p className="text-xs text-[#A1A1A1]">bpm</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Footprints className="w-8 h-8 text-[#16A34A] mb-2" />
              <p className="text-[#A1A1A1] text-sm">Steps</p>
              <p className="text-2xl font-bold">{stats.vitals.step_count.toLocaleString()}</p>
              <Progress value={stats.vitals.step_count} max={stats.vitals.step_count + 100} className="mt-2 w-full" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Droplets className="w-8 h-8 text-[#06B6D4] mb-2" />
              <p className="text-[#A1A1A1] text-sm">Glucose</p>
              <p className="text-2xl font-bold">{stats.vitals.blood_sugar}</p>
              <p className="text-xs text-[#A1A1A1]">mg/dL</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Flame className="w-8 h-8 text-[#f93131] mb-2" />
              <p className="text-[#A1A1A1] text-sm">Calories</p>
              <p className="text-2xl font-bold">{stats.vitals.calories_burned}</p>
              <p className="text-xs text-[#A1A1A1]">kcal</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button
              variant="primary"
              className="flex items-center justify-center gap-2"
              onClick={() => setIsGoalModalOpen(true)}
            >
              <Award className="w-4 h-4" />
              Set a Goal
            </Button>
            <Button variant="secondary" className="flex items-center justify-center gap-2" onClick={handleViewInsights}>
              <TrendingUp className="w-4 h-4" />
              View Insights
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Activity Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Today's Activity</CardTitle>
            <Badge variant="success">On Track</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-[#A1A1A1]">Steps</p>
                <p className="font-medium">
                  {stats.aggregated.step_count.toLocaleString()} /{" "}
                  {(stats.aggregated.step_count + 10000).toLocaleString()}
                </p>
              </div>
              <Progress
                value={stats.aggregated.step_count}
                max={stats.aggregated.step_count + 10000}
                className="w-1/2"
              />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-[#A1A1A1]">Distance</p>
                <p className="font-medium">
                  {stats.aggregated.step_count.toFixed(0)} km / {(stats.aggregated.step_count * 1.2).toFixed(0)} km
                </p>
              </div>
              <Progress value={stats.aggregated.step_count} max={stats.aggregated.step_count * 1.2} className="w-1/2" />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-[#A1A1A1]">Calories</p>
                <p className="font-medium">
                  {stats.aggregated.calories_burned.toFixed(0)} / {(stats.aggregated.calories_burned * 1.2).toFixed(0)}
                </p>
              </div>
              <Progress
                value={stats.aggregated.calories_burned}
                max={stats.aggregated.calories_burned * 1.2}
                className="w-1/2"
              />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-[#A1A1A1]">Heart Rate</p>
                <p className="font-medium">
                  {stats.aggregated.heart_rate}bpm / {(stats.aggregated.heart_rate * 1.2).toFixed(0)}bpm
                </p>
              </div>
              <Progress value={stats.aggregated.heart_rate} max={stats.aggregated.heart_rate * 1.2} className="w-1/2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Goal Setting Modal */}
      <GoalSettingModal isOpen={isGoalModalOpen} onClose={() => setIsGoalModalOpen(false)} onSave={handleSaveGoal} />

      {/* Success Message */}
      {goalSaved && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 left-0 right-0 flex justify-center"
        >
          <div className="bg-[#16A34A] text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <Award className="w-4 h-4" />
            Goal successfully set!
          </div>
        </motion.div>
      )}
    </div>
  )
}

