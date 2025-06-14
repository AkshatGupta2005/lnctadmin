"use client"
import "../styles/sidebar.css"
import { useState, useEffect } from "react"

const Sidebar = ({ user, activeModule, setActiveModule, collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const getModulesForRole = (role) => {
    const allModules = [
      { id: "events", name: "Events", icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#CCCCCC"><path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>, description: "Manage events and reports" },
      { id: "website-editor", name: "Website Editor", icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#CCCCCC"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>, description: "Edit website content" },
      { id: "user-management", name: "User Management", icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#CCCCCC"><path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z"/></svg>, description: "Manage users and roles" },
      { id: "services", name: "Services", icon:<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#CCCCCC"><path d="M841-518v318q0 33-23.5 56.5T761-120H201q-33 0-56.5-23.5T121-200v-318q-23-21-35.5-54t-.5-72l42-136q8-26 28.5-43t47.5-17h556q27 0 47 16.5t29 43.5l42 136q12 39-.5 71T841-518Zm-272-42q27 0 41-18.5t11-41.5l-22-140h-78v148q0 21 14 36.5t34 15.5Zm-180 0q23 0 37.5-15.5T441-612v-148h-78l-22 140q-4 24 10.5 42t37.5 18Zm-178 0q18 0 31.5-13t16.5-33l22-154h-78l-40 134q-6 20 6.5 43t41.5 23Zm540 0q29 0 42-23t6-43l-42-134h-76l22 154q3 20 16.5 33t31.5 13ZM201-200h560v-282q-5 2-6.5 2H751q-27 0-47.5-9T663-518q-18 18-41 28t-49 10q-27 0-50.5-10T481-518q-17 18-39.5 28T393-480q-29 0-52.5-10T299-518q-21 21-41.5 29.5T211-480h-4.5q-2.5 0-5.5-2v282Zm560 0H201h560Z"/></svg>, description: "Manage service categories" },
      { id: "feedback", name: "Queries", icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#CCCCCC"><path d="M880-80 720-240H320q-33 0-56.5-23.5T240-320v-40h440q33 0 56.5-23.5T760-440v-280h40q33 0 56.5 23.5T880-640v560ZM160-473l47-47h393v-280H160v327ZM80-280v-520q0-33 23.5-56.5T160-880h440q33 0 56.5 23.5T680-800v280q0 33-23.5 56.5T600-440H240L80-280Zm80-240v-280 280Z"/></svg>, description: "Manage user queries" },
    ]

    switch (role) {
      case "admin":
        return allModules
      case "head":
        return allModules.filter((m) => ["events", "services", "feedback"].includes(m.id))
      case "manager":
        return allModules.filter((m) => ["events", "services", "feedback"].includes(m.id))
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
                <span className="logo-title">LNCT WORLD</span>
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
              <p>© 2025 LNCT GROUP</p>
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
