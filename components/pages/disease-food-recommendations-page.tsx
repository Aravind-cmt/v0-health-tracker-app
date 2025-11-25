"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, XCircle, TrendingUp } from "lucide-react"

interface DiseaseRecommendations {
  [key: string]: {
    foodsToEat: string[]
    foodsToAvoid: string[]
    tips: string[]
    alerts: string[]
  }
}

const diseaseDatabase: DiseaseRecommendations = {
  diabetes: {
    foodsToEat: [
      "Leafy greens (spinach, kale)",
      "Whole grains (oats, brown rice)",
      "Lean proteins (chicken, fish)",
      "Berries (blueberries, strawberries)",
      "Nuts and seeds",
      "Legumes (beans, lentils)",
      "Non-starchy vegetables",
      "Greek yogurt",
    ],
    foodsToAvoid: [
      "Sugary drinks and sodas",
      "White bread and refined grains",
      "Processed foods",
      "High-sugar desserts",
      "Fried foods",
      "Full-fat dairy",
      "Fruit juices",
      "Candy and chocolate",
    ],
    tips: [
      "Monitor portion sizes carefully",
      "Eat at regular intervals",
      "Combine carbs with protein",
      "Stay hydrated with water",
    ],
    alerts: ["Check blood sugar levels regularly", "Consult with a nutritionist", "Monitor weight changes"],
  },
  hypertension: {
    foodsToEat: [
      "Low-sodium vegetables",
      "Potassium-rich foods (bananas, sweet potatoes)",
      "Whole grains",
      "Lean meats",
      "Fish rich in omega-3 (salmon, mackerel)",
      "Low-fat dairy",
      "Garlic and herbs",
      "Olive oil",
    ],
    foodsToAvoid: [
      "High-sodium processed foods",
      "Canned soups and vegetables",
      "Deli meats and bacon",
      "Cheese and butter",
      "Salty snacks",
      "Soy sauce and condiments",
      "Alcohol",
      "Caffeine in excess",
    ],
    tips: [
      "Limit sodium to less than 2,300mg daily",
      "Increase potassium intake",
      "Exercise regularly",
      "Manage stress levels",
    ],
    alerts: ["Monitor blood pressure daily", "Reduce sodium gradually", "Avoid sudden dietary changes"],
  },
  cholesterol: {
    foodsToEat: [
      "Oats and whole grains",
      "Fatty fish (salmon, sardines)",
      "Nuts and seeds",
      "Olive oil",
      "Avocados",
      "Beans and legumes",
      "Fruits and vegetables",
      "Plant sterols (fortified foods)",
    ],
    foodsToAvoid: [
      "Saturated fats (butter, lard)",
      "Trans fats (processed foods)",
      "Red meat",
      "Full-fat dairy",
      "Egg yolks (limit)",
      "Fried foods",
      "Pastries and baked goods",
      "Coconut oil",
    ],
    tips: ["Increase fiber intake", "Choose lean proteins", "Cook with healthy oils", "Read nutrition labels"],
    alerts: ["Get cholesterol levels checked", "Monitor LDL and HDL ratios", "Combine diet with exercise"],
  },
  obesity: {
    foodsToEat: [
      "Lean proteins",
      "Whole grains",
      "Vegetables (all types)",
      "Fruits (in moderation)",
      "Low-fat dairy",
      "Legumes",
      "Nuts (small portions)",
      "Water and herbal tea",
    ],
    foodsToAvoid: [
      "High-calorie processed foods",
      "Sugary drinks",
      "Fast food",
      "Fried foods",
      "High-fat snacks",
      "Alcohol",
      "Desserts and sweets",
      "Refined carbohydrates",
    ],
    tips: [
      "Practice portion control",
      "Eat slowly and mindfully",
      "Increase physical activity",
      "Track calorie intake",
    ],
    alerts: ["Monitor weight weekly", "Set realistic goals", "Seek professional guidance"],
  },
  "heart disease": {
    foodsToEat: [
      "Fatty fish (omega-3 rich)",
      "Whole grains",
      "Vegetables and fruits",
      "Nuts and seeds",
      "Olive oil",
      "Legumes",
      "Low-fat dairy",
      "Garlic and spices",
    ],
    foodsToAvoid: [
      "Saturated fats",
      "Trans fats",
      "High-sodium foods",
      "Processed meats",
      "Fried foods",
      "Full-fat dairy",
      "Sugary foods",
      "Alcohol in excess",
    ],
    tips: ["Follow Mediterranean diet", "Limit sodium intake", "Maintain healthy weight", "Exercise regularly"],
    alerts: ["Monitor heart rate", "Check blood pressure", "Avoid stress triggers"],
  },
  "thyroid disorder": {
    foodsToEat: [
      "Iodine-rich foods (seaweed, fish)",
      "Selenium sources (Brazil nuts, eggs)",
      "Zinc sources (oysters, beef)",
      "Whole grains",
      "Lean proteins",
      "Vegetables",
      "Fruits",
      "Healthy fats",
    ],
    foodsToAvoid: [
      "Cruciferous vegetables (raw)",
      "Soy products (in excess)",
      "Processed foods",
      "High-iodine supplements",
      "Excess caffeine",
      "Alcohol",
      "Refined sugars",
      "Trans fats",
    ],
    tips: [
      "Take medications as prescribed",
      "Maintain consistent iodine intake",
      "Cook cruciferous vegetables",
      "Regular thyroid monitoring",
    ],
    alerts: ["Get TSH levels checked", "Avoid iodine-rich foods if hyperthyroid", "Consult endocrinologist"],
  },
}

export function DiseaseSpecificFoodRecommendationsPage() {
  const [medicalDetails, setMedicalDetails] = useState<any>(null)
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([])
  const [adherenceData, setAdherenceData] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const stored = localStorage.getItem("medicalDetails")
    if (stored) {
      const details = JSON.parse(stored)
      setMedicalDetails(details)

      // Extract diseases from conditions field
      const conditions = details.conditions?.toLowerCase() || ""
      const diseases = Object.keys(diseaseDatabase).filter((disease) => conditions.includes(disease))
      setSelectedDiseases(diseases.length > 0 ? diseases : [])

      // Load adherence data
      const adherence = localStorage.getItem("foodAdherence")
      if (adherence) {
        setAdherenceData(JSON.parse(adherence))
      }
    }
  }, [])

  const handleAdherenceUpdate = (disease: string, adherence: number) => {
    const updated = { ...adherenceData, [disease]: adherence }
    setAdherenceData(updated)
    localStorage.setItem("foodAdherence", JSON.stringify(updated))
  }

  const getAdherenceColor = (adherence: number) => {
    if (adherence >= 80) return "text-green-600 bg-green-50"
    if (adherence >= 60) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Disease-Specific Food Recommendations</h1>
        <p className="text-slate-600 mb-8">Personalized nutrition guidance based on your diagnosed conditions</p>

        {!medicalDetails ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-slate-600">Please update your medical details first to see recommendations.</p>
            </CardContent>
          </Card>
        ) : selectedDiseases.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-slate-600">
                No diseases found in your medical profile. Update your chronic conditions to see food recommendations.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {selectedDiseases.map((disease) => {
              const recommendations = diseaseDatabase[disease]
              const adherence = adherenceData[disease] || 0

              return (
                <Card key={disease} className="border-0 shadow-lg overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-emerald-100 to-teal-100 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-slate-900 capitalize">{disease}</CardTitle>
                        <CardDescription>Personalized nutrition plan for {disease}</CardDescription>
                      </div>
                      <div className={`px-4 py-2 rounded-lg font-semibold ${getAdherenceColor(adherence)}`}>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          <span>{adherence}% Adherence</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6 space-y-6">
                    {/* Two-Column Food Table */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Foods to Eat */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <h3 className="text-lg font-semibold text-slate-900">Foods to Eat</h3>
                        </div>
                        <div className="space-y-2">
                          {recommendations.foodsToEat.map((food, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors cursor-pointer"
                              onClick={() => {
                                const newAdherence = Math.min(100, adherence + 5)
                                handleAdherenceUpdate(disease, newAdherence)
                              }}
                            >
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span className="text-slate-700 text-sm">{food}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Foods to Avoid */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <XCircle className="w-5 h-5 text-red-600" />
                          <h3 className="text-lg font-semibold text-slate-900">Foods to Avoid</h3>
                        </div>
                        <div className="space-y-2">
                          {recommendations.foodsToAvoid.map((food, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                            >
                              <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                              <span className="text-slate-700 text-sm">{food}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tips Section */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-blue-600" />
                        Quick Tips
                      </h4>
                      <ul className="space-y-2">
                        {recommendations.tips.map((tip, idx) => (
                          <li key={idx} className="text-slate-700 text-sm flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-0.5">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Alerts Section */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                        Important Alerts
                      </h4>
                      <ul className="space-y-2">
                        {recommendations.alerts.map((alert, idx) => (
                          <li key={idx} className="text-slate-700 text-sm flex items-start gap-2">
                            <span className="text-amber-600 font-bold mt-0.5">!</span>
                            <span>{alert}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Adherence Tracker */}
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-900 mb-3">Track Your Adherence</h4>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={adherence}
                          onChange={(e) => handleAdherenceUpdate(disease, Number.parseInt(e.target.value))}
                          className="flex-1 h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-lg font-bold text-slate-900 min-w-12">{adherence}%</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-2">
                        Adjust the slider to track how well you're following the recommendations
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
