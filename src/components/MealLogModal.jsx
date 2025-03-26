import { useState } from "react"
import { Dialog } from "./ui/dialog"
import { Button } from "./ui/button"
import { Apple, Beef, Fish, Carrot, Egg } from "lucide-react"

export function MealLogModal({ isOpen, onClose, meal }) {
  const [portions, setPortions] = useState(1)
  const [notes, setNotes] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      meal: meal.name,
      foods: meal.foods,
      portions,
      notes,
      calories: meal.calories * portions,
      timestamp: new Date().toISOString(),
    })
    onClose()
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={`Log ${meal?.name || "Meal"}`} className="max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-gray-400">Foods</label>
          <ul className="bg-gray-800 rounded-lg p-3 space-y-2">
            {meal?.foods.map((food, index) => (
              <li key={index} className="flex items-center gap-2">
                {index === 0 && <Apple className="w-4 h-4 text-red-500" />}
                {index === 1 && <Carrot className="w-4 h-4 text-green-500" />}
                {index === 2 && (index % 3 === 0 ? <Beef className="w-4 h-4 text-gray-400" /> : <Fish className="w-4 h-4 text-blue-400" />)}
                <span>{food}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <label className="text-sm text-gray-400">Portions</label>
          <div className="flex items-center gap-2">
            <button type="button" className="w-8 h-8 bg-gray-700 rounded" onClick={() => setPortions((p) => Math.max(1, p - 0.5))}>-</button>
            <input
              type="number"
              value={portions}
              onChange={(e) => setPortions(Number.parseFloat(e.target.value) || 1)}
              step="0.5"
              min="0.5"
              className="w-16 text-center bg-gray-700 rounded"
            />
            <button type="button" className="w-8 h-8 bg-gray-700 rounded" onClick={() => setPortions((p) => p + 0.5)}>+</button>
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-400">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-gray-700 rounded p-2"
            placeholder="Add any notes about this meal..."
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700">Cancel</Button>
          <Button type="submit" className="bg-green-500 hover:bg-green-600">Log Meal</Button>
        </div>
      </form>
    </Dialog>
  )
}
