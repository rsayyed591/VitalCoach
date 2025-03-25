import { useState } from "react"
import { Modal } from "./ui/modal"
import { Button } from "./ui/button"
import { Footprints, Droplets, Utensils, Moon } from "lucide-react"

export function GoalModal({ isOpen, onClose, onSave }) {
  const [goalType, setGoalType] = useState("steps")
  const [goalValue, setGoalValue] = useState("")

  const handleSave = () => {
    if (goalValue) {
      onSave({
        type: goalType,
        value: Number.parseInt(goalValue, 10),
      })
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Set a New Goal">
      <div className="space-y-4">
        <div>
          <label className="block text-[#E4E4E4] mb-2">Goal Type</label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={goalType === "steps" ? "primary" : "outline"}
              className="flex items-center justify-center gap-2"
              onClick={() => setGoalType("steps")}
            >
              <Footprints className="w-4 h-4" />
              Steps
            </Button>
            <Button
              type="button"
              variant={goalType === "water" ? "primary" : "outline"}
              className="flex items-center justify-center gap-2"
              onClick={() => setGoalType("water")}
            >
              <Droplets className="w-4 h-4" />
              Water
            </Button>
            <Button
              type="button"
              variant={goalType === "calories" ? "primary" : "outline"}
              className="flex items-center justify-center gap-2"
              onClick={() => setGoalType("calories")}
            >
              <Utensils className="w-4 h-4" />
              Calories
            </Button>
            <Button
              type="button"
              variant={goalType === "sleep" ? "primary" : "outline"}
              className="flex items-center justify-center gap-2"
              onClick={() => setGoalType("sleep")}
            >
              <Moon className="w-4 h-4" />
              Sleep
            </Button>
          </div>
        </div>

        <div>
          <label htmlFor="goalValue" className="block text-[#E4E4E4] mb-2">
            Goal Value
            {goalType === "steps" && " (steps)"}
            {goalType === "water" && " (liters)"}
            {goalType === "calories" && " (calories)"}
            {goalType === "sleep" && " (hours)"}
          </label>
          <input
            id="goalValue"
            type="number"
            value={goalValue}
            onChange={(e) => setGoalValue(e.target.value)}
            className="w-full bg-[#2A2D3A] text-[#E4E4E4] border-none rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#16A34A]"
            placeholder={
              goalType === "steps" ? "10000" : goalType === "water" ? "2.5" : goalType === "calories" ? "2000" : "8"
            }
          />
        </div>

        <div className="pt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Goal
          </Button>
        </div>
      </div>
    </Modal>
  )
}

