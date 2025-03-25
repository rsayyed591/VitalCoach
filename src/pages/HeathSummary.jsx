import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Heart, Activity, Droplets, Moon, ArrowUp, Download } from "lucide-react"
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

// Dummy data for demonstration
const healthData = {
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
  },
}

export default function HealthSummary() {
  const [timeRange, setTimeRange] = useState("week")
  const [chartData, setChartData] = useState(healthData)

  // Custom tooltip component for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#2A2D3A] p-2 rounded-md border border-[#16A34A]/30">
          <p className="text-[#E4E4E4]">{`${label} : ${payload[0].value}`}</p>
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
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthData.heartRate.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2D3A" />
                <XAxis dataKey="day" stroke="#A1A1A1" />
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
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthData.steps.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2D3A" />
                <XAxis dataKey="day" stroke="#A1A1A1" />
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
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthData.glucose.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2D3A" />
                <XAxis dataKey="day" stroke="#A1A1A1" />
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
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthData.sleep.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2D3A" />
                <XAxis dataKey="day" stroke="#A1A1A1" />
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

