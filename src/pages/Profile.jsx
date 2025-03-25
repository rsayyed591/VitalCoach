"use client"

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
  Target,
  Zap,
  CheckCircle,
  Gift,
  Edit,
  Save,
} from "lucide-react"
import { MedicalFormModal } from "../components/MedicalFormModal"
import { Dialog } from "../components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

// Dummy data for demonstration
const initialProfileData = {
  name: "Vivek Chouhan",
  age: 22,
  height: 175,
  weight: 80,
  streak: 28,
  tokens: 65,
  achievements: [
    {
      name: "Step Master",
      description: "Walked 10,000 steps for 7 days in a row",
      icon: "footprints",
      completed: true,
      tokens: 10,
    },
    {
      name: "Early Bird",
      description: "Logged activity before 8 AM for 5 days",
      icon: "sun",
      completed: true,
      tokens: 5,
    },
    {
      name: "Hydration Hero",
      description: "Drank 2.5L of water for 10 days",
      icon: "droplets",
      completed: false,
      progress: 70,
      tokens: 15,
    },
    {
      name: "Sleep Champion",
      description: "8+ hours of sleep for 5 days in a row",
      icon: "moon",
      completed: false,
      progress: 40,
      tokens: 10,
    },
    {
      name: "Workout Warrior",
      description: "Completed 20 workouts",
      icon: "dumbbell",
      completed: true,
      tokens: 20,
    },
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
  const [tokens, setTokens] = useState(initialProfileData.tokens)
  const [showReward, setShowReward] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editedProfile, setEditedProfile] = useState({
    name: initialProfileData.name,
    age: initialProfileData.age,
    height: initialProfileData.height,
    weight: initialProfileData.weight,
    bio: "Fitness enthusiast focused on holistic health improvement.",
  })
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  // Simulate dynamic streak and tokens
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly increase streak (10% chance)
      if (Math.random() < 0.1) {
        setStreakCount((prev) => prev + 1)

        // Add tokens for streak milestone
        if ((streakCount + 1) % 5 === 0) {
          addTokens(5)
        }
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [streakCount])

  const addTokens = (amount) => {
    const newTokens = tokens + amount
    setTokens(newTokens)

    // Check if tokens reached 100
    if (newTokens >= 100 && tokens < 100) {
      setShowReward(true)
    }
  }

  const handleShareProgress = () => {
    alert("Sharing your progress to social media!")
  }

  const handleUpdateMedicalHistory = (updatedData) => {
    setProfileData((prev) => ({
      ...prev,
      medicalHistory: updatedData,
    }))

    // Add tokens for updating medical info
    addTokens(5)
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

      // Add tokens for completing achievement
      addTokens(updatedAchievements[index].tokens)
    }
  }

  const incrementAchievementProgress = (index, amount = 10) => {
    const updatedAchievements = [...profileData.achievements]
    if (!updatedAchievements[index].completed) {
      const newProgress = Math.min(100, (updatedAchievements[index].progress || 0) + amount)
      updatedAchievements[index].progress = newProgress

      if (newProgress >= 100) {
        updatedAchievements[index].completed = true
        // Add tokens for completing achievement
        addTokens(updatedAchievements[index].tokens)
      } else {
        // Add a small amount of tokens for progress
        addTokens(1)
      }

      setProfileData((prev) => ({
        ...prev,
        achievements: updatedAchievements,
      }))
    }
  }

  const handleSaveProfile = () => {
    setProfileData((prev) => ({
      ...prev,
      name: editedProfile.name,
      age: editedProfile.age,
      height: editedProfile.height,
      weight: editedProfile.weight,
    }))
    setIsEditingProfile(false)

    // Add tokens for updating profile
    addTokens(3)
  }

  const handleClaimReward = () => {
    setShowReward(false)
    setTokens(tokens - 100)

    // In a real app, you would trigger some reward mechanism here
    alert("Congratulations! You've claimed your reward!")
  }

  return (
    <div className="space-y-6 page-transition">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-[#A1A1A1]">Your health journey and achievements</p>
      </header>

      {/* Profile Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#2A2D3A] flex items-center justify-center text-xl font-bold">
                {profileData.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{profileData.name}</h2>
                  <Button variant="outline" size="sm" className="h-7 px-2" onClick={() => setIsEditingProfile(true)}>
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                </div>
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

                  <Button variant="outline" size="sm" className="h-7 px-2" onClick={() => setIsSettingsOpen(true)}>
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Token Progress Bar */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Tokens</p>
                <p className="text-sm font-medium">{tokens}/100</p>
              </div>
              <Progress value={tokens} max={100} className="h-2" />
              <p className="text-xs text-[#A1A1A1]">
                Earn tokens by completing activities and achievements. Redeem 100 tokens for rewards!
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

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
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="flex flex-col items-center justify-center p-4">
                <Trophy className="w-8 h-8 text-[#16A34A] mb-2" />
                <p className="text-xs text-[#A1A1A1]">Achievements</p>
                <p className="text-xl font-bold">{profileData.achievements.filter((a) => a.completed).length}</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="flex flex-col items-center justify-center p-4">
                <Gift className="w-8 h-8 text-[#06B6D4] mb-2" />
                <p className="text-xs text-[#A1A1A1]">Tokens</p>
                <p className="text-xl font-bold">{tokens}</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card className="flex flex-col items-center justify-center p-4">
                <Target className="w-8 h-8 text-[#FF4D4D] mb-2" />
                <p className="text-xs text-[#A1A1A1]">Goals</p>
                <p className="text-xl font-bold">5</p>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" /> Achievements
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
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Gift className="w-3 h-3" /> {achievement.tokens}
                          </Badge>
                          {achievement.completed ? (
                            <CheckCircle className="w-5 h-5 text-[#16A34A]" />
                          ) : (
                            <Badge variant="default">{achievement.progress}%</Badge>
                          )}
                        </div>
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
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
          </motion.div>
        </>
      )}

      {/* Medical History */}
      {activeTab === "medical" && (
        <>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button variant="primary" className="w-full" onClick={() => setIsMedicalFormOpen(true)}>
              Update Medical History
            </Button>
          </motion.div>

          <MedicalFormModal
            isOpen={isMedicalFormOpen}
            onClose={() => setIsMedicalFormOpen(false)}
            onSave={handleUpdateMedicalHistory}
            initialData={profileData.medicalHistory}
          />
        </>
      )}

      {/* Edit Profile Modal */}
      <Dialog isOpen={isEditingProfile} onClose={() => setIsEditingProfile(false)} title="Edit Profile">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-[#A1A1A1]">Name</label>
            <input
              type="text"
              value={editedProfile.name}
              onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
              className="w-full bg-[#2A2D3A] text-[#E4E4E4] border-none rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#16A34A]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#A1A1A1]">Bio</label>
            <textarea
              value={editedProfile.bio}
              onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
              className="w-full bg-[#2A2D3A] text-[#E4E4E4] border-none rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#16A34A] min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-[#A1A1A1]">Age</label>
              <input
                type="number"
                value={editedProfile.age}
                onChange={(e) => setEditedProfile({ ...editedProfile, age: Number.parseInt(e.target.value) || 0 })}
                className="w-full bg-[#2A2D3A] text-[#E4E4E4] border-none rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#16A34A]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[#A1A1A1]">Height (cm)</label>
              <input
                type="number"
                value={editedProfile.height}
                onChange={(e) => setEditedProfile({ ...editedProfile, height: Number.parseInt(e.target.value) || 0 })}
                className="w-full bg-[#2A2D3A] text-[#E4E4E4] border-none rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#16A34A]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[#A1A1A1]">Weight (kg)</label>
              <input
                type="number"
                value={editedProfile.weight}
                onChange={(e) => setEditedProfile({ ...editedProfile, weight: Number.parseInt(e.target.value) || 0 })}
                className="w-full bg-[#2A2D3A] text-[#E4E4E4] border-none rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#16A34A]"
              />
            </div>
          </div>

          <div className="pt-2 flex gap-2 justify-end">
            <Button
              type="button"
              variant="default"
              onClick={() => setIsEditingProfile(false)}
              className="bg-[#2A2D3A] hover:bg-[#3A3D4A]"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleSaveProfile}
              className="bg-[#16A34A] hover:bg-[#16A34A]/80"
            >
              <Save className="w-4 h-4 mr-2" /> Save Profile
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Settings Modal */}
      <Dialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title="Settings">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">App Preferences</label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Dark Mode</span>
                <div className="w-10 h-5 bg-[#2A2D3A] rounded-full relative">
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-[#16A34A]"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Notifications</span>
                <div className="w-10 h-5 bg-[#2A2D3A] rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-[#A1A1A1]"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Activity Reminders</span>
                <div className="w-10 h-5 bg-[#2A2D3A] rounded-full relative">
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-[#16A34A]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Privacy</label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Share Activity Data</span>
                <div className="w-10 h-5 bg-[#2A2D3A] rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-[#A1A1A1]"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Allow Data Analytics</span>
                <div className="w-10 h-5 bg-[#2A2D3A] rounded-full relative">
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-[#16A34A]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button variant="outline" className="w-full">
              Sign Out
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Reward Modal */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowReward(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-[#1E1E1E] border border-[#2A2D3A] rounded-lg shadow-lg w-full max-w-md mx-4 p-6"
            >
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#16A34A]/20 flex items-center justify-center">
                    <Gift className="w-10 h-10 text-[#16A34A]" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
                <p className="text-[#A1A1A1] mb-4">You've earned 100 tokens! Claim your reward now.</p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" onClick={() => setShowReward(false)}>
                    Later
                  </Button>
                  <Button variant="primary" onClick={handleClaimReward}>
                    Claim Reward
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

