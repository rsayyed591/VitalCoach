"use client"

import { useState } from "react"
import { Dialog } from "./ui/dialog"
import { Button } from "./ui/button"
import { Footprints, Droplets, Flame, Heart, Check, ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Custom loader component
const CustomLoader = ({ isSubmitting }) => {
  if (!isSubmitting) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center bg-[#1E1E1E]/80 z-10 backdrop-blur-sm rounded-lg"
    >
      <div className="flex flex-col items-center">
        <svg className="w-12 h-12" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#16A34A"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="31.4 31.4"
            transform="rotate(0 25 25)"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        <p className="mt-4 text-[#E4E4E4] font-medium">Saving your goal...</p>
      </div>
    </motion.div>
  )
}

// Dropdown component
const Dropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (option) => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full bg-[#2A2D3A] text-[#E4E4E4] border-none rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#16A34A] flex items-center justify-between"
      >
        <span>{value || placeholder}</span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-[#A1A1A1]" /> : <ChevronDown className="w-4 h-4 text-[#A1A1A1]" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-10 w-full mt-1 bg-[#2A2D3A] rounded-lg shadow-lg overflow-hidden"
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={`px-3 py-2 cursor-pointer hover:bg-[#3A3D4A] flex items-center justify-between ${
                  value === option.value ? "bg-[#16A34A]/10 text-[#16A34A]" : "text-[#E4E4E4]"
                }`}
                onClick={() => handleSelect(option.value)}
              >
                <span>{option.label}</span>
                {value === option.value && <Check className="w-4 h-4" />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function GoalSettingModal({ isOpen, onClose, onSave }) {
  const [goalType, setGoalType] = useState("steps")
  const [goalValue, setGoalValue] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState("")
  const [isCustom, setIsCustom] = useState(false)

  // Goal presets based on type
  const goalPresets = {
    steps: [
      { value: "5000", label: "5,000 steps" },
      { value: "7500", label: "7,500 steps" },
      { value: "10000", label: "10,000 steps" },
      { value: "custom", label: "Custom" },
    ],
    calories: [
      { value: "1500", label: "1,500 kcal" },
      { value: "2000", label: "2,000 kcal" },
      { value: "2500", label: "2,500 kcal" },
      { value: "custom", label: "Custom" },
    ],
    heartRate: [
      { value: "60", label: "60 bpm (Resting)" },
      { value: "120", label: "120 bpm (Light Activity)" },
      { value: "150", label: "150 bpm (Moderate Activity)" },
      { value: "custom", label: "Custom" },
    ],
    glucose: [
      { value: "80", label: "80 mg/dL (Fasting)" },
      { value: "100", label: "100 mg/dL (Pre-meal)" },
      { value: "140", label: "140 mg/dL (Post-meal)" },
      { value: "custom", label: "Custom" },
    ],
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if ((!goalValue && !selectedPreset) || (isCustom && !goalValue)) return

    setIsSubmitting(true)

    try {
      // API call to save the goal
      const finalValue = isCustom ? goalValue : selectedPreset

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: goalType,
          value: Number.parseInt(finalValue),
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

  const handlePresetChange = (value) => {
    setSelectedPreset(value)
    setIsCustom(value === "custom")
    if (value !== "custom") {
      setGoalValue("")
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

  const getGoalLabel = () => {
    switch (goalType) {
      case "steps":
        return "Daily Step Goal"
      case "calories":
        return "Daily Calorie Goal"
      case "heartRate":
        return "Target Heart Rate"
      case "glucose":
        return "Target Glucose Level"
      default:
        return "Goal Value"
    }
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Set Your Goal">
      <form onSubmit={handleSubmit} className="space-y-4 relative">
        <CustomLoader isSubmitting={isSubmitting} />

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
            {getGoalLabel()}
          </label>

          <Dropdown
            options={goalPresets[goalType]}
            value={selectedPreset}
            onChange={handlePresetChange}
            placeholder="Select a goal"
          />

          {isCustom && (
            <div className="relative mt-3">
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
          )}
        </div>

        <div className="pt-2 flex gap-2 justify-end">
          <Button type="button" variant="default" onClick={onClose} className="bg-[#2A2D3A] hover:bg-[#3A3D4A]">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="bg-[#16A34A] hover:bg-[#16A34A]/80"
            disabled={(!selectedPreset && !goalValue) || (isCustom && !goalValue) || isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Goal"}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

