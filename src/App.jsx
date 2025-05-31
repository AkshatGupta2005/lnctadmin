"use client"

import { useState, useEffect } from "react"
import LoginPage from "./components/modules/LoginPage.jsx";
import Dashboard from "./components/Dashboard.jsx"
import "./styles/global.css"

// Demo users with different roles
const DEMO_USERS = {
  admin: { username: "admin", password: "admin123", role: "admin", name: "Admin User" },
  head1: { username: "head1", password: "head123", role: "head", name: "Head User" },
  manager1: { username: "manager1", password: "manager123", role: "manager", name: "Manager User" },
  editor1: { username: "editor1", password: "editor123", role: "editor", name: "Editor User" },
  coord1: { username: "coord1", password: "coord123", role: "coordinator", name: "Coordinator User" },
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const handleLogin = (username, password) => {
    const user = Object.values(DEMO_USERS).find((u) => u.username === username && u.password === password)

    if (user) {
      setCurrentUser(user)
      setIsAuthenticated(true)
      localStorage.setItem("currentUser", JSON.stringify(user))
      return { success: true }
    }

    return { success: false, message: "Invalid credentials" }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="app">
      {!isAuthenticated ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
