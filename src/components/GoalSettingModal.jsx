"use client"

import { useState } from "react"
import { Dialog } from "./ui/dialog"
import { Button } from "./ui/button"
import { Footprints, Droplets, Flame, Heart } from "lucide-react"

export function GoalSettingModal({ isOpen, onClose, onSave }) {
  const [goalType, setGoalType] = useState("steps")
  const [goalValue, setGoalValue] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!goalValue) return

    setIsSubmitting(true)

    try {
      // API call to save the goal
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: goalType,
          value: Number.parseInt(goalValue),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save goal")
      }

      const data = await response.json()
      onSave(data)
      onClose()
    } catch (error) {
      console.error("Error saving goal:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPlaceholder = () => {
    switch (goalType) {
      case "steps":
        return "e.g., 10000"
      case "calories":
        return "e.g., 2000"
      case "heartRate":
        return "e.g., 70"
      case "glucose":
        return "e.g., 100"
      default:
        return "Enter value"
    }
  }

  const getUnit = () => {
    switch (goalType) {
      case "steps":
        return "steps"
      case "calories":
        return "kcal"
      case "heartRate":
        return "bpm"
      case "glucose":
        return "mg/dL"
      default:
        return ""
    }
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Set Your Goal">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-[#A1A1A1]">Goal Type</label>
          <select
            value={goalType}
            onChange={(e) => setGoalType(e.target.value)}
            className="w-full bg-[#2A2D3A] text-[#E4E4E4] border-none rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#16A34A]"
          >
            <option value="steps">Steps</option>
            <option value="calories">Calories</option>
            <option value="heartRate">Heart Rate</option>
            <option value="glucose">Glucose</option>
          </select>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          <button
            type="button"
            className={`flex flex-col items-center gap-2 p-3 rounded-lg border ${
              goalType === "steps" ? "border-[#16A34A] bg-[#16A34A]/10" : "border-[#2A2D3A]"
            }`}
            onClick={() => setGoalType("steps")}
          >
            <Footprints className={`w-6 h-6 ${goalType === "steps" ? "text-[#16A34A]" : "text-[#A1A1A1]"}`} />
            <span className={`text-xs ${goalType === "steps" ? "text-[#E4E4E4]" : "text-[#A1A1A1]"}`}>Steps</span>
          </button>
          <button
            type="button"
            className={`flex flex-col items-center gap-2 p-3 rounded-lg border ${
              goalType === "calories" ? "border-[#FF4D4D] bg-[#FF4D4D]/10" : "border-[#2A2D3A]"
            }`}
            onClick={() => setGoalType("calories")}
          >
            <Flame className={`w-6 h-6 ${goalType === "calories" ? "text-[#FF4D4D]" : "text-[#A1A1A1]"}`} />
            <span className={`text-xs ${goalType === "calories" ? "text-[#E4E4E4]" : "text-[#A1A1A1]"}`}>Calories</span>
          </button>
          <button
            type="button"
            className={`flex flex-col items-center gap-2 p-3 rounded-lg border ${
              goalType === "heartRate" ? "border-[#FF4D4D] bg-[#FF4D4D]/10" : "border-[#2A2D3A]"
            }`}
            onClick={() => setGoalType("heartRate")}
          >
            <Heart className={`w-6 h-6 ${goalType === "heartRate" ? "text-[#FF4D4D]" : "text-[#A1A1A1]"}`} />
            <span className={`text-xs ${goalType === "heartRate" ? "text-[#E4E4E4]" : "text-[#A1A1A1]"}`}>
              Heart Rate
            </span>
          </button>
          <button
            type="button"
            className={`flex flex-col items-center gap-2 p-3 rounded-lg border ${
              goalType === "glucose" ? "border-[#06B6D4] bg-[#06B6D4]/10" : "border-[#2A2D3A]"
            }`}
            onClick={() => setGoalType("glucose")}
          >
            <Droplets className={`w-6 h-6 ${goalType === "glucose" ? "text-[#06B6D4]" : "text-[#A1A1A1]"}`} />
            <span className={`text-xs ${goalType === "glucose" ? "text-[#E4E4E4]" : "text-[#A1A1A1]"}`}>Glucose</span>
          </button>
        </div>

        <div className="space-y-2">
          <label htmlFor="goalValue" className="text-sm text-[#A1A1A1]">
            {goalType === "steps" && "Daily Step Goal"}
            {goalType === "calories" && "Daily Calorie Goal"}
            {goalType === "heartRate" && "Target Heart Rate"}
            {goalType === "glucose" && "Target Glucose Level"}
          </label>
          <div className="relative">
            <input
              id="goalValue"
              type="number"
              value={goalValue}
              onChange={(e) => setGoalValue(e.target.value)}
              className="w-full bg-[#2A2D3A] text-[#E4E4E4] border-none rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#16A34A] pr-16"
              placeholder={getPlaceholder()}
              min={1}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A1A1A1]">{getUnit()}</div>
          </div>
        </div>

        <div className="pt-2 flex gap-2 justify-end">
          <Button type="button" variant="default" onClick={onClose} className="bg-[#2A2D3A] hover:bg-[#3A3D4A]">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="bg-[#16A34A] hover:bg-[#16A34A]/80"
            disabled={!goalValue || isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Goal"}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

