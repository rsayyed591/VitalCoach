import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { Heart, Footprints, Droplets, Award, TrendingUp, Lightbulb } from "lucide-react"

// Dummy data for demonstration
const healthData = {
  heartRate: 72,
  steps: 8432,
  glucose: 98,
  sleep: 7.5,
  water: 1.8,
  calories: 1850,
  goalSteps: 10000,
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
  const [quote, setQuote] = useState("")

  useEffect(() => {
    // Get a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
  }, [])

  return (
    <div className="space-y-6 page-transition">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Hello, Vivek</h1>
        <p className="text-[#A1A1A1]">Here's your health summary for today</p>
      </header>

      {/* Quote Card */}
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

      {/* Key Vitals */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Heart className="w-8 h-8 text-[#FF4D4D] mb-2" />
            <p className="text-[#A1A1A1] text-sm">Heart Rate</p>
            <p className="text-2xl font-bold">{healthData.heartRate}</p>
            <p className="text-xs text-[#A1A1A1]">bpm</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Footprints className="w-8 h-8 text-[#16A34A] mb-2" />
            <p className="text-[#A1A1A1] text-sm">Steps</p>
            <p className="text-2xl font-bold">{healthData.steps.toLocaleString()}</p>
            <Progress value={healthData.steps} max={healthData.goalSteps} className="mt-2 w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Droplets className="w-8 h-8 text-[#06B6D4] mb-2" />
            <p className="text-[#A1A1A1] text-sm">Glucose</p>
            <p className="text-2xl font-bold">{healthData.glucose}</p>
            <p className="text-xs text-[#A1A1A1]">mg/dL</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <TrendingUp className="w-8 h-8 text-[#16A34A] mb-2" />
            <p className="text-[#A1A1A1] text-sm">Sleep</p>
            <p className="text-2xl font-bold">{healthData.sleep}</p>
            <p className="text-xs text-[#A1A1A1]">hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <Button variant="primary" className="flex items-center justify-center gap-2">
            <Award className="w-4 h-4" />
            Set a Goal
          </Button>
          <Button variant="secondary" className="flex items-center justify-center gap-2">
            <TrendingUp className="w-4 h-4" />
            View Insights
          </Button>
        </CardContent>
      </Card>

      {/* Activity Summary */}
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
                {healthData.steps.toLocaleString()} / {healthData.goalSteps.toLocaleString()}
              </p>
            </div>
            <Progress value={healthData.steps} max={healthData.goalSteps} className="w-1/2" />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-[#A1A1A1]">Water</p>
              <p className="font-medium">
                {healthData.water}L / {healthData.goalWater}L
              </p>
            </div>
            <Progress value={healthData.water} max={healthData.goalWater} className="w-1/2" />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-[#A1A1A1]">Calories</p>
              <p className="font-medium">
                {healthData.calories} / {healthData.goalCalories}
              </p>
            </div>
            <Progress value={healthData.calories} max={healthData.goalCalories} className="w-1/2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

