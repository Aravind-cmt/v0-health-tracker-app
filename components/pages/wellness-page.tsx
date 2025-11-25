"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footprints, Droplets } from "lucide-react"

export function WellnessPage() {
  const [steps, setSteps] = useState(8432)
  const [water, setWater] = useState(6)
  const [notificationMessage, setNotificationMessage] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setNotificationMessage("💧 Time to drink water! Stay hydrated.")
      setTimeout(() => setNotificationMessage(""), 3000)
    }, 300000) // Every 5 minutes

    return () => clearInterval(interval)
  }, [])

  const handleAddSteps = () => {
    setSteps((prev) => prev + Math.floor(Math.random() * 500) + 100)
  }

  const handleAddWater = () => {
    if (water < 8) {
      setWater((prev) => prev + 1)
    }
  }

  const stepsPercentage = (steps / 10000) * 100
  const waterPercentage = (water / 8) * 100

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Wellness Tracker</h1>
        <p className="text-slate-600 mb-8">Track your daily activity and hydration</p>

        {/* Notification */}
        {notificationMessage && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-900 font-medium">{notificationMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Step Tracker */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100 border-b border-slate-200">
              <CardTitle className="text-slate-900 flex items-center gap-2">
                <Footprints className="w-6 h-6 text-orange-600" />
                Daily Steps
              </CardTitle>
              <CardDescription>Track your daily activity</CardDescription>
            </CardHeader>

            <CardContent className="pt-8 flex flex-col items-center">
              {/* Circular Progress */}
              <div className="relative w-48 h-48 mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                  {/* Background circle */}
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  {/* Progress circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="8"
                    strokeDasharray={`${(stepsPercentage / 100) * 565.48} 565.48`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-4xl font-bold text-slate-900">{steps.toLocaleString()}</p>
                  <p className="text-sm text-slate-600">steps</p>
                </div>
              </div>

              <p className="text-center text-slate-600 mb-6">
                Goal: 10,000 steps ({Math.round(stepsPercentage)}% complete)
              </p>

              <Button
                onClick={handleAddSteps}
                className="w-full bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white font-medium"
              >
                Simulate Step Data
              </Button>
            </CardContent>
          </Card>

          {/* Water Intake */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-cyan-100 to-blue-100 border-b border-slate-200">
              <CardTitle className="text-slate-900 flex items-center gap-2">
                <Droplets className="w-6 h-6 text-cyan-600" />
                Water Intake
              </CardTitle>
              <CardDescription>Stay hydrated throughout the day</CardDescription>
            </CardHeader>

            <CardContent className="pt-8 flex flex-col items-center">
              {/* Water Glasses */}
              <div className="grid grid-cols-4 gap-3 mb-8">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-12 h-16 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                      idx < water ? "bg-cyan-400 border-cyan-500" : "bg-slate-100 border-slate-300"
                    }`}
                  >
                    {idx < water && <Droplets className="w-6 h-6 text-white" />}
                  </div>
                ))}
              </div>

              <p className="text-center text-slate-600 mb-6">
                {water} / 8 glasses ({Math.round(waterPercentage)}% complete)
              </p>

              <Button
                onClick={handleAddWater}
                disabled={water >= 8}
                className={`w-full font-medium ${
                  water >= 8
                    ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white"
                }`}
              >
                {water >= 8 ? "Daily Goal Reached! 🎉" : "Add 1 Glass"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Wellness Tips */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 border-b border-slate-200">
            <CardTitle className="text-slate-900">Wellness Tips</CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "Take a 10-minute walk after meals to boost digestion",
                "Drink water before, during, and after exercise",
                "Aim for 7-8 hours of quality sleep every night",
              ].map((tip, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <p className="text-slate-700 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
