"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import TopBar from "./TopBar"
import EventsModule from "./modules/EventsModule"
import WebsiteEditor from "./modules/WebsiteEditor"
import UserManagement from "./modules/UserManagement"
import ServicesModule from "./modules/ServicesModule"
import QueryModule from "./modules/QueryModule"
import "../styles/dashboard.css"

const Dashboard = ({ user, onLogout }) => {
  const [activeModule, setActiveModule] = useState("events")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const renderActiveModule = () => {
    switch (activeModule) {
      case "events":
        return <EventsModule user={user} />
      case "website-editor":
        return <WebsiteEditor user={user} />
      case "user-management":
        return <UserManagement user={user} />
      case "services":
        return <ServicesModule user={user} />
      case "feedback":
        return <QueryModule user={user} />
      default:
        return <EventsModule user={user} />
    }
  }

  return (
    <div className="dashboard">
      <Sidebar
        user={user}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />
      <div className={`main-content ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        <TopBar
          user={user}
          onLogout={onLogout}
          toggleSidebar={() => {
            console.log("Toggling sidebar from", sidebarCollapsed, "to", !sidebarCollapsed)
            if (window.innerWidth <= 1024) {
              setMobileSidebarOpen(!mobileSidebarOpen)
            } else {
              setSidebarCollapsed(!sidebarCollapsed)
            }
          }}
        />
        <div className="content-area">{renderActiveModule()}</div>
      </div>
    </div>
  )
}

export default Dashboard
