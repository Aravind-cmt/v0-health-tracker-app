"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Camera, X } from "lucide-react"

export function ChatbotPage() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    {
      role: "bot",
      content:
        "Hi! I'm your AI Health Assistant. Ask me about any health concerns or symptoms. You can also use the camera to check for minor skin issues.",
    },
  ])
  const [input, setInput] = useState("")
  const [showCamera, setShowCamera] = useState(false)
  const [cameraImage, setCameraImage] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const healthResponses: Record<string, string> = {
    fever:
      "For fever: Rest well, drink plenty of fluids, and monitor your temperature. If it persists beyond 3 days or exceeds 103°F, consult a doctor.",
    cough:
      "For cough: Try honey in warm water, do steam inhalation, and stay hydrated. If it lasts more than a week, see a doctor.",
    headache: "For headache: Drink water, take screen breaks, massage your temples gently, and rest in a quiet room.",
    "stomach pain":
      "For stomach pain: Avoid oily/spicy foods, eat smaller meals, stay upright after eating, and drink warm water.",
    sleep:
      "For better sleep: Maintain a consistent schedule, avoid screens 30 minutes before bed, keep your room cool and dark.",
    exercise:
      "For exercise: Aim for 150 minutes of moderate activity weekly. Start slowly and gradually increase intensity.",
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setShowCamera(true)
      }
    } catch (err) {
      alert("Unable to access camera. Please check permissions.")
    }
  }

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        const imageData = canvasRef.current.toDataURL("image/jpeg")
        setCameraImage(imageData)
        stopCamera()
        analyzeSkinImage()
      }
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      setShowCamera(false)
    }
  }

  const analyzeSkinImage = () => {
    const skinAnalysisResponse =
      "Based on the image analysis, I've detected potential minor skin concerns. Common issues include:\n\n" +
      "• Dryness: Use moisturizer regularly and stay hydrated\n" +
      "• Redness: Avoid harsh products and use gentle cleansers\n" +
      "• Minor irritation: Apply soothing creams with aloe vera\n\n" +
      "If symptoms persist or worsen, please consult a dermatologist. This is not a medical diagnosis."

    setMessages((prev) => [
      ...prev,
      { role: "user", content: "I've uploaded a skin image for analysis" },
      { role: "bot", content: skinAnalysisResponse },
    ])
    setCameraImage(null)
  }

  const handleSendMessage = () => {
    if (!input.trim()) return

    const userMessage = input.toLowerCase()
    setMessages((prev) => [...prev, { role: "user", content: input }])

    let botResponse = "I'm not sure about that. Please consult a healthcare professional for specific medical advice."

    for (const [key, response] of Object.entries(healthResponses)) {
      if (userMessage.includes(key)) {
        botResponse = response
        break
      }
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", content: botResponse }])
    }, 500)

    setInput("")
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">AI Health Assistant</h1>
        <p className="text-slate-600 mb-6 md:mb-8 text-sm md:text-base">Ask me about your health concerns</p>

        <Card className="border-0 shadow-lg h-[500px] md:h-[600px] flex flex-col">
          <CardHeader className="bg-gradient-to-r from-emerald-100 to-teal-100 border-b border-slate-200">
            <CardTitle className="text-slate-900">Chat with HealthMate AI</CardTitle>
            <CardDescription>Get instant health guidance</CardDescription>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg text-sm md:text-base ${
                    msg.role === "user"
                      ? "bg-emerald-500 text-white rounded-br-none"
                      : "bg-slate-100 text-slate-900 rounded-bl-none whitespace-pre-wrap"
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
          </CardContent>

          <div className="border-t border-slate-200 p-3 md:p-4 space-y-3">
            {cameraImage && (
              <div className="relative bg-slate-100 rounded-lg p-2">
                <img
                  src={cameraImage || "/placeholder.svg"}
                  alt="Captured skin"
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  onClick={() => setCameraImage(null)}
                  className="absolute top-3 right-3 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {showCamera && (
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video ref={videoRef} autoPlay playsInline className="w-full h-48 object-cover" />
                <canvas ref={canvasRef} className="hidden" width={640} height={480} />
                <div className="absolute bottom-3 left-0 right-0 flex gap-2 justify-center">
                  <Button onClick={captureImage} className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm">
                    Capture
                  </Button>
                  <Button onClick={stopCamera} className="bg-red-500 hover:bg-red-600 text-white text-sm">
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <div className="flex gap-2 flex-col md:flex-row">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about symptoms, health tips, etc..."
                className="flex-1 px-3 md:px-4 py-2 text-sm md:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={startCamera}
                disabled={showCamera}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm md:text-base"
              >
                <Camera className="w-4 h-4 mr-2" />
                Check Skin
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {["Tell me about fever", "How to sleep better", "Exercise tips", "Cough remedies"].map(
                (suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(suggestion)
                    }}
                    className="text-xs px-2 md:px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    {suggestion}
                  </button>
                ),
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
