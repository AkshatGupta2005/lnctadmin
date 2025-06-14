"use client"

import { useState } from "react"
import "../../styles/login.css"

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!formData.username || !formData.password) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    const result = onLogin(formData.username, formData.password)

    if (!result.success) {
      setError(result.message)
    }

    setLoading(false)
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=error"
      />
      <div className="login-container">
        <div className="login-background"></div>
        <div className="login-content">
          <div className="login-card">
            <div className="login-header">
              <div className="logo-container">
                <div className="logo">
                  <span className="logo-text">LNCT Group</span>
                </div>
              </div>
              <h1>Admin Portal</h1>
              <p>Sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className={error ? "error" : ""}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={error ? "error" : ""}
                />
              </div>

              {error && (
                <div className="error-message">
                  <span className="material-symbols-outlined" style={{ fontSize: 20, verticalAlign: "middle", marginRight: 4 }}>
                    error
                  </span>
                  {error}
                </div>
              )}

              <button type="submit" className={`login-button ${loading ? "loading" : ""}`} disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* <div className="demo-credentials">
              <h3>Demo Credentials:</h3>
              <div className="credentials-grid">
                <div className="credential-item">
                  <strong>Admin:</strong> admin / admin123
                </div>
                <div className="credential-item">
                  <strong>Head:</strong> head1 / head123
                </div>
                <div className="credential-item">
                  <strong>Manager:</strong> manager1 / manager123
                </div>
                <div className="credential-item">
                  <strong>Editor:</strong> editor1 / editor123
                </div>
                <div className="credential-item">
                  <strong>Coordinator:</strong> coord1 / coord123
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
