import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import {
  Award,
  Calendar,
  Share2,
  Settings,
  Heart,
  Flame,
  Droplets,
  Moon,
  Trophy,
  Medal,
  Target,
  Zap,
  CheckCircle,
} from "lucide-react"
import { MedicalFormModal } from "../components/MedicalFormModal"

// Dummy data for demonstration
const initialProfileData = {
  name: "Vivek Chouhan",
  age: 22,
  height: 175,
  weight: 80,
  streak: 28,
  achievements: [
    {
      name: "Step Master",
      description: "Walked 10,000 steps for 7 days in a row",
      icon: "footprints",
      completed: true,
    },
    { name: "Early Bird", description: "Logged activity before 8 AM for 5 days", icon: "sun", completed: true },
    {
      name: "Hydration Hero",
      description: "Drank 2.5L of water for 10 days",
      icon: "droplets",
      completed: false,
      progress: 70,
    },
    {
      name: "Sleep Champion",
      description: "8+ hours of sleep for 5 days in a row",
      icon: "moon",
      completed: false,
      progress: 40,
    },
    { name: "Workout Warrior", description: "Completed 20 workouts", icon: "dumbbell", completed: true },
  ],
  medicalHistory: {
    conditions: ["Mild hypertension"],
    allergies: ["Peanuts"],
    medications: ["Lisinopril 10mg"],
  },
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState("achievements")
  const [profileData, setProfileData] = useState(initialProfileData)
  const [isMedicalFormOpen, setIsMedicalFormOpen] = useState(false)
  const [streakCount, setStreakCount] = useState(initialProfileData.streak)

  // Simulate dynamic streak
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly increase streak (10% chance)
      if (Math.random() < 0.1) {
        setStreakCount((prev) => prev + 1)
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleShareProgress = () => {
    alert("Sharing your progress to social media!")
  }

  const handleUpdateMedicalHistory = (updatedData) => {
    setProfileData((prev) => ({
      ...prev,
      medicalHistory: updatedData,
    }))
  }

  const completeAchievement = (index) => {
    const updatedAchievements = [...profileData.achievements]
    if (!updatedAchievements[index].completed) {
      updatedAchievements[index].progress = 100
      updatedAchievements[index].completed = true

      setProfileData((prev) => ({
        ...prev,
        achievements: updatedAchievements,
      }))
    }
  }

  const incrementAchievementProgress = (index, amount = 10) => {
    const updatedAchievements = [...profileData.achievements]
    if (!updatedAchievements[index].completed) {
      const newProgress = Math.min(100, (updatedAchievements[index].progress || 0) + amount)
      updatedAchievements[index].progress = newProgress

      if (newProgress >= 100) {
        updatedAchievements[index].completed = true
      }

      setProfileData((prev) => ({
        ...prev,
        achievements: updatedAchievements,
      }))
    }
  }

  return (
    <div className="space-y-6 page-transition">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-[#A1A1A1]">Your health journey and achievements</p>
      </header>

      {/* Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#2A2D3A] flex items-center justify-center text-xl font-bold">
              {profileData.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold">{profileData.name}</h2>
              <p className="text-[#A1A1A1]">
                {profileData.age} years • {profileData.height}cm • {profileData.weight}kg
              </p>

              <div className="flex items-center mt-2 gap-2">
                <Badge variant="success" className="flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  {streakCount} Day Streak
                </Badge>

                <Button variant="outline" size="sm" className="h-7 px-2" onClick={handleShareProgress}>
                  <Share2 className="w-4 h-4 mr-1" /> Share
                </Button>

                <Button variant="outline" size="sm" className="h-7 px-2">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "achievements" ? "primary" : "default"}
          onClick={() => setActiveTab("achievements")}
        >
          Achievements
        </Button>
        <Button variant={activeTab === "medical" ? "primary" : "default"} onClick={() => setActiveTab("medical")}>
          Medical History
        </Button>
      </div>

      {/* Achievements */}
      {activeTab === "achievements" && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <Card className="flex flex-col items-center justify-center p-4">
              <Trophy className="w-8 h-8 text-[#16A34A] mb-2" />
              <p className="text-xs text-[#A1A1A1]">Achievements</p>
              <p className="text-xl font-bold">{profileData.achievements.filter((a) => a.completed).length}</p>
            </Card>

            <Card className="flex flex-col items-center justify-center p-4">
              <Medal className="w-8 h-8 text-[#06B6D4] mb-2" />
              <p className="text-xs text-[#A1A1A1]">Badges</p>
              <p className="text-xl font-bold">8</p>
            </Card>

            <Card className="flex flex-col items-center justify-center p-4">
              <Target className="w-8 h-8 text-[#FF4D4D] mb-2" />
              <p className="text-xs text-[#A1A1A1]">Goals</p>
              <p className="text-xl font-bold">5</p>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" /> Achievements & Badges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.completed ? "bg-[#16A34A]" : "bg-[#2A2D3A]"}`}
                  >
                    {achievement.icon === "footprints" && <Zap className="w-5 h-5" />}
                    {achievement.icon === "sun" && <Flame className="w-5 h-5" />}
                    {achievement.icon === "droplets" && <Droplets className="w-5 h-5" />}
                    {achievement.icon === "moon" && <Moon className="w-5 h-5" />}
                    {achievement.icon === "dumbbell" && <Trophy className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{achievement.name}</h3>
                      {achievement.completed ? (
                        <CheckCircle className="w-5 h-5 text-[#16A34A]" />
                      ) : (
                        <Badge variant="default">{achievement.progress}%</Badge>
                      )}
                    </div>
                    <p className="text-sm text-[#A1A1A1]">{achievement.description}</p>
                    {!achievement.completed && (
                      <>
                        <Progress value={achievement.progress} max={100} className="mt-2" />
                        <div className="mt-2 flex justify-end">
                          <Button variant="outline" size="sm" onClick={() => incrementAchievementProgress(index)}>
                            Progress
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" /> Activity Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-1 mt-2">
                {Array.from({ length: 30 }).map((_, index) => {
                  const isActive = index < streakCount
                  const isToday = index === streakCount - 1

                  return (
                    <div
                      key={index}
                      className={`h-8 flex-1 rounded-sm ${
                        isToday
                          ? "bg-[#16A34A] ring-2 ring-offset-2 ring-offset-[#121212] ring-[#16A34A]"
                          : isActive
                            ? "bg-[#16A34A]"
                            : "bg-[#2A2D3A]"
                      }`}
                    />
                  )
                })}
              </div>

              <div className="flex justify-between mt-2 text-xs text-[#A1A1A1]">
                <span>1</span>
                <span>10</span>
                <span>20</span>
                <span>30</span>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm">
                  You're on a <span className="font-bold text-[#16A34A]">{streakCount} day streak</span>! Keep it up!
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Medical History */}
      {activeTab === "medical" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-[#FF4D4D]" /> Medical Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profileData.medicalHistory.conditions.length > 0 ? (
                <ul className="space-y-2">
                  {profileData.medicalHistory.conditions.map((condition, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Badge variant="danger" className="w-2 h-2 p-0 rounded-full" />
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#A1A1A1]">No medical conditions recorded.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Allergies</CardTitle>
            </CardHeader>
            <CardContent>
              {profileData.medicalHistory.allergies.length > 0 ? (
                <ul className="space-y-2">
                  {profileData.medicalHistory.allergies.map((allergy, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Badge variant="warning" className="w-2 h-2 p-0 rounded-full" />
                      <span>{allergy}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#A1A1A1]">No allergies recorded.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medications</CardTitle>
            </CardHeader>
            <CardContent>
              {profileData.medicalHistory.medications.length > 0 ? (
                <ul className="space-y-2">
                  {profileData.medicalHistory.medications.map((medication, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Badge variant="info" className="w-2 h-2 p-0 rounded-full" />
                      <span>{medication}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#A1A1A1]">No medications recorded.</p>
              )}
            </CardContent>
          </Card>

          <Button variant="primary" className="w-full" onClick={() => setIsMedicalFormOpen(true)}>
            Update Medical History
          </Button>

          <MedicalFormModal
            isOpen={isMedicalFormOpen}
            onClose={() => setIsMedicalFormOpen(false)}
            onSave={handleUpdateMedicalHistory}
            initialData={profileData.medicalHistory}
          />
        </>
      )}
    </div>
  )
}

