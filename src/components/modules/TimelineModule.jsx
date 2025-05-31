"use client"

import { useState } from "react"
import "../../styles/modules/timeline.css"

const TimelineModule = ({ user }) => {
  const [timelineItems, setTimelineItems] = useState([
    {
      id: 1,
      year: 2024,
      title: "Digital Transformation Initiative",
      description: "Launched comprehensive digital transformation program for educational institutions",
      type: "milestone",
      date: "2024-01-15",
    },
    {
      id: 2,
      year: 2023,
      title: "Partnership with LNCT Group",
      description: "Established strategic partnership with LNCT Group of Colleges",
      type: "achievement",
      date: "2023-12-10",
    },
    {
      id: 3,
      year: 2023,
      title: "Mobile App Development Suite",
      description: "Developed comprehensive mobile application suite for educational management",
      type: "innovation",
      date: "2023-08-20",
    },
    {
      id: 4,
      year: 2022,
      title: "Regional Expansion",
      description: "Expanded operations to cover multiple states in Central India",
      type: "expansion",
      date: "2022-11-05",
    },
    {
      id: 5,
      year: 2022,
      title: "AI-Powered Learning Platform",
      description: "Launched AI-powered personalized learning platform for students",
      type: "innovation",
      date: "2022-06-15",
    },
    {
      id: 6,
      year: 2021,
      title: "Company Foundation",
      description: "AkshatGupta.space was founded with a vision to transform education through technology",
      type: "milestone",
      date: "2021-03-01",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedYear, setSelectedYear] = useState("all")
  const [newItem, setNewItem] = useState({
    year: new Date().getFullYear(),
    title: "",
    description: "",
    type: "milestone",
    date: "",
  })

  const itemTypes = [
    { id: "milestone", name: "Milestone", color: "#4ecdc4", icon: "🎯" },
    { id: "achievement", name: "Achievement", color: "#45b7d1", icon: "🏆" },
    { id: "expansion", name: "Expansion", color: "#96ceb4", icon: "🌍" },
    { id: "innovation", name: "Innovation", color: "#feca57", icon: "💡" },
  ]

  const getYears = () => {
    const years = [...new Set(timelineItems.map((item) => item.year))].sort((a, b) => b - a)
    return years
  }

  const getFilteredItems = () => {
    if (selectedYear === "all") {
      return timelineItems.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
    return timelineItems
      .filter((item) => item.year === Number.parseInt(selectedYear))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  const handleAddItem = (e) => {
    e.preventDefault()
    const item = {
      id: Date.now(),
      ...newItem,
      year: Number.parseInt(newItem.year),
    }
    setTimelineItems([...timelineItems, item])
    setNewItem({
      year: new Date().getFullYear(),
      title: "",
      description: "",
      type: "milestone",
      date: "",
    })
    setShowAddForm(false)
  }

  const deleteItem = (itemId) => {
    if (window.confirm("Are you sure you want to delete this timeline item?")) {
      setTimelineItems(timelineItems.filter((item) => item.id !== itemId))
    }
  }

  const getTypeInfo = (type) => {
    return itemTypes.find((t) => t.id === type) || itemTypes[0]
  }

  const getItemsByYear = () => {
    const itemsByYear = {}
    timelineItems.forEach((item) => {
      if (!itemsByYear[item.year]) {
        itemsByYear[item.year] = []
      }
      itemsByYear[item.year].push(item)
    })

    // Sort items within each year by date
    Object.keys(itemsByYear).forEach((year) => {
      itemsByYear[year].sort((a, b) => new Date(b.date) - new Date(a.date))
    })

    return itemsByYear
  }

  return (
    <div className="timeline-module">
      <div className="module-header">
        <h1>Timeline Management</h1>
        <p>Manage company milestones, achievements, and key events</p>
        <div className="timeline-actions">
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="year-filter">
            <option value="all">All Years</option>
            {getYears().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button className="add-timeline-btn" onClick={() => setShowAddForm(true)}>
            + Add Timeline Item
          </button>
        </div>
      </div>

      <div className="timeline-stats">
        {itemTypes.map((type) => {
          const count = timelineItems.filter((item) => item.type === type.id).length
          return (
            <div key={type.id} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: type.color }}>
                {type.icon}
              </div>
              <div className="stat-info">
                <span className="stat-number">{count}</span>
                <span className="stat-label">{type.name}s</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="timeline-container">
        {selectedYear === "all" ? (
          <div className="timeline-by-year">
            {Object.entries(getItemsByYear())
              .sort(([a], [b]) => Number.parseInt(b) - Number.parseInt(a))
              .map(([year, items]) => (
                <div key={year} className="year-section">
                  <div className="year-header">
                    <h2>{year}</h2>
                    <span className="year-count">{items.length} events</span>
                  </div>
                  <div className="timeline-items">
                    {items.map((item) => {
                      const typeInfo = getTypeInfo(item.type)
                      return (
                        <div key={item.id} className="timeline-item">
                          <div className="timeline-marker">
                            <div className="marker-dot" style={{ backgroundColor: typeInfo.color }}>
                              {typeInfo.icon}
                            </div>
                          </div>
                          <div className="timeline-content">
                            <div className="timeline-header">
                              <h3>{item.title}</h3>
                              <div className="timeline-meta">
                                <span className="type-badge" style={{ backgroundColor: typeInfo.color }}>
                                  {typeInfo.name}
                                </span>
                                <span className="timeline-date">{new Date(item.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <p className="timeline-description">{item.description}</p>
                            <div className="timeline-actions">
                              <button className="edit-btn">✏️ Edit</button>
                              <button className="delete-btn" onClick={() => deleteItem(item.id)}>
                                🗑️ Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="timeline-items">
            {getFilteredItems().map((item) => {
              const typeInfo = getTypeInfo(item.type)
              return (
                <div key={item.id} className="timeline-item">
                  <div className="timeline-marker">
                    <div className="marker-dot" style={{ backgroundColor: typeInfo.color }}>
                      {typeInfo.icon}
                    </div>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h3>{item.title}</h3>
                      <div className="timeline-meta">
                        <span className="type-badge" style={{ backgroundColor: typeInfo.color }}>
                          {typeInfo.name}
                        </span>
                        <span className="timeline-date">{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <p className="timeline-description">{item.description}</p>
                    <div className="timeline-actions">
                      <button className="edit-btn">✏️ Edit</button>
                      <button className="delete-btn" onClick={() => deleteItem(item.id)}>
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add Timeline Item</h2>
              <button className="close-btn" onClick={() => setShowAddForm(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleAddItem} className="timeline-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Year</label>
                  <input
                    type="number"
                    value={newItem.year}
                    onChange={(e) => setNewItem({ ...newItem, year: e.target.value })}
                    min="2020"
                    max="2030"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={newItem.date}
                    onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Type</label>
                <select
                  value={newItem.type}
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                  required
                >
                  {itemTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.icon} {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button type="submit">Add Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default TimelineModule
