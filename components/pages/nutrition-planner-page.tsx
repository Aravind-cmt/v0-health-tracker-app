"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Apple, Dumbbell, Moon, TrendingUp, CheckCircle2, AlertCircle } from "lucide-react"

interface Suggestion {
  id: string
  type: "meal" | "exercise" | "sleep"
  title: string
  description: string
  duration?: string
  calories?: string
  adherence: number
  results: string[]
}

export function NutritionPlannerPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: "1",
      type: "meal",
      title: "Balanced Breakfast",
      description: "Oatmeal with berries, almonds, and honey - Rich in fiber and antioxidants",
      calories: "350 cal",
      adherence: 85,
      results: ["Improved energy", "Better digestion"],
    },
    {
      id: "2",
      type: "meal",
      title: "Protein-Rich Lunch",
      description: "Grilled chicken with quinoa and steamed vegetables - High protein for muscle recovery",
      calories: "520 cal",
      adherence: 72,
      results: ["Muscle recovery", "Sustained energy"],
    },
    {
      id: "3",
      type: "meal",
      title: "Light Dinner",
      description: "Salmon with sweet potato and broccoli - Omega-3 rich for heart health",
      calories: "480 cal",
      adherence: 68,
      results: ["Heart health", "Better sleep"],
    },
    {
      id: "4",
      type: "exercise",
      title: "Morning Cardio",
      description: "30-minute brisk walk or light jog - Improves cardiovascular health",
      duration: "30 min",
      adherence: 78,
      results: ["Increased stamina", "Better mood"],
    },
    {
      id: "5",
      type: "exercise",
      title: "Strength Training",
      description: "Upper body workout - 3 sets of 10 reps each exercise",
      duration: "45 min",
      adherence: 65,
      results: ["Muscle building", "Increased metabolism"],
    },
    {
      id: "6",
      type: "exercise",
      title: "Evening Yoga",
      description: "Gentle yoga and stretching - Improves flexibility and reduces stress",
      duration: "20 min",
      adherence: 82,
      results: ["Stress relief", "Better flexibility"],
    },
    {
      id: "7",
      type: "sleep",
      title: "Sleep Optimization",
      description: "Maintain consistent sleep schedule (10 PM - 6 AM) - 8 hours recommended",
      duration: "8 hours",
      adherence: 75,
      results: ["Better recovery", "Improved focus"],
    },
  ])

  const [completedToday, setCompletedToday] = useState<string[]>([])

  const toggleCompletion = (id: string) => {
    setCompletedToday((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const getAdaptiveSuggestions = () => {
    return suggestions.map((suggestion) => {
      const isCompleted = completedToday.includes(suggestion.id)
      const newAdherence = isCompleted ? Math.min(100, suggestion.adherence + 2) : suggestion.adherence

      return {
        ...suggestion,
        adherence: newAdherence,
      }
    })
  }

  const adaptedSuggestions = getAdaptiveSuggestions()
  const mealSuggestions = adaptedSuggestions.filter((s) => s.type === "meal")
  const exerciseSuggestions = adaptedSuggestions.filter((s) => s.type === "exercise")
  const sleepSuggestions = adaptedSuggestions.filter((s) => s.type === "sleep")

  const completionRate = Math.round((completedToday.length / suggestions.length) * 100)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "meal":
        return <Apple className="w-5 h-5" />
      case "exercise":
        return <Dumbbell className="w-5 h-5" />
      case "sleep":
        return <Moon className="w-5 h-5" />
      default:
        return null
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "meal":
        return "from-orange-100 to-amber-100"
      case "exercise":
        return "from-purple-100 to-violet-100"
      case "sleep":
        return "from-indigo-100 to-blue-100"
      default:
        return "from-slate-100 to-slate-100"
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Nutrition & Lifestyle Planner</h1>
        <p className="text-slate-600 mb-6 md:mb-8 text-sm md:text-base">
          Personalized meal plans, exercises, and sleep routines adapted to your health data
        </p>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Today's Completion</p>
                  <p className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">{completionRate}%</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Avg Adherence</p>
                  <p className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
                    {Math.round(
                      adaptedSuggestions.reduce((acc, s) => acc + s.adherence, 0) / adaptedSuggestions.length,
                    )}
                    %
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Completed Today</p>
                  <p className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
                    {completedToday.length}/{suggestions.length}
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-rose-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meal Suggestions */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Apple className="w-6 h-6 text-orange-500" />
            Meal Suggestions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mealSuggestions.map((suggestion) => (
              <Card
                key={suggestion.id}
                className={`border-0 shadow-lg bg-gradient-to-br ${getTypeColor(suggestion.type)}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-slate-900">{suggestion.title}</CardTitle>
                      <CardDescription className="text-slate-700 mt-1">{suggestion.calories}</CardDescription>
                    </div>
                    <input
                      type="checkbox"
                      checked={completedToday.includes(suggestion.id)}
                      onChange={() => toggleCompletion(suggestion.id)}
                      className="w-5 h-5 rounded border-slate-300 text-emerald-500 cursor-pointer"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-700">{suggestion.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Adherence</span>
                      <span className="text-slate-900 font-bold">{suggestion.adherence}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${suggestion.adherence}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-300">
                    <p className="text-xs font-medium text-slate-700 mb-2">Results:</p>
                    <div className="flex flex-wrap gap-1">
                      {suggestion.results.map((result, idx) => (
                        <span key={idx} className="text-xs bg-white bg-opacity-60 text-slate-700 px-2 py-1 rounded">
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Exercise Suggestions */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Dumbbell className="w-6 h-6 text-purple-500" />
            Exercise Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exerciseSuggestions.map((suggestion) => (
              <Card
                key={suggestion.id}
                className={`border-0 shadow-lg bg-gradient-to-br ${getTypeColor(suggestion.type)}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-slate-900">{suggestion.title}</CardTitle>
                      <CardDescription className="text-slate-700 mt-1">{suggestion.duration}</CardDescription>
                    </div>
                    <input
                      type="checkbox"
                      checked={completedToday.includes(suggestion.id)}
                      onChange={() => toggleCompletion(suggestion.id)}
                      className="w-5 h-5 rounded border-slate-300 text-emerald-500 cursor-pointer"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-700">{suggestion.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Adherence</span>
                      <span className="text-slate-900 font-bold">{suggestion.adherence}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${suggestion.adherence}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-300">
                    <p className="text-xs font-medium text-slate-700 mb-2">Results:</p>
                    <div className="flex flex-wrap gap-1">
                      {suggestion.results.map((result, idx) => (
                        <span key={idx} className="text-xs bg-white bg-opacity-60 text-slate-700 px-2 py-1 rounded">
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sleep Suggestions */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Moon className="w-6 h-6 text-indigo-500" />
            Sleep Routine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sleepSuggestions.map((suggestion) => (
              <Card
                key={suggestion.id}
                className={`border-0 shadow-lg bg-gradient-to-br ${getTypeColor(suggestion.type)}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-slate-900">{suggestion.title}</CardTitle>
                      <CardDescription className="text-slate-700 mt-1">{suggestion.duration}</CardDescription>
                    </div>
                    <input
                      type="checkbox"
                      checked={completedToday.includes(suggestion.id)}
                      onChange={() => toggleCompletion(suggestion.id)}
                      className="w-5 h-5 rounded border-slate-300 text-emerald-500 cursor-pointer"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-700">{suggestion.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Adherence</span>
                      <span className="text-slate-900 font-bold">{suggestion.adherence}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${suggestion.adherence}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-300">
                    <p className="text-xs font-medium text-slate-700 mb-2">Results:</p>
                    <div className="flex flex-wrap gap-1">
                      {suggestion.results.map((result, idx) => (
                        <span key={idx} className="text-xs bg-white bg-opacity-60 text-slate-700 px-2 py-1 rounded">
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
