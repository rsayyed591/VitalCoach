"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Heart, Activity, Droplets, Moon, ArrowUp, Download } from "lucide-react"
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { motion } from "framer-motion"

// Monthly data for demonstration
const monthlyData = {
  heartRate: {
    current: 72,
    data: [
      { month: "J", value: 68 },
      { month: "F", value: 72 },
      { month: "M", value: 75 },
      { month: "A", value: 71 },
      { month: "M", value: 69 },
      { month: "J", value: 73 },
      { month: "J", value: 72 },
      { month: "A", value: 70 },
      { month: "S", value: 74 },
      { month: "O", value: 71 },
      { month: "N", value: 73 },
      { month: "D", value: 72 },
    ],
    trend: "+3 bpm from last month",
  },
  steps: {
    current: 8432,
    data: [
      { month: "J", value: 6543 },
      { month: "F", value: 7821 },
      { month: "M", value: 9432 },
      { month: "A", value: 5678 },
      { month: "M", value: 8432 },
      { month: "J", value: 10234 },
      { month: "J", value: 8432 },
      { month: "A", value: 9123 },
      { month: "S", value: 7654 },
      { month: "O", value: 8765 },
      { month: "N", value: 9876 },
      { month: "D", value: 8432 },
    ],
    trend: "+12% from last month",
  },
  glucose: {
    current: 98,
    data: [
      { month: "J", value: 95 },
      { month: "F", value: 102 },
      { month: "M", value: 98 },
      { month: "A", value: 97 },
      { month: "M", value: 99 },
      { month: "J", value: 101 },
      { month: "J", value: 98 },
      { month: "A", value: 96 },
      { month: "S", value: 97 },
      { month: "O", value: 99 },
      { month: "N", value: 100 },
      { month: "D", value: 98 },
    ],
    trend: "Stable levels",
  },
  sleep: {
    current: 7.5,
    data: [
      { month: "J", value: 6.8 },
      { month: "F", value: 7.2 },
      { month: "M", value: 7.5 },
      { month: "A", value: 8.1 },
      { month: "M", value: 6.5 },
      { month: "J", value: 7.8 },
      { month: "J", value: 7.5 },
      { month: "A", value: 7.3 },
      { month: "S", value: 7.6 },
      { month: "O", value: 7.4 },
      { month: "N", value: 7.7 },
      { month: "D", value: 7.5 },
    ],
    trend: "+0.3 hours from last month",
  },
}

export default function HealthSummary() {
  const [timeRange, setTimeRange] = useState("month")
  const [chartData] = useState(monthlyData)

  // Custom tooltip component for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const monthNames = {
        J: "January/July",
        F: "February",
        M: "March/May",
        A: "April/August",
        S: "September",
        O: "October",
        N: "November",
        D: "December",
      }

      const fullMonth = monthNames[label] || label

      return (
        <div className="bg-[#2A2D3A] p-2 rounded-md border border-[#16A34A]/30">
          <p className="text-[#E4E4E4]">{`${fullMonth}: ${payload[0].value}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6 page-transition">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">VitalStats</h1>
        <p className="text-[#A1A1A1]">Your health summary and trends</p>
      </header>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {["week", "month", "quarter"].map((range) => (
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-[#FF4D4D]" /> Heart Rate
              </CardTitle>
              <Badge variant="info">{chartData.heartRate.current} bpm</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.heartRate.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2D3A" />
                  <XAxis dataKey="month" stroke="#A1A1A1" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#FF4D4D"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#FF4D4D", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#FF4D4D", stroke: "#121212", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex items-center">
              <ArrowUp className="w-4 h-4 text-[#FF4D4D]" />
              <p className="text-sm ml-1">{chartData.heartRate.trend}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-[#16A34A]" /> Steps
              </CardTitle>
              <Badge variant="success">{chartData.steps.current.toLocaleString()}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.steps.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2D3A" />
                  <XAxis dataKey="month" stroke="#A1A1A1" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#16A34A"
                    fill="#16A34A"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#16A34A", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#16A34A", stroke: "#121212", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex items-center">
              <ArrowUp className="w-4 h-4 text-[#16A34A]" />
              <p className="text-sm ml-1">{chartData.steps.trend}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Glucose */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Droplets className="w-5 h-5 mr-2 text-[#06B6D4]" /> Glucose
              </CardTitle>
              <Badge variant="info">{chartData.glucose.current} mg/dL</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.glucose.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2D3A" />
                  <XAxis dataKey="month" stroke="#A1A1A1" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#06B6D4"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#06B6D4", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#06B6D4", stroke: "#121212", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex items-center">
              <p className="text-sm">{chartData.glucose.trend}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sleep */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Moon className="w-5 h-5 mr-2 text-[#A1A1A1]" /> Sleep
              </CardTitle>
              <Badge variant="default">{chartData.sleep.current} hrs</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.sleep.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2D3A" />
                  <XAxis dataKey="month" stroke="#A1A1A1" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#A1A1A1"
                    fill="#A1A1A1"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#A1A1A1", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#A1A1A1", stroke: "#121212", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex items-center">
              <ArrowUp className="w-4 h-4 text-[#22C55E]" />
              <p className="text-sm ml-1">{chartData.sleep.trend}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-l-4 border-l-[#16A34A]">
          <CardHeader>
            <CardTitle>Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              <span className="font-medium text-[#16A34A]">Improved Activity:</span> Your average steps increased by 12%
              compared to last month.
            </p>
            <p className="text-sm">
              <span className="font-medium text-[#FF4D4D]">Heart Rate:</span> Your resting heart rate is slightly
              elevated. Consider more relaxation activities.
            </p>
            <p className="text-sm">
              <span className="font-medium text-[#06B6D4]">Glucose:</span> Your glucose levels have remained stable
              throughout the month.
            </p>
            <p className="text-sm">
              <span className="font-medium text-[#A1A1A1]">Sleep:</span> Your sleep duration has improved. Maintain your
              current sleep schedule.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

