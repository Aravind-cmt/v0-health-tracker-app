"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function HealthTrackerPage() {
  const [records, setRecords] = useState([
    { date: "2025-01-20", bp: "120/80", sugar: "95", hr: "72", sleep: "7.5", mood: "Good" },
    { date: "2025-01-21", bp: "118/78", sugar: "92", hr: "70", sleep: "8", mood: "Great" },
    { date: "2025-01-22", bp: "122/82", sugar: "98", hr: "75", sleep: "7", mood: "Good" },
  ])

  const [formData, setFormData] = useState({
    bp: "",
    sugar: "",
    hr: "",
    sleep: "",
    mood: "Good",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddRecord = () => {
    if (formData.bp && formData.sugar && formData.hr && formData.sleep) {
      const today = new Date().toISOString().split("T")[0]
      setRecords((prev) => [
        ...prev,
        {
          date: today,
          bp: formData.bp,
          sugar: formData.sugar,
          hr: formData.hr,
          sleep: formData.sleep,
          mood: formData.mood,
        },
      ])
      setFormData({ bp: "", sugar: "", hr: "", sleep: "", mood: "Good" })
    }
  }

  const chartData = records.map((r) => ({
    date: r.date.slice(-5),
    hr: Number.parseInt(r.hr),
    sugar: Number.parseInt(r.sugar),
  }))

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Health Tracker</h1>
        <p className="text-slate-600 mb-8">Log and monitor your daily health metrics</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Input Form */}
          <Card className="lg:col-span-1 border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100 border-b border-slate-200">
              <CardTitle className="text-slate-900">Add Record</CardTitle>
              <CardDescription>Log today's health metrics</CardDescription>
            </CardHeader>

            <CardContent className="pt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Blood Pressure</label>
                <input
                  type="text"
                  name="bp"
                  value={formData.bp}
                  onChange={handleChange}
                  placeholder="120/80"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Sugar Level (mg/dL)</label>
                <input
                  type="number"
                  name="sugar"
                  value={formData.sugar}
                  onChange={handleChange}
                  placeholder="95"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Heart Rate (bpm)</label>
                <input
                  type="number"
                  name="hr"
                  value={formData.hr}
                  onChange={handleChange}
                  placeholder="72"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Sleep Hours</label>
                <input
                  type="number"
                  name="sleep"
                  value={formData.sleep}
                  onChange={handleChange}
                  placeholder="7.5"
                  step="0.5"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Mood</label>
                <select
                  name="mood"
                  value={formData.mood}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <option>Good</option>
                  <option>Great</option>
                  <option>Fair</option>
                  <option>Poor</option>
                </select>
              </div>

              <Button
                onClick={handleAddRecord}
                className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-medium"
              >
                Add Record
              </Button>
            </CardContent>
          </Card>

          {/* Chart */}
          <Card className="lg:col-span-2 border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 border-b border-slate-200">
              <CardTitle className="text-slate-900">Health Trends</CardTitle>
              <CardDescription>Your recent health metrics</CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="hr" stroke="#ef4444" name="Heart Rate (bpm)" />
                  <Line type="monotone" dataKey="sugar" stroke="#f59e0b" name="Sugar Level (mg/dL)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Records */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-100 to-violet-100 border-b border-slate-200">
            <CardTitle className="text-slate-900">Recent Records</CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">BP</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Sugar</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">HR</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Sleep</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Mood</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 text-slate-900">{record.date}</td>
                      <td className="py-3 px-4 text-slate-700">{record.bp}</td>
                      <td className="py-3 px-4 text-slate-700">{record.sugar} mg/dL</td>
                      <td className="py-3 px-4 text-slate-700">{record.hr} bpm</td>
                      <td className="py-3 px-4 text-slate-700">{record.sleep} hrs</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {record.mood}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
