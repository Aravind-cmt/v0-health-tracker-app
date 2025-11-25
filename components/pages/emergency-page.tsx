"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Phone, MapPin } from "lucide-react"

export function EmergencyPage() {
  const [showModal, setShowModal] = useState(false)

  const doctorDetails = {
    name: "Dr. Sarah Johnson",
    specialty: "General Practitioner",
    hospital: "City Medical Center",
    phone: "+1-555-0123",
    address: "123 Health Street, Medical City, MC 12345",
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Emergency & Doctor Connect</h1>
        <p className="text-slate-600 mb-8">Quick access to emergency services and your doctor</p>

        {/* Emergency Alert */}
        <Card className="border-0 shadow-lg mb-8 border-l-4 border-red-500">
          <CardHeader className="bg-gradient-to-r from-red-100 to-rose-100 border-b border-slate-200">
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-600" />
              Emergency Services
            </CardTitle>
            <CardDescription>In case of medical emergency</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Emergency", number: "911", color: "from-red-100 to-rose-100" },
                { label: "Poison Control", number: "1-800-222-1222", color: "from-orange-100 to-amber-100" },
                { label: "Mental Health", number: "988", color: "from-purple-100 to-violet-100" },
              ].map((service, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${service.color} border border-slate-200 rounded-lg p-4 text-center`}
                >
                  <p className="text-slate-600 text-sm font-medium">{service.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-2">{service.number}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Doctor Connect */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100 border-b border-slate-200">
            <CardTitle className="text-slate-900">My Doctor</CardTitle>
            <CardDescription>Connect with your primary healthcare provider</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Doctor Info Preview */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <h3 className="font-semibold text-slate-900 mb-3">{doctorDetails.name}</h3>
                <div className="space-y-2 text-sm text-slate-700">
                  <p>
                    <span className="font-medium">Specialty:</span> {doctorDetails.specialty}
                  </p>
                  <p>
                    <span className="font-medium">Hospital:</span> {doctorDetails.hospital}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  View Full Details
                </Button>

                <Button className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-medium flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-0 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100 border-b border-slate-200">
                <CardTitle className="text-slate-900">Doctor Details</CardTitle>
              </CardHeader>

              <CardContent className="pt-6 space-y-4">
                <div>
                  <p className="text-sm text-slate-600 font-medium">Name</p>
                  <p className="text-lg font-semibold text-slate-900">{doctorDetails.name}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-600 font-medium">Specialty</p>
                  <p className="text-slate-900">{doctorDetails.specialty}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-600 font-medium">Hospital</p>
                  <p className="text-slate-900">{doctorDetails.hospital}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-600 font-medium">Phone</p>
                  <p className="text-slate-900 font-mono">{doctorDetails.phone}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-600 font-medium">Address</p>
                  <p className="text-slate-900">{doctorDetails.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Button
                    onClick={() => setShowModal(false)}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-900"
                  >
                    Close
                  </Button>

                  <Button className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white">
                    Call Doctor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
