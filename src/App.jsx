import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MobileNav } from "./components/MobileNav";
import { Home, Activity, BarChart3, Lightbulb, User } from "lucide-react";

import HomePage from "./pages/Dashboard";
import StepTrackerPage from "./pages/StepTracker";
import HealthPage from "./pages/HeathSummary";
import RecommendationPage from "./pages/Recommendations";
import ProfilePage from "./pages/Profile";
import ChatArogya from "./components/ChatArogya";

const navItems = [
  {
    label: "Home",
    icon: Home,
    href: "/",
  },
  {
    label: "MoveMate",
    icon: Activity,
    href: "/steptracker",
  },
  {
    label: "VitalStats",
    icon: BarChart3,
    href: "/health",
  },
  {
    label: "Wellness",
    icon: Lightbulb,
    href: "/recommendation",
  },
  {
    label: "Profile",
    icon: User,
    href: "/profile",
  },
];

function App() {
  return (
    <Router>
      <div className="font-poppins bg-[#121212] text-[#E4E4E4] min-h-screen pb-16">
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/step-tracker" element={<StepTrackerPage />} />
            <Route path="/health" element={<HealthPage />} />
            <Route path="/recommendations" element={<RecommendationPage />} />
            <Route path="/profile" element={<ProfilePage navItems={navItems}/>} />
          </Routes>
        </main>
        <MobileNav navItems={navItems} />
        <ChatArogya/>
      </div>
    </Router>
  );
}

export default App;