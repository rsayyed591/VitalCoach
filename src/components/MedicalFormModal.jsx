import { useState } from "react"
import { Modal } from "./ui/modal"
import { Button } from "./ui/button"
import { Plus, Trash2 } from "lucide-react"

export function MedicalFormModal({ isOpen, onClose, onSave, initialData }) {
  const [conditions, setConditions] = useState(initialData?.conditions || [])
  const [allergies, setAllergies] = useState(initialData?.allergies || [])
  const [medications, setMedications] = useState(initialData?.medications || [])

  const [newCondition, setNewCondition] = useState("")
  const [newAllergy, setNewAllergy] = useState("")
  const [newMedication, setNewMedication] = useState("")

  const handleAddCondition = () => {
    if (newCondition.trim()) {
      setConditions([...conditions, newCondition.trim()])
      setNewCondition("")
    }
  }

  const handleAddAllergy = () => {
    if (newAllergy.trim()) {
      setAllergies([...allergies, newAllergy.trim()])
      setNewAllergy("")
    }
  }

  const handleAddMedication = () => {
    if (newMedication.trim()) {
      setMedications([...medications, newMedication.trim()])
      setNewMedication("")
    }
  }

  const handleRemoveCondition = (index) => {
    setConditions(conditions.filter((_, i) => i !== index))
  }

  const handleRemoveAllergy = (index) => {
    setAllergies(allergies.filter((_, i) => i !== index))
  }

  const handleRemoveMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    onSave({
      conditions,
      allergies,
      medications,
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Medical History">
      <div className="space-y-6">
        <div>
          <h3 className="text-[#E4E4E4] font-medium mb-2">Medical Conditions</h3>
          <div className="space-y-2">
            {conditions.map((condition, index) => (
              <div key={index} className="flex items-center justify-between bg-[#2A2D3A] p-2 rounded-lg">
                <span className="text-[#E4E4E4]">{condition}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveCondition(index)}
                  className="text-[#FF4D4D] hover:text-[#FF4D4D]/80 hover:bg-[#FF4D4D]/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="text"
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                placeholder="Add condition"
                className="flex-1 bg-[#2A2D3A] text-[#E4E4E4] border-none rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#16A34A]"
              />
              <Button variant="outline" onClick={handleAddCondition}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-[#E4E4E4] font-medium mb-2">Allergies</h3>
          <div className="space-y-2">
            {allergies.map((allergy, index) => (
              <div key={index} className="flex items-center justify-between bg-[#2A2D3A] p-2 rounded-lg">
                <span className="text-[#E4E4E4]">{allergy}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveAllergy(index)}
                  className="text-[#FF4D4D] hover:text-[#FF4D4D]/80 hover:bg-[#FF4D4D]/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="text"
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                placeholder="Add allergy"
                className="flex-1 bg-[#2A2D3A] text-[#E4E4E4] border-none rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#16A34A]"
              />
              <Button variant="outline" onClick={handleAddAllergy}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-[#E4E4E4] font-medium mb-2">Medications</h3>
          <div className="space-y-2">
            {medications.map((medication, index) => (
              <div key={index} className="flex items-center justify-between bg-[#2A2D3A] p-2 rounded-lg">
                <span className="text-[#E4E4E4]">{medication}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveMedication(index)}
                  className="text-[#FF4D4D] hover:text-[#FF4D4D]/80 hover:bg-[#FF4D4D]/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="text"
                value={newMedication}
                onChange={(e) => setNewMedication(e.target.value)}
                placeholder="Add medication"
                className="flex-1 bg-[#2A2D3A] text-[#E4E4E4] border-none rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#16A34A]"
              />
              <Button variant="outline" onClick={handleAddMedication}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  )
}

