"use client"
import "../styles/sidebar.css"
import { useState, useEffect } from "react"

const Sidebar = ({ user, activeModule, setActiveModule, collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const getModulesForRole = (role) => {
    const allModules = [
      { id: "events", name: "Events", icon: "📅", description: "Manage events and reports" },
      { id: "website-editor", name: "Website Editor", icon: "🌐", description: "Edit website content" },
      { id: "user-management", name: "User Management", icon: "👥", description: "Manage users and roles" },
      { id: "services", name: "Services", icon: "🏢", description: "Manage service categories" },
      { id: "timeline", name: "Timeline", icon: "⏰", description: "Manage company timeline" },
      { id: "feedback", name: "Queries", icon: "📬", description: "Manage user queries" },
    ]

    switch (role) {
      case "admin":
        return allModules
      case "head":
        return allModules.filter((m) => ["events", "timeline", "services", "feedback"].includes(m.id))
      case "manager":
        return allModules.filter((m) => ["events", "services", "timeline", "feedback"].includes(m.id))
      case "editor":
        return allModules.filter((m) => ["website-editor", "events", "feedback"].includes(m.id))
      case "coordinator":
        return allModules.filter((m) => ["events", "feedback"].includes(m.id))
      default:
        return []
    }
  }

  const modules = getModulesForRole(user.role)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024)
    }

    // Initial check
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: "#ff6b6b",
      head: "#4ecdc4",
      manager: "#45b7d1",
      editor: "#96ceb4",
      coordinator: "#feca57",
    }
    return colors[role] || "#6c757d"
  }

  return (
    <>
      <div className={`sidebar ${collapsed ? "collapsed" : ""} ${isMobile && mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-section">
            <div className="logo-icon">AG</div>
            {!collapsed && (
              <div className="logo-text">
                <span className="logo-title">AkshatGupta</span>
                <span className="logo-subtitle">Admin Panel</span>
              </div>
            )}
          </div>
          <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "→" : "←"}
          </button>
        </div>

        <div className="user-info">
          <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
          {!collapsed && (
            <div className="user-details">
              <div className="user-name" style={{ color: "white", fontWeight: "600" }}>
                {user.name}
              </div>
              <div className="user-role" style={{ backgroundColor: getRoleBadgeColor(user.role) }}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </div>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {modules.map((module) => (
            <button
              key={module.id}
              className={`nav-item ${activeModule === module.id ? "active" : ""}`}
              onClick={() => {
                setActiveModule(module.id)
                if (isMobile && setMobileOpen) {
                  setMobileOpen(false)
                }
              }}
              title={collapsed ? module.name : ""}
            >
              <span className="nav-icon">{module.icon}</span>
              {!collapsed && (
                <div className="nav-content">
                  <span className="nav-name">{module.name}</span>
                  <span className="nav-description">{module.description}</span>
                </div>
              )}
            </button>
          ))}
        </nav>

        {!collapsed && (
          <div className="sidebar-footer">
            <div className="footer-info">
              <p>© 2024 AkshatGupta.space</p>
              <p>Admin Panel v1.0</p>
            </div>
          </div>
        )}
      </div>
      {isMobile && mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}
    </>
  )
}

export default Sidebar
