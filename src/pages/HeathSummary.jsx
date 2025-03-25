"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Heart, Activity, Droplets, Moon, ArrowUp, Download } from "lucide-react"

// Dummy data for demonstration
const healthData = {
  heartRate: {
    current: 72,
    data: [68, 72, 75, 71, 69, 73, 72],
    trend: "+3 bpm from last week",
  },
  steps: {
    current: 8432,
    data: [6543, 7821, 9432, 5678, 8432, 10234, 8432],
    trend: "+12% from last week",
  },
  glucose: {
    current: 98,
    data: [95, 102, 98, 97, 99, 101, 98],
    trend: "Stable levels",
  },
  sleep: {
    current: 7.5,
    data: [6.8, 7.2, 7.5, 8.1, 6.5, 7.8, 7.5],
    trend: "+0.3 hours from last week",
  },
}

export default function HealthSummary() {
  const [timeRange, setTimeRange] = useState("week")

  // Function to render a simple line chart
  const renderChart = (data, color, height = 100) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min

    return (
      <div className="flex items-end h-[100px] gap-1 mt-4">
        {data.map((value, index) => {
          const normalizedHeight = range === 0 ? height / 2 : ((value - min) / range) * height

          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className={`w-full rounded-sm ${color}`} style={{ height: `${normalizedHeight}%` }}></div>
              <div className="w-full h-[1px] bg-[#2A2D3A]"></div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-6 page-transition">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">VitalStats</h1>
        <p className="text-[#A1A1A1]">Your health summary and trends</p>
      </header>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {["week", "month", "year"].map((range) => (
          <Button key={range} variant={timeRange === range ? "primary" : "default"} onClick={() => setTimeRange(range)}>
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </Button>
        ))}

        <Button variant="outline" className="ml-auto">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Heart Rate */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Heart className="w-5 h-5 mr-2 text-[#FF4D4D]" /> Heart Rate
            </CardTitle>
            <Badge variant="info">{healthData.heartRate.current} bpm</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {renderChart(healthData.heartRate.data, "bg-[#FF4D4D]")}

          <div className="mt-4 flex items-center">
            <ArrowUp className="w-4 h-4 text-[#FF4D4D]" />
            <p className="text-sm ml-1">{healthData.heartRate.trend}</p>
          </div>
        </CardContent>
      </Card>

      {/* Steps */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-[#16A34A]" /> Steps
            </CardTitle>
            <Badge variant="success">{healthData.steps.current.toLocaleString()}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {renderChart(healthData.steps.data, "bg-[#16A34A]")}

          <div className="mt-4 flex items-center">
            <ArrowUp className="w-4 h-4 text-[#16A34A]" />
            <p className="text-sm ml-1">{healthData.steps.trend}</p>
          </div>
        </CardContent>
      </Card>

      {/* Glucose */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Droplets className="w-5 h-5 mr-2 text-[#06B6D4]" /> Glucose
            </CardTitle>
            <Badge variant="info">{healthData.glucose.current} mg/dL</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {renderChart(healthData.glucose.data, "bg-[#06B6D4]")}

          <div className="mt-4 flex items-center">
            <p className="text-sm">{healthData.glucose.trend}</p>
          </div>
        </CardContent>
      </Card>

      {/* Sleep */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Moon className="w-5 h-5 mr-2 text-[#A1A1A1]" /> Sleep
            </CardTitle>
            <Badge variant="default">{healthData.sleep.current} hrs</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {renderChart(healthData.sleep.data, "bg-[#A1A1A1]")}

          <div className="mt-4 flex items-center">
            <ArrowUp className="w-4 h-4 text-[#22C55E]" />
            <p className="text-sm ml-1">{healthData.sleep.trend}</p>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="border-l-4 border-l-[#16A34A]">
        <CardHeader>
          <CardTitle>Trend Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">
            <span className="font-medium text-[#16A34A]">Improved Activity:</span> Your average steps increased by 12%
            compared to last week.
          </p>
          <p className="text-sm">
            <span className="font-medium text-[#FF4D4D]">Heart Rate:</span> Your resting heart rate is slightly
            elevated. Consider more relaxation activities.
          </p>
          <p className="text-sm">
            <span className="font-medium text-[#06B6D4]">Glucose:</span> Your glucose levels have remained stable
            throughout the week.
          </p>
          <p className="text-sm">
            <span className="font-medium text-[#A1A1A1]">Sleep:</span> Your sleep duration has improved. Maintain your
            current sleep schedule.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

