import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
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
  Save,
  Crown,
  MoreVertical,
  Bell,
  LogOut,
  User,
  FileText,
  HelpCircle,
  Shield,
  Download,
  Smartphone,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { MedicalFormModal } from "../components/MedicalFormModal"
import { Dialog } from "../components/ui/modal2"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

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
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("achievements")
  const [profileData, setProfileData] = useState(initialProfileData)
  const [isMedicalFormOpen, setIsMedicalFormOpen] = useState(false)
  const [streakCount, setStreakCount] = useState(initialProfileData.streak)
  const [tokens, setTokens] = useState(initialProfileData.tokens)
  const [showReward, setShowReward] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false)
  const [isNoticesModalOpen, setIsNoticesModalOpen] = useState(false)
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  const [isDevicesModalOpen, setIsDevicesModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [editedProfile, setEditedProfile] = useState({
    name: initialProfileData.name,
    age: initialProfileData.age,
    height: initialProfileData.height,
    weight: initialProfileData.weight,
    bio: "Fitness enthusiast focused on holistic health improvement.",
  })
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [navbarStyle, setNavbarStyle] = useState(() => {
    return localStorage.getItem("navbarStyle") || "icons-labels"
  })
  const [isSigningOut, setIsSigningOut] = useState(false)

  // Hide chat bot when modal is open
  useEffect(() => {
    const chatBot = document.querySelector(".fixed.bottom-20.right-4.z-50")
    if (chatBot) {
      if (
        isEditingProfile ||
        isMedicalFormOpen ||
        showReward ||
        isPremiumModalOpen ||
        isSettingsOpen ||
        isNoticesModalOpen ||
        isHelpModalOpen ||
        isPrivacyModalOpen ||
        isDevicesModalOpen ||
        isExportModalOpen
      ) {
        chatBot.style.display = "none"
      } else {
        chatBot.style.display = "block"
      }
    }

    return () => {
      if (chatBot) {
        chatBot.style.display = "block"
      }
    }
  }, [
    isEditingProfile,
    isMedicalFormOpen,
    showReward,
    isPremiumModalOpen,
    isSettingsOpen,
    isNoticesModalOpen,
    isHelpModalOpen,
    isPrivacyModalOpen,
    isDevicesModalOpen,
    isExportModalOpen,
  ])

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

  const handleChangeNavbarStyle = (style) => {
    setNavbarStyle(style)
    localStorage.setItem("navbarStyle", style)
    setIsSettingsOpen(false)
  }

  const handleSignOut = () => {
    setIsSigningOut(true)

    // Simulate sign out process
    setTimeout(() => {
      // Clear any stored user data
      sessionStorage.clear()
      localStorage.removeItem("user")

      // Redirect to auth page
      navigate("/auth")
    }, 1500)
  }

  const handleOpenHelp = () => {
    setIsHelpModalOpen(true)
  }

  const handleOpenPrivacy = () => {
    setIsPrivacyModalOpen(true)
  }

  const handleOpenDevices = () => {
    setIsDevicesModalOpen(true)
  }

  const handleOpenExport = () => {
    setIsExportModalOpen(true)
  }

  return (
    <div className="space-y-4 page-transition pb-20">
      <header className="mb-2">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-[#A1A1A1]">Your health journey and achievements</p>
      </header>

      {/* Profile Card */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            {/* Top-right menu and premium icon */}
            <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsPremiumModalOpen(true)}>
                <Crown className="w-5 h-5 text-gray-400 hover:text-yellow-400 transition-colors" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-[#1E1E1E] border-[#2A2D3A] text-[#E4E4E4]">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#2A2D3A]" />
                  <DropdownMenuItem
                    onClick={() => setIsEditingProfile(true)}
                    className="hover:bg-[#2A2D3A] cursor-pointer"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Edit Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setIsMedicalFormOpen(true)}
                    className="hover:bg-[#2A2D3A] cursor-pointer"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Medical History</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setIsSettingsOpen(true)}
                    className="hover:bg-[#2A2D3A] cursor-pointer"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setIsNoticesModalOpen(true)}
                    className="hover:bg-[#2A2D3A] cursor-pointer"
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notices</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#2A2D3A]" />
                  <DropdownMenuItem onClick={handleOpenHelp} className="hover:bg-[#2A2D3A] cursor-pointer">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleOpenPrivacy} className="hover:bg-[#2A2D3A] cursor-pointer">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Privacy & Security</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleOpenDevices} className="hover:bg-[#2A2D3A] cursor-pointer">
                    <Smartphone className="mr-2 h-4 w-4" />
                    <span>Connected Devices</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleOpenExport} className="hover:bg-[#2A2D3A] cursor-pointer">
                    <Download className="mr-2 h-4 w-4" />
                    <span>Export Data</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#2A2D3A]" />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="hover:bg-[#2A2D3A] text-[#FF4D4D] cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Profile Header */}
            <div className="flex items-center p-4 pt-6">
              {/* <div className="w-20 h-20 rounded-full bg-[#2A2D3A] flex items-center justify-center text-xl font-bold">
                {profileData.name.charAt(0)}
              </div> */}
              <img src="/pfp.png" alt="pfp" className="w-20 h-20 rounded-full bg-[#2A2D3A] flex items-center justify-center text-xl font-bold" />
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">{profileData.name}</h2>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                      <p className="text-[#A1A1A1] text-sm flex items-center">
                        <span className="w-16">Age:</span>
                        <span className="font-medium text-white">{profileData.age} years</span>
                      </p>
                      <p className="text-[#A1A1A1] text-sm flex items-center">
                        <span className="w-16">Height:</span>
                        <span className="font-medium text-white">{profileData.height} cm</span>
                      </p>
                      <p className="text-[#A1A1A1] text-sm flex items-center">
                        <span className="w-16">Weight:</span>
                        <span className="font-medium text-white">{profileData.weight} kg</span>
                      </p>
                      <p className="text-[#A1A1A1] text-sm flex items-center">
                        <span className="w-16">Streak:</span>
                        <span className="font-medium text-white">{streakCount} days</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Streak Badge */}
            <div className="flex justify-between items-center px-4 pb-2">
              <Badge variant="success" className="bg-[#16A34A]/20 text-[#16A34A] px-3 py-1">
                <Flame className="w-4 h-4 mr-1" />
                {streakCount} Day Streak
              </Badge>

              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={handleShareProgress}>
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Token Progress - Circular */}
            <div className="px-4 pb-4 flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm mb-1">Tokens</p>
                <p className="text-xs text-[#A1A1A1]">
                  Earn tokens by completing activities and achievements. Redeem 100 tokens for rewards!
                </p>
              </div>
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#2A2D3A" strokeWidth="10" />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={2 * Math.PI * 45 * (1 - tokens / 100)}
                    transform="rotate(-90 50 50)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#16A34A" />
                      <stop offset="50%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#6366F1" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-lg font-bold">{tokens}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs with horizontal scrolling */}
      <div className="flex gap-2 bg-[#1E1E1E] p-1 rounded-lg overflow-x-auto hide-scrollbar">
        <Button
          variant={activeTab === "achievements" ? "primary" : "ghost"}
          className={`flex-1 ${activeTab === "achievements" ? "bg-[#16A34A]" : ""}`}
          onClick={() => setActiveTab("achievements")}
        >
          Achievements
        </Button>
        <Button
          variant={activeTab === "medical" ? "primary" : "ghost"}
          className={`flex-1 ${activeTab === "medical" ? "bg-[#16A34A]" : ""}`}
          onClick={() => setActiveTab("medical")}
        >
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
              <p className="text-xl font-bold">3</p>
            </Card>

            <Card className="flex flex-col items-center justify-center p-4">
              <Gift className="w-8 h-8 text-[#06B6D4] mb-2" />
              <p className="text-xs text-[#A1A1A1]">Tokens</p>
              <p className="text-xl font-bold">{tokens}</p>
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
            <label className="text-sm font-medium">Navigation Bar Style</label>
            <div className="space-y-3 mt-2">
              <div
                className={`p-3 rounded-lg border ${navbarStyle === "icons-only" ? "border-[#16A34A] bg-[#16A34A]/10" : "border-[#2A2D3A]"}`}
                onClick={() => handleChangeNavbarStyle("icons-only")}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">Icons Only</span>
                  {navbarStyle === "icons-only" && <CheckCircle className="w-4 h-4 text-[#16A34A]" />}
                </div>
                <p className="text-xs text-[#A1A1A1] mt-1">Display only icons in the navigation bar</p>
              </div>

              <div
                className={`p-3 rounded-lg border ${navbarStyle === "icons-labels" ? "border-[#16A34A] bg-[#16A34A]/10" : "border-[#2A2D3A]"}`}
                onClick={() => handleChangeNavbarStyle("icons-labels")}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">Icons + Labels</span>
                  {navbarStyle === "icons-labels" && <CheckCircle className="w-4 h-4 text-[#16A34A]" />}
                </div>
                <p className="text-xs text-[#A1A1A1] mt-1">Display icons and labels in the navigation bar</p>
              </div>

              <div
                className={`p-3 rounded-lg border ${navbarStyle === "minimal" ? "border-[#16A34A] bg-[#16A34A]/10" : "border-[#2A2D3A]"}`}
                onClick={() => handleChangeNavbarStyle("minimal")}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">Minimal Floating</span>
                  {navbarStyle === "minimal" && <CheckCircle className="w-4 h-4 text-[#16A34A]" />}
                </div>
                <p className="text-xs text-[#A1A1A1] mt-1">Display a minimal floating navigation button</p>
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
            <Button variant="outline" className="w-full" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Notices Modal */}
      <Dialog isOpen={isNoticesModalOpen} onClose={() => setIsNoticesModalOpen(false)} title="Notices">
        <div className="space-y-4">
          <div className="bg-[#2A2D3A] rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#16A34A]/20 flex items-center justify-center flex-shrink-0">
                <Bell className="w-4 h-4 text-[#16A34A]" />
              </div>
              <div>
                <h3 className="font-medium">New Features Available</h3>
                <p className="text-sm text-[#A1A1A1] mt-1">
                  We've added new features to help you track your health better. Check out the new sleep tracking and
                  nutrition analysis tools!
                </p>
                <p className="text-xs text-[#A1A1A1] mt-2">2 days ago</p>
              </div>
            </div>
          </div>

          <div className="bg-[#2A2D3A] rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#06B6D4]/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-[#06B6D4]" />
              </div>
              <div>
                <h3 className="font-medium">Privacy Policy Update</h3>
                <p className="text-sm text-[#A1A1A1] mt-1">
                  We've updated our privacy policy to better protect your data. Please review the changes.
                </p>
                <p className="text-xs text-[#A1A1A1] mt-2">1 week ago</p>
              </div>
            </div>
          </div>

          <div className="bg-[#2A2D3A] rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FF4D4D]/20 flex items-center justify-center flex-shrink-0">
                <Award className="w-4 h-4 text-[#FF4D4D]" />
              </div>
              <div>
                <h3 className="font-medium">New Achievement Unlocked</h3>
                <p className="text-sm text-[#A1A1A1] mt-1">
                  You've unlocked the "Early Adopter" achievement for being one of our first users!
                </p>
                <p className="text-xs text-[#A1A1A1] mt-2">2 weeks ago</p>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Help & Support Modal */}
      <Dialog isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} title="Help & Support">
        <div className="space-y-4">
          <div className="bg-[#2A2D3A] rounded-lg p-4">
            <h3 className="font-medium mb-2">Frequently Asked Questions</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium">How do I track my steps?</h4>
                <p className="text-xs text-[#A1A1A1] mt-1">
                  Your steps are tracked automatically when you carry your phone with you. Make sure to enable motion
                  permissions.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium">How accurate is the sleep tracking?</h4>
                <p className="text-xs text-[#A1A1A1] mt-1">
                  Sleep tracking uses a combination of phone usage patterns and motion detection. For best results, keep
                  your phone near your bed.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Can I connect other fitness devices?</h4>
                <p className="text-xs text-[#A1A1A1] mt-1">
                  Yes, you can connect compatible fitness trackers and smartwatches in the Connected Devices section.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#2A2D3A] rounded-lg p-4">
            <h3 className="font-medium mb-2">Contact Support</h3>
            <p className="text-sm text-[#A1A1A1] mb-3">Need more help? Our support team is available 24/7.</p>
            <Button variant="primary" className="w-full">
              Contact Support
            </Button>
          </div>

          <div className="bg-[#2A2D3A] rounded-lg p-4">
            <h3 className="font-medium mb-2">App Information</h3>
            <div className="space-y-1">
              <p className="text-xs text-[#A1A1A1] flex justify-between">
                <span>Version</span>
                <span className="text-white">1.2.3</span>
              </p>
              <p className="text-xs text-[#A1A1A1] flex justify-between">
                <span>Build</span>
                <span className="text-white">2023.10.15</span>
              </p>
              <p className="text-xs text-[#A1A1A1] flex justify-between">
                <span>Device ID</span>
                <span className="text-white">ABCD1234</span>
              </p>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Privacy & Security Modal */}
      <Dialog isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} title="Privacy & Security">
        <div className="space-y-4">
          <div className="bg-[#2A2D3A] rounded-lg p-4">
            <h3 className="font-medium mb-2">Data Privacy</h3>
            <p className="text-sm text-[#A1A1A1] mb-3">Control how your data is used and shared.</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Share Health Data</span>
                <div className="w-10 h-5 bg-[#1E1E1E] rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-[#A1A1A1]"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Allow Analytics</span>
                <div className="w-10 h-5 bg-[#1E1E1E] rounded-full relative">
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-[#16A34A]"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Personalized Ads</span>
                <div className="w-10 h-5 bg-[#1E1E1E] rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-[#A1A1A1]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#2A2D3A] rounded-lg p-4">
            <h3 className="font-medium mb-2">Security</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" /> Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Smartphone className="w-4 h-4 mr-2" /> Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <LogOut className="w-4 h-4 mr-2" /> Sign Out from All Devices
              </Button>
            </div>
          </div>

          <div className="bg-[#2A2D3A] rounded-lg p-4">
            <h3 className="font-medium mb-2">Legal</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start p-0 h-auto hover:bg-transparent">
                <span className="text-sm text-[#A1A1A1] hover:text-white transition-colors">Privacy Policy</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto hover:bg-transparent">
                <span className="text-sm text-[#A1A1A1] hover:text-white transition-colors">Terms of Service</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto hover:bg-transparent">
                <span className="text-sm text-[#A1A1A1] hover:text-white transition-colors">Data Deletion Request</span>
              </Button>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Connected Devices Modal */}
      <Dialog isOpen={isDevicesModalOpen} onClose={() => setIsDevicesModalOpen(false)} title="Connected Devices">
        <div className="space-y-4">
          <div className="bg-[#2A2D3A] rounded-lg p-4">
            <h3 className="font-medium mb-3">Current Device</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#16A34A]/20 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-[#16A34A]" />
              </div>
              <div>
                <p className="text-sm font-medium">iPhone 13 Pro</p>
                <p className="text-xs text-[#A1A1A1]">Last active: Just now</p>
              </div>
              <Badge className="ml-auto">Current</Badge>
            </div>
          </div>

          <div className="bg-[#2A2D3A] rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Connected Wearables</h3>
              <Button variant="outline" size="sm">
                Add Device
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#06B6D4]/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#06B6D4]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Fitbit Charge 5</p>
                  <p className="text-xs text-[#A1A1A1]">Connected: Oct 15, 2023</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FF4D4D]/20 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#FF4D4D]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Apple Watch Series 8</p>
                  <p className="text-xs text-[#A1A1A1]">Connected: Sep 5, 2023</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-[#2A2D3A] rounded-lg p-4">
            <h3 className="font-medium mb-2">Other Devices</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#A1A1A1]/20 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-[#A1A1A1]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">iPad Pro</p>
                  <p className="text-xs text-[#A1A1A1]">Last active: 3 days ago</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#FF4D4D] border-[#FF4D4D]/20 hover:bg-[#FF4D4D]/10"
                >
                  Sign Out
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#A1A1A1]/20 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-[#A1A1A1]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">MacBook Pro</p>
                  <p className="text-xs text-[#A1A1A1]">Last active: 1 week ago</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#FF4D4D] border-[#FF4D4D]/20 hover:bg-[#FF4D4D]/10"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Export Data Modal */}
      <Dialog isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} title="Export Data">
        <div className="space-y-4">
          <div className="bg-[#2A2D3A] rounded-lg p-4">
            <h3 className="font-medium mb-2">Export Options</h3>
            <p className="text-sm text-[#A1A1A1] mb-3">Select the data you want to export and the format.</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="health-data"
                  className="rounded bg-[#1E1E1E] border-[#A1A1A1] text-[#16A34A]"
                  defaultChecked
                />
                <label htmlFor="health-data" className="text-sm">
                  Health Data
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="activity-logs"
                  className="rounded bg-[#1E1E1E] border-[#A1A1A1] text-[#16A34A]"
                  defaultChecked
                />
                <label htmlFor="activity-logs" className="text-sm">
                  Activity Logs
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="achievements"
                  className="rounded bg-[#1E1E1E] border-[#A1A1A1] text-[#16A34A]"
                  defaultChecked
                />
                <label htmlFor="achievements" className="text-sm">
                  Achievements
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="medical-history"
                  className="rounded bg-[#1E1E1E] border-[#A1A1A1] text-[#16A34A]"
                />
                <label htmlFor="medical-history" className="text-sm">
                  Medical History
                </label>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <label className="text-sm block mb-1">Format</label>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-[#16A34A]/10 border-[#16A34A]">
                  CSV
                </Button>
                <Button variant="outline" className="flex-1">
                  JSON
                </Button>
                <Button variant="outline" className="flex-1">
                  PDF
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm block mb-1">Date Range</label>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-[#16A34A]/10 border-[#16A34A]">
                  All Time
                </Button>
                <Button variant="outline" className="flex-1">
                  Last Month
                </Button>
                <Button variant="outline" className="flex-1">
                  Custom
                </Button>
              </div>
            </div>
          </div>

          <Button variant="primary" className="w-full">
            <Download className="w-4 h-4 mr-2" /> Export Data
          </Button>

          <p className="text-xs text-[#A1A1A1] text-center">
            Your data will be exported and sent to your registered email address.
          </p>
        </div>
      </Dialog>

      {/* Premium Modal */}
      <Dialog isOpen={isPremiumModalOpen} onClose={() => setIsPremiumModalOpen(false)} title="Premium Features">
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Crown className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <h3 className="text-lg font-bold text-center">You are using the free tier</h3>
          <p className="text-center text-[#A1A1A1]">Upgrade to premium to unlock additional features!</p>

          <div className="bg-[#2A2D3A] rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Advanced Analytics</h4>
                <p className="text-sm text-[#A1A1A1]">
                  Get deeper insights into your health data with advanced charts and trends.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Personalized Insights</h4>
                <p className="text-sm text-[#A1A1A1]">
                  Receive AI-powered recommendations tailored to your health goals.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Priority Support</h4>
                <p className="text-sm text-[#A1A1A1]">Get faster responses from our dedicated support team.</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Ad-Free Experience</h4>
                <p className="text-sm text-[#A1A1A1]">Enjoy the app without any advertisements.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setIsPremiumModalOpen(false)}>
              Close
            </Button>
            <Button variant="primary" className="flex-1 bg-yellow-500 hover:bg-yellow-600">
              Upgrade Now
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

      {/* Sign Out Confirmation */}
      <AnimatePresence>
        {isSigningOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1E1E1E] rounded-lg p-6 flex flex-col items-center max-w-xs mx-4"
            >
              <LogOut className="w-12 h-12 text-[#FF4D4D] mb-4" />
              <h3 className="text-lg font-bold mb-2">Signing Out...</h3>
              <p className="text-[#A1A1A1] text-center mb-4">Please wait while we securely sign you out.</p>
              <div className="w-8 h-8 border-2 border-[#16A34A] border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

