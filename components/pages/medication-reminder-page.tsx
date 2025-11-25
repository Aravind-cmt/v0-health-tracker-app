"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pill, Check, X } from "lucide-react"

export function MedicationReminderPage() {
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Aspirin", dose: "500mg", time: "08:00", taken: false },
    { id: 2, name: "Vitamin D", dose: "1000IU", time: "12:00", taken: true },
    { id: 3, name: "Multivitamin", dose: "1 tablet", time: "20:00", taken: false },
  ])

  const [formData, setFormData] = useState({
    name: "",
    dose: "",
    time: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddMedicine = () => {
    if (formData.name && formData.dose && formData.time) {
      setMedicines((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: formData.name,
          dose: formData.dose,
          time: formData.time,
          taken: false,
        },
      ])
      setFormData({ name: "", dose: "", time: "" })
    }
  }

  const toggleTaken = (id: number) => {
    setMedicines((prev) => prev.map((med) => (med.id === id ? { ...med, taken: !med.taken } : med)))
  }

  const removeMedicine = (id: number) => {
    setMedicines((prev) => prev.filter((med) => med.id !== id))
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Medication Reminders</h1>
        <p className="text-slate-600 mb-8">Manage your medicines and track adherence</p>

        {/* Add Medicine Form */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader className="bg-gradient-to-r from-purple-100 to-violet-100 border-b border-slate-200">
            <CardTitle className="text-slate-900">Add New Medicine</CardTitle>
            <CardDescription>Set up a reminder for your medication</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Medicine Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Aspirin"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Dose</label>
                <input
                  type="text"
                  name="dose"
                  value={formData.dose}
                  onChange={handleChange}
                  placeholder="e.g., 500mg"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div className="flex items-end">
                <Button
                  onClick={handleAddMedicine}
                  className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-medium"
                >
                  Add Medicine
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Medicines */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-pink-100 to-rose-100 border-b border-slate-200">
            <CardTitle className="text-slate-900">Today's Medicines</CardTitle>
            <CardDescription>Track which medicines you've taken</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="space-y-3">
              {medicines.map((medicine) => (
                <div
                  key={medicine.id}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Pill className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{medicine.name}</h3>
                      <p className="text-sm text-slate-600">
                        {medicine.dose} at {medicine.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleTaken(medicine.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                        medicine.taken
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {medicine.taken ? (
                        <>
                          <Check className="w-4 h-4" />
                          Taken
                        </>
                      ) : (
                        "Mark Taken"
                      )}
                    </button>

                    <button
                      onClick={() => removeMedicine(medicine.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {medicines.length === 0 && (
              <div className="text-center py-8">
                <p className="text-slate-600">No medicines added yet. Add one to get started!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
