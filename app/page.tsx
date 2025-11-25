"use client"

import { useState } from "react"
import { LoginPage } from "@/components/pages/login-page"
import { Dashboard } from "@/components/pages/dashboard"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null)

  const handleLogin = (email: string, password: string) => {
    setCurrentUser({ name: "John Doe", email })
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
  }

  return isLoggedIn ? <Dashboard user={currentUser} onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />
}
