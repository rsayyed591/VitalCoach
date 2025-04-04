import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Heart, Activity, Droplets, Moon, ArrowUp, Download, Info } from 'lucide-react'
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { motion } from "framer-motion"

// Weekly data for demonstration
const weeklyData = {
  heartRate: {
    current: 72,
    data: [
      { day: "Mon", value: 68 },
      { day: "Tue", value: 72 },
      { day: "Wed", value: 75 },
      { day: "Thu", value: 71 },
      { day: "Fri", value: 69 },
      { day: "Sat", value: 73 },
      { day: "Sun", value: 72 },
    ],
    trend: "+3 bpm from last week",
    insight: "Your heart rate is within normal range but slightly elevated on Wednesday."
  },
  steps: {
    current: 8432,
    data: [
      { day: "Mon", value: 6543 },
      { day: "Tue", value: 7821 },
      { day: "Wed", value: 9432 },
      { day: "Thu", value: 5678 },
      { day: "Fri", value: 8432 },
      { day: "Sat", value: 10234 },
      { day: "Sun", value: 8432 },
    ],
    trend: "+12% from last week",
    insight: "You're most active on Saturdays. Try to maintain consistent activity throughout the week."
  },
  glucose: {
    current: 98,
    data: [
      { day: "Mon", value: 95 },
      { day: "Tue", value: 102 },
      { day: "Wed", value: 98 },
      { day: "Thu", value: 97 },
      { day: "Fri", value: 99 },
      { day: "Sat", value: 101 },
      { day: "Sun", value: 98 },
    ],
    trend: "Stable levels",
    insight: "Your glucose levels are stable. Keep monitoring after meals for better insights."
  },
  sleep: {
    current: 7.5,
    data: [
      { day: "Mon", value: 6.8 },
      { day: "Tue", value: 7.2 },
      { day: "Wed", value: 7.5 },
      { day: "Thu", value: 8.1 },
      { day: "Fri", value: 6.5 },
      { day: "Sat", value: 7.8 },
      { day: "Sun", value: 7.5 },
    ],
    trend: "+0.3 hours from last week",
    insight: "Your sleep pattern is irregular. Try to maintain a consistent sleep schedule."
  },
}

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
    insight: "Your resting heart rate has been consistent throughout the year with slight seasonal variations."
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
    insight: "Your activity peaks during summer months. Consider indoor activities during winter to maintain consistency."
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
    insight: "Your glucose levels have remained stable throughout the year. Continue your current diet plan."
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
    insight: "Your sleep duration is better in spring and fall. Consider adjusting your sleep environment during summer and winter."
  },
}

// Quarterly data for demonstration
const quarterlyData = {
  heartRate: {
    current: 72,
    data: [
      { quarter: "Q1", value: 71 },
      { quarter: "Q2", value: 73 },
      { quarter: "Q3", value: 70 },
      { quarter: "Q4", value: 72 },
    ],
    trend: "Stable throughout the year",
    insight: "Your heart rate shows minimal variation across quarters, indicating good cardiovascular stability."
  },
  steps: {
    current: 8432,
    data: [
      { quarter: "Q1", value: 7500 },
      { quarter: "Q2", value: 9200 },
      { quarter: "Q3", value: 8800 },
      { quarter: "Q4", value: 7900 },
    ],
    trend: "Higher in Q2 and Q3",
    insight: "You're most active during spring and summer. Consider indoor fitness activities during fall and winter."
  },
  glucose: {
    current: 98,
    data: [
      { quarter: "Q1", value: 98 },
      { quarter: "Q2", value: 99 },
      { quarter: "Q3", value: 97 },
      { quarter: "Q4", value: 99 },
    ],
    trend: "Consistent throughout the year",
    insight: "Your glucose levels remain remarkably stable across seasons, suggesting good metabolic health."
  },
  sleep: {
    current: 7.5,
    data: [
      { quarter: "Q1", value: 7.2 },
      { quarter: "Q2", value: 7.5 },
      { quarter: "Q3", value: 7.4 },
      { quarter: "Q4", value: 7.6 },
    ],
    trend: "Slightly better in Q4",
    insight: "Your sleep quality improves in the last quarter of the year. Consider maintaining those habits year-round."
  },
}

export default function HealthSummary() {
  const [timeRange, setTimeRange] = useState("month")
  const [showInsights, setShowInsights] = useState({
    heartRate: false,
    steps: false,
    glucose: false,
    sleep: false
  })

  // Get the appropriate data based on the selected time range
  const getChartData = () => {
    switch (timeRange) {
      case "week":
        return weeklyData
      case "month":
        return monthlyData
      case "quarter":
        return quarterlyData
      default:
        return monthlyData
    }
  }

  const chartData = getChartData()

  // Get the appropriate x-axis key based on the selected time range
  const getXAxisKey = () => {
    switch (timeRange) {
      case "week":
        return "day"
      case "month":
        return "month"
      case "quarter":
        return "quarter"
      default:
        return "month"
    }
  }

  const xAxisKey = getXAxisKey()

  // Custom tooltip component for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      let displayLabel = label
      
      if (timeRange === "month") {
        const monthNames = {
          "J": "January/July", 
          "F": "February", 
          "M": "March/May", 
          "A": "April/August", 
          "S": "September", 
          "O": "October", 
          "N": "November", 
          "D": "December"
        }
        displayLabel = monthNames[label] || label
      }
      
      return (
        <div className="bg-[#2A2D3A] p-2 rounded-md border border-[#16A34A]/30">
          <p className="text-[#E4E4E4]">{`${displayLabel}: ${payload[0].value}`}</p>
        </div>
      )
    }
    return null
  }

  const toggleInsight = (metric) => {
    setShowInsights(prev => ({
      ...prev,
      [metric]: !prev[metric]
    }))
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
          <Button 
            key={range} 
            variant={timeRange === range ? "primary" : "default"} 
            onClick={() => setTimeRange(range)}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </Button>
        ))}

        <Button variant="outline" className="ml-auto">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Heart Rate */}
      <motion.div 
        key={`heartRate-${timeRange}`}
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-[#FF4D4D]" /> Heart Rate
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => toggleInsight('heartRate')}
                >
                  <Info className="h-4 w-4" />
                </Button>
                <Badge variant="info">{chartData.heartRate.current} bpm</Badge>
              </div>
            </div>
            {showInsights.heartRate && (
              <div className="mt-2 text-sm bg-[#2A2D3A] p-2 rounded-md">
                <p>{chartData.heartRate.insight}</p>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.heartRate.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2D3A" />
                  <XAxis dataKey={xAxisKey} stroke="#A1A1A1" />
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
        key={`steps-${timeRange}`}
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
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => toggleInsight('steps')}
                >
                  <Info className="h-4 w-4" />
                </Button>
                <Badge variant="success">{chartData.steps.current.toLocaleString()}</Badge>
              </div>
            </div>
            {showInsights.steps && (
              <div className="mt-2 text-sm bg-[#2A2D3A] p-2 rounded-md">
                <p>{chartData.steps.insight}</p>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.steps.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2D3A" />
                  <XAxis dataKey={xAxisKey} stroke="#A1A1A1" />
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
        key={`glucose-${timeRange}`}
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
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => toggleInsight('glucose')}
                >
                  <Info className="h-4 w-4" />
                </Button>
                <Badge variant="info">{chartData.glucose.current} mg/dL</Badge>
              </div>
            </div>
            {showInsights.glucose && (
              <div className="mt-2 text-sm bg-[#2A2D3A] p-2 rounded-md">
                <p>{chartData.glucose.insight}</p>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.glucose.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2D3A" />
                  <XAxis dataKey={xAxisKey} stroke="#A1A1A1" />
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
        key={`sleep-${timeRange}`}
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
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => toggleInsight('sleep')}
                >
                  <Info className="h-4 w-4" />
                </Button>
                <Badge variant="default">{chartData.sleep.current} hrs</Badge>
              </div>
            </div>
            {showInsights.sleep && (
              <div className="mt-2 text-sm bg-[#2A2D3A] p-2 rounded-md">
                <p>{chartData.sleep.insight}</p>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.sleep.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2D3A" />
                  <XAxis dataKey={xAxisKey} stroke="#A1A1A1" />
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
        key={`insights-${timeRange}`}
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
              compared to last {timeRange}.
            </p>
            <p className="text-sm">
              <span className="font-medium text-[#FF4D4D]">Heart Rate:</span> Your resting heart rate is slightly
              elevated. Consider more relaxation activities.
            </p>
            <p className="text-sm">
              <span className="font-medium text-[#06B6D4]">Glucose:</span> Your glucose levels have remained stable
              throughout the {timeRange}.
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
