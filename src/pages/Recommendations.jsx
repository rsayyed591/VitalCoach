import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Utensils, Dumbbell, SpaceIcon as Yoga, Apple, Beef, Fish, Carrot, Egg, Check, Clock } from "lucide-react"
import { ExerciseModal } from "../components/ExerciseModal"
import { MealLogModal } from "../components/MealLogModal"
import { motion, AnimatePresence } from "framer-motion"

// Dummy data for demonstration
const recommendationData = {
  diet: {
    calories: 2100,
    protein: 120,
    carbs: 210,
    fat: 70,
    meals: [
      {
        name: "Breakfast",
        foods: ["Greek yogurt with berries", "Whole grain toast", "Boiled eggs"],
        time: "7:00 - 8:00 AM",
        calories: 450,
      },
      {
        name: "Lunch",
        foods: ["Grilled chicken salad", "Quinoa", "Avocado"],
        time: "12:00 - 1:00 PM",
        calories: 650,
      },
      {
        name: "Snack",
        foods: ["Protein shake", "Almonds"],
        time: "3:00 - 4:00 PM",
        calories: 250,
      },
      {
        name: "Dinner",
        foods: ["Baked salmon", "Steamed vegetables", "Brown rice"],
        time: "7:00 - 8:00 PM",
        calories: 750,
      },
    ],
  },
  exercise: {
    cardio: [
      { name: "Brisk walking", duration: "30 mins", calories: 150, gifUrl: "/gif/exercise/walking.gif" },
      { name: "Cycling", duration: "20 mins", calories: 200, gifUrl: "/gif/exercise/cycling.gif" },
    ],
    strength: [
      { name: "Push-ups", sets: 3, reps: 12, gifUrl: "/gif/exercise/pushUps.gif" },
      { name: "Squats", sets: 3, reps: 15, gifUrl: "/gif/exercise/bearSquat.gif" },
    ],
    yoga: [
      { name: "TadaSana", duration: "5 mins", gifUrl: "/gif/yoga/tadasana.gif" },
      { name: "VajraSana", duration: "5 mins", gifUrl: "/gif/yoga/vajrasana.gif" },
      { name: "Uttanasana", duration: "5 mins", gifUrl: "/gif/yoga/uttanasana.gif" },
    ],
  },
}

export default function Recommendation() {
  const [activeTab, setActiveTab] = useState("diet")
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false)
  const [isYogaModalOpen, setIsYogaModalOpen] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [mealLogModalOpen, setMealLogModalOpen] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [loggedMeals, setLoggedMeals] = useState([])
  const [loggedExercises, setLoggedExercises] = useState([])
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    // Fetch logged meals from backend
    const fetchLoggedData = async () => {
      try {
        // In a real app, you would fetch from your API
        // For now, we'll simulate with empty arrays
        setLoggedMeals([])
        setLoggedExercises([])
      } catch (error) {
        console.error("Error fetching logged data:", error)
      }
    }

    fetchLoggedData()
  }, [])

  const handleLogMeal = (meal) => {
    setSelectedMeal(meal)
    setMealLogModalOpen(true)
  }

  const handleSaveMeal = (mealData) => {
    // Add the logged meal to state
    setLoggedMeals((prev) => [mealData, ...prev])

    // Show success message
    setSuccessMessage(`${mealData.meal} logged successfully!`)
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleViewExercise = (exercise) => {
    setSelectedExercise(exercise)
  }

  const handleStartWorkout = () => {
    setIsExerciseModalOpen(true)
  }

  const handleStartYoga = () => {
    setIsYogaModalOpen(true)
  }

  const handleSaveExercise = (exerciseData) => {
    // Add the logged exercise to state
    setLoggedExercises((prev) => [exerciseData, ...prev])

    // Show success message
    setSuccessMessage(`${exerciseData.name} logged successfully!`)
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  return (
    <div className="space-y-6 page-transition">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Wellness Guide</h1>
        <p className="text-[#A1A1A1]">Personalized recommendations for your health journey</p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        <Button
          variant={activeTab === "diet" ? "primary" : "default"}
          className="flex items-center gap-2"
          onClick={() => setActiveTab("diet")}
        >
          <Utensils className="w-4 h-4" />
          Diet Plan
        </Button>
        <Button
          variant={activeTab === "exercise" ? "primary" : "default"}
          className="flex items-center gap-2"
          onClick={() => setActiveTab("exercise")}
        >
          <Dumbbell className="w-4 h-4" />
          Exercise
        </Button>
        <Button
          variant={activeTab === "yoga" ? "primary" : "default"}
          className="flex items-center gap-2"
          onClick={() => setActiveTab("yoga")}
        >
          <Yoga className="w-4 h-4" />
          Yoga
        </Button>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-0 right-0 flex justify-center z-50"
          >
            <div className="bg-[#16A34A] text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
              <Check className="w-4 h-4" />
              {successMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Diet Plan */}
      {activeTab === "diet" && (
        <>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Daily Nutrition Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center p-3 bg-[#2A2D3A] rounded-lg">
                    <p className="text-sm text-[#A1A1A1]">Calories</p>
                    <p className="text-xl font-bold">{recommendationData.diet.calories}</p>
                    <p className="text-xs text-[#A1A1A1]">kcal</p>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-[#2A2D3A] rounded-lg">
                    <p className="text-sm text-[#A1A1A1]">Protein</p>
                    <p className="text-xl font-bold">{recommendationData.diet.protein}g</p>
                    <p className="text-xs text-[#A1A1A1]">
                      {Math.round(((recommendationData.diet.protein * 4) / recommendationData.diet.calories) * 100)}%
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-[#2A2D3A] rounded-lg">
                    <p className="text-sm text-[#A1A1A1]">Carbs</p>
                    <p className="text-xl font-bold">{recommendationData.diet.carbs}g</p>
                    <p className="text-xs text-[#A1A1A1]">
                      {Math.round(((recommendationData.diet.carbs * 4) / recommendationData.diet.calories) * 100)}%
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-[#2A2D3A] rounded-lg">
                    <p className="text-sm text-[#A1A1A1]">Fat</p>
                    <p className="text-xl font-bold">{recommendationData.diet.fat}g</p>
                    <p className="text-xs text-[#A1A1A1]">
                      {Math.round(((recommendationData.diet.fat * 9) / recommendationData.diet.calories) * 100)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="space-y-4">
            {recommendationData.diet.meals.map((meal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{meal.name}</CardTitle>
                      <Badge variant="info">{meal.calories} kcal</Badge>
                    </div>
                    <p className="text-sm text-[#A1A1A1]">{meal.time}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {meal.foods.map((food, foodIndex) => (
                        <li key={foodIndex} className="flex items-center gap-2">
                          {foodIndex === 0 && <Apple className="w-4 h-4 text-[#FF4D4D]" />}
                          {foodIndex === 1 && <Carrot className="w-4 h-4 text-[#16A34A]" />}
                          {foodIndex === 2 &&
                            (foodIndex % 3 === 0 ? (
                              <Beef className="w-4 h-4 text-[#A1A1A1]" />
                            ) : foodIndex % 2 === 0 ? (
                              <Fish className="w-4 h-4 text-[#06B6D4]" />
                            ) : (
                              <Egg className="w-4 h-4 text-[#E4E4E4]" />
                            ))}
                          <span>{food}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="default" className="w-full" onClick={() => handleLogMeal(meal)}>
                      Log Meal
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Logged Meals */}
          {loggedMeals.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Logged Meals Today</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {loggedMeals.map((meal, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-[#2A2D3A] rounded-lg">
                      <div className="flex items-center gap-3">
                        <Utensils className="w-5 h-5 text-[#16A34A]" />
                        <div>
                          <p className="font-medium">{meal.meal}</p>
                          <p className="text-xs text-[#A1A1A1]">{meal.calories} calories</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#A1A1A1]" />
                        <span className="text-xs text-[#A1A1A1]">
                          {new Date(meal.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </>
      )}

      {/* Exercise Plan */}
      {activeTab === "exercise" && (
        <>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Today's Workout Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Badge variant="info" className="mr-2">
                      1
                    </Badge>{" "}
                    Cardio
                  </h3>
                  <div className="space-y-3">
                    {recommendationData.exercise.cardio.map((exercise, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-[#2A2D3A] rounded-lg">
                        <div>
                          <p className="font-medium">{exercise.name}</p>
                          <p className="text-sm text-[#A1A1A1]">{exercise.duration}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="default">{exercise.calories} kcal</Badge>
                          <Button variant="outline" size="sm" onClick={() => handleViewExercise(exercise)}>
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Badge variant="info" className="mr-2">
                      2
                    </Badge>{" "}
                    Strength Training
                  </h3>
                  <div className="space-y-3">
                    {recommendationData.exercise.strength.map((exercise, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-[#2A2D3A] rounded-lg">
                        <div>
                          <p className="font-medium">{exercise.name}</p>
                          <p className="text-sm text-[#A1A1A1]">
                            {exercise.sets} sets × {exercise.reps || exercise.duration}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleViewExercise(exercise)}>
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="primary" className="w-full" onClick={handleStartWorkout}>
                  Start Workout
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Logged Exercises */}
          {loggedExercises.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Logged Exercises Today</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {loggedExercises.map((exercise, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-[#2A2D3A] rounded-lg">
                      <div className="flex items-center gap-3">
                        <Dumbbell className="w-5 h-5 text-[#FF4D4D]" />
                        <div>
                          <p className="font-medium">{exercise.name}</p>
                          <p className="text-xs text-[#A1A1A1]">{exercise.duration || `${exercise.sets} sets`}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#A1A1A1]" />
                        <span className="text-xs text-[#A1A1A1]">
                          {new Date(exercise.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Exercise Modal */}
          <ExerciseModal
            isOpen={isExerciseModalOpen}
            onClose={() => setIsExerciseModalOpen(false)}
            onSave={handleSaveExercise}
            exercises={[...recommendationData.exercise.cardio, ...recommendationData.exercise.strength]}
            type="Exercise"
          />
        </>
      )}

      {/* Yoga Plan */}
      {activeTab === "yoga" && (
        <>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Daily Yoga Routine</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[#A1A1A1]">
                  This 15-minute routine is designed to improve flexibility and reduce stress.
                </p>

                <div className="space-y-3 mt-4">
                  {recommendationData.exercise.yoga.map((pose, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-[#2A2D3A] rounded-lg">
                      <div>
                        <p className="font-medium">{pose.name}</p>
                        <p className="text-sm text-[#A1A1A1]">{pose.duration}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleViewExercise(pose)}>
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="primary" className="w-full" onClick={handleStartYoga}>
                  Start Yoga Session
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-l-4 border-l-[#06B6D4]">
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <Yoga className="w-6 h-6 text-[#06B6D4] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[#E4E4E4]">
                      "Yoga is not about touching your toes, it's about what you learn on the way down."
                    </p>
                    <p className="text-[#A1A1A1] text-sm mt-2">Yoga Wisdom</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Yoga Modal */}
          <ExerciseModal
            isOpen={isYogaModalOpen}
            onClose={() => setIsYogaModalOpen(false)}
            onSave={handleSaveExercise}
            exercises={recommendationData.exercise.yoga}
            type="Yoga"
          />
        </>
      )}

      {/* Individual Exercise/Yoga View Modal */}
      {selectedExercise && (
        <ExerciseModal
          isOpen={!!selectedExercise}
          onClose={() => setSelectedExercise(null)}
          onSave={handleSaveExercise}
          exercises={[selectedExercise]}
          type={selectedExercise.name.includes("Pose") ? "Yoga" : "Exercise"}
        />
      )}

      {/* Meal Log Modal */}
      {selectedMeal && (
        <MealLogModal
          isOpen={mealLogModalOpen}
          onClose={() => setMealLogModalOpen(false)}
          onSave={handleSaveMeal}
          meal={selectedMeal}
        />
      )}
    </div>
  )
}

