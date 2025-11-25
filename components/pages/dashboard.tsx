"use client"

import { useState } from "react"
import { LayoutDashboard, User, Activity, Pill, MessageCircle, AlertCircle, Menu, X, LogOut, Apple } from "lucide-react"
import { MedicalDetailsPage } from "./medical-details-page"
import { HealthTrackerPage } from "./health-tracker-page"
import { MedicationReminderPage } from "./medication-reminder-page"
import { WellnessPage } from "./wellness-page"
import { ChatbotPage } from "./chatbot-page"
import { EmergencyPage } from "./emergency-page"
import { NutritionPlannerPage } from "./nutrition-planner-page"
import { DiseaseSpecificFoodRecommendationsPage } from "./disease-food-recommendations-page"

interface DashboardProps {
  user: { name: string; email: string } | null
  onLogout?: () => void
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "medical", label: "Medical Details", icon: User },
    { id: "tracker", label: "Health Tracker", icon: Activity },
    { id: "medication", label: "Medications", icon: Pill },
    { id: "wellness", label: "Wellness", icon: Activity },
    { id: "nutrition", label: "Nutrition Planner", icon: Apple },
    { id: "disease-food", label: "Disease Food Guide", icon: AlertCircle },
    { id: "chatbot", label: "AI Chat", icon: MessageCircle },
    { id: "emergency", label: "Emergency", icon: AlertCircle },
  ]

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-slate-200 shadow-sm p-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">HealthMate AI</h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen lg:h-auto w-64 bg-white border-r border-slate-200 shadow-sm transform transition-transform duration-300 lg:transform-none z-50 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-slate-200 hidden lg:block">
          <h2 className="text-xl font-bold text-slate-900">HealthMate AI</h2>
          <p className="text-xs text-slate-600 mt-1">Smart Health Companion</p>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  currentPage === item.id
                    ? "bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 font-medium"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 space-y-4 border-t border-slate-200">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs font-medium text-blue-900">Logged in as:</p>
            <p className="text-sm font-semibold text-blue-900 mt-1">{user?.name}</p>
            <p className="text-xs text-blue-700">{user?.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 lg:hidden z-40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto w-full">
        {currentPage === "dashboard" && <DashboardHome />}
        {currentPage === "medical" && <MedicalDetailsPage />}
        {currentPage === "tracker" && <HealthTrackerPage />}
        {currentPage === "medication" && <MedicationReminderPage />}
        {currentPage === "wellness" && <WellnessPage />}
        {currentPage === "nutrition" && <NutritionPlannerPage />}
        {currentPage === "disease-food" && <DiseaseSpecificFoodRecommendationsPage />}
        {currentPage === "chatbot" && <ChatbotPage />}
        {currentPage === "emergency" && <EmergencyPage />}
      </main>
    </div>
  )
}

function DashboardHome() {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-2">Welcome to HealthMate AI</h1>
        <p className="text-slate-600 mb-6 md:mb-8 text-sm md:text-base">
          Your comprehensive health tracking and wellness companion
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              title: "Medical Profile",
              description: "Manage your health information",
              icon: "👤",
              color: "from-blue-100 to-cyan-100",
            },
            {
              title: "Health Metrics",
              description: "Track vitals and wellness data",
              icon: "📊",
              color: "from-green-100 to-emerald-100",
            },
            {
              title: "Medications",
              description: "Set reminders and track adherence",
              icon: "💊",
              color: "from-purple-100 to-violet-100",
            },
            {
              title: "Step Counter",
              description: "Monitor daily activity",
              icon: "👟",
              color: "from-orange-100 to-amber-100",
            },
            {
              title: "Water Intake",
              description: "Stay hydrated throughout the day",
              icon: "💧",
              color: "from-cyan-100 to-blue-100",
            },
            {
              title: "AI Assistant",
              description: "Get personalized health guidance",
              icon: "🤖",
              color: "from-pink-100 to-rose-100",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${card.color} border border-slate-200 rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-300`}
            >
              <div className="text-3xl md:text-4xl mb-3">{card.icon}</div>
              <h3 className="text-base md:text-lg font-semibold text-slate-900">{card.title}</h3>
              <p className="text-slate-600 text-xs md:text-sm mt-2">{card.description}</p>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 md:mt-12">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6">Today's Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { label: "Steps", value: "8,432", unit: "steps", color: "from-orange-100 to-amber-100" },
              { label: "Water", value: "6/8", unit: "glasses", color: "from-cyan-100 to-blue-100" },
              { label: "Sleep", value: "7.5", unit: "hours", color: "from-indigo-100 to-purple-100" },
              { label: "Heart Rate", value: "72", unit: "bpm", color: "from-rose-100 to-pink-100" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${stat.color} border border-slate-200 rounded-lg p-3 md:p-4 text-center`}
              >
                <p className="text-slate-600 text-xs md:text-sm font-medium">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-1">{stat.unit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
