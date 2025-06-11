"use client"

import { useState } from "react"
import "../styles/topbar.css"

const TopBar = ({ user, onLogout, toggleSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      onLogout()
    }
  }

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button
          className="sidebar-toggle"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            console.log("Toggle sidebar clicked")
            if (toggleSidebar) {
              toggleSidebar()
            }
          }}
          type="button"
          aria-label="Toggle sidebar"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            fontSize: "20px",
            color: "#374151",
            cursor: "pointer",
            padding: "12px",
            borderRadius: "8px",
            transition: "all 0.2s ease",
            width: "44px",
            height: "44px",
            minWidth: "44px",
            minHeight: "44px",
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
            outline: "none",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#f3f4f6"
            e.target.style.transform = "scale(1.05)"
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent"
            e.target.style.transform = "scale(1)"
          }}
          onTouchStart={(e) => {
            e.target.style.backgroundColor = "#e5e7eb"
          }}
          onTouchEnd={(e) => {
            setTimeout(() => {
              e.target.style.backgroundColor = "transparent"
            }, 150)
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "18px",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            ☰
          </span>
        </button>
        <div className="breadcrumb">
          <span className="breadcrumb-item">Dashboard</span>
        </div>
      </div>

      {/* <div className="topbar-right">
        <div className="notifications">
          <button className="notification-btn">
            🔔<span className="notification-badge">3</span>
          </button>
        </div> */}

        <div className="user-menu-container">
          <button className="user-menu-trigger" onClick={() => setShowUserMenu(!showUserMenu)}>
            <div className="user-avatar-small">{user.name.charAt(0).toUpperCase()}</div>
            <span className="user-name-small">{user.name}</span>
            <span className="dropdown-arrow">▼</span>
          </button>

          {showUserMenu && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <div className="user-info-dropdown">
                  <div className="user-name">{user.name}</div>
                  <div className="user-role">{user.role}</div>
                </div>
              </div>
              {/* <div className="dropdown-divider"></div>
              <button className="dropdown-item">👤 Profile Settings</button>
              <button className="dropdown-item">⚙️ Preferences</button>
              <button className="dropdown-item">📊 Activity Log</button> */}
              {/* <div className="dropdown-divider"></div> */}
              <button className="dropdown-item logout-item" onClick={handleLogout}>
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -980 800 960" width="20px" fill="#434343"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    // </div>
  )
}

export default TopBar
