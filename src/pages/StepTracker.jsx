import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { Footprints, Award, Users } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import confetti from "canvas-confetti"

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
  const [goalReached, setGoalReached] = useState(false)

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

  return (
    <div className="space-y-6 page-transition">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">MoveMate</h1>
        <p className="text-[#A1A1A1]">Track your daily steps and activity</p>
      </header>

      {/* Date Selector */}
      <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4">
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

      {/* Step Counter */}
      <Card className="relative overflow-hidden">
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#16A34A]/20 to-[#06B6D4]/20 z-0"></div>
          <div className="relative z-10 flex flex-col items-center">
            <Footprints className="w-12 h-12 text-[#16A34A] mb-4" />
            <div className="text-center">
              <p className="text-[#A1A1A1] text-sm mb-1">Steps Today</p>
              <p className="text-5xl font-bold mb-4">{currentSteps.toLocaleString()}</p>
              <div className="w-full max-w-xs mb-2">
                <Progress value={currentSteps} max={stepData.goal} />
              </div>
              <p className="text-sm text-[#A1A1A1]">
                {Math.round((currentSteps / stepData.goal) * 100)}% of daily goal
              </p>

              {goalReached && (
                <div className="mt-4">
                  <Badge variant="success" className="text-sm px-3 py-1">
                    <Award className="w-4 h-4 mr-1" /> Goal Reached!
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Progress */}
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

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" /> Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {stepData.friends.map((friend, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2A2D3A] flex items-center justify-center text-sm font-medium">
                  {friend.avatar}
                </div>
                <div>
                  <p className="font-medium">{friend.name}</p>
                  <p className="text-xs text-[#A1A1A1]">{friend.steps.toLocaleString()} steps</p>
                </div>
              </div>
              <Badge variant={index === 0 ? "success" : "default"}>#{index + 1}</Badge>
            </div>
          ))}

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#2A2D3A]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#16A34A] flex items-center justify-center text-sm font-medium">
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
    </div>
  )
}

