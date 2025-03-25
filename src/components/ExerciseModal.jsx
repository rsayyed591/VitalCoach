import { useState, useEffect, useRef } from "react"
import { Modal } from "./ui/modal"
import { Button } from "./ui/button"
import { Play, Pause, SkipForward, X } from "lucide-react"

export function ExerciseModal({ isOpen, onClose, exercises, type }) {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const intervalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setCurrentExercise(0)
      setIsActive(false)
      setSeconds(0)
      setIsCompleted(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((seconds) => seconds + 1)
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isActive, seconds])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const handleStartStop = () => {
    setIsActive(!isActive)
  }

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
    } else {
      setIsCompleted(true)
      setIsActive(false)
      clearInterval(intervalRef.current)
    }
  }

  const handleEnd = () => {
    setIsCompleted(true)
    setIsActive(false)
    clearInterval(intervalRef.current)
  }

  const handleClose = () => {
    clearInterval(intervalRef.current)
    onClose()
  }

  if (!exercises || exercises.length === 0) return null

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={isCompleted ? "Session Completed" : `${type} Session`}>
      {isCompleted ? (
        <div className="flex flex-col items-center justify-center py-8 space-y-6">
          <div className="text-[#16A34A] text-6xl">🎉</div>
          <h3 className="text-xl font-bold text-center text-[#E4E4E4]">{type} session completed for today!</h3>
          <p className="text-[#A1A1A1] text-center">
            Great job! You've completed your {type.toLowerCase()} session. Keep up the good work to maintain your
            streak!
          </p>
          <div className="text-center text-[#E4E4E4] text-lg">Total time: {formatTime(seconds)}</div>
          <Button onClick={handleClose} className="mt-4">
            Close
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center mb-2">
            <h3 className="text-lg font-semibold text-[#E4E4E4]">{exercises[currentExercise].name}</h3>
            <p className="text-[#A1A1A1]">
              {exercises[currentExercise].duration ||
                `${exercises[currentExercise].sets} sets × ${exercises[currentExercise].reps || exercises[currentExercise].duration}`}
            </p>
          </div>

          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#2A2D3A] flex items-center justify-center">
            <img
              src={exercises[currentExercise].gifUrl || `/exercise-${currentExercise + 1}.gif`}
              alt={exercises[currentExercise].name}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div className="text-center text-2xl font-mono text-[#E4E4E4] my-2">{formatTime(seconds)}</div>

          <div className="flex items-center justify-center space-x-4 w-full">
            <Button
              onClick={handleStartStop}
              variant={isActive ? "outline" : "primary"}
              className="flex items-center gap-2"
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isActive ? "Pause" : "Start"}
            </Button>

            <Button onClick={handleNext} variant="secondary" className="flex items-center gap-2">
              <SkipForward className="w-4 h-4" />
              Next
            </Button>

            <Button onClick={handleEnd} variant="outline" className="flex items-center gap-2">
              <X className="w-4 h-4" />
              End
            </Button>
          </div>

          <div className="w-full bg-[#2A2D3A] h-1 rounded-full mt-4">
            <div
              className="bg-gradient-to-r from-[#16A34A] to-[#06B6D4] h-full rounded-full"
              style={{ width: `${((currentExercise + 1) / exercises.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-[#A1A1A1] text-sm">
            {currentExercise + 1} of {exercises.length}
          </div>
        </div>
      )}
    </Modal>
  )
}

