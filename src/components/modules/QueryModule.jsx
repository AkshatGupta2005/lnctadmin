"use client"

import { useState } from "react"
import "../../styles/modules/feedback.css"

const QueryModule = ({ user }) => {
  // No activeTab state needed since we only have queries
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState(null)
  const [replyText, setReplyText] = useState("")

  // Sample data for queries
  const [queryItems, setQueryItems] = useState([
    {
      id: 1,
      name: "Deepak Verma",
      email: "deepak.verma@example.com",
      phone: "+91 98765 43210",
      date: "2024-05-18",
      message:
        "We are interested in your campus management solution but need to know if it can integrate with our existing ERP system. Can you provide more details about API availability and integration options?",
      status: "pending",
      replies: [],
    },
    {
      id: 2,
      name: "Ananya Reddy",
      email: "ananya.reddy@example.com",
      phone: "+91 87654 32109",
      date: "2024-05-16",
      message:
        "I'm representing a group of schools in Hyderabad. We're interested in implementing your solutions across multiple campuses. Do you offer any special pricing for educational institutions or bulk deployments?",
      status: "resolved",
      replies: [
        {
          id: 1,
          date: "2024-05-17",
          responder: "Admin User",
          message:
            "Thank you for your interest! Yes, we do offer special pricing for educational institutions and volume discounts for multi-campus deployments. I've sent detailed pricing information to your email. Please let me know if you have any questions.",
        },
      ],
    },
    {
      id: 3,
      name: "Rajesh Khanna",
      email: "rajesh.khanna@example.com",
      phone: "+91 76543 21098",
      date: "2024-05-14",
      message:
        "What kind of technical support do you provide after implementation? Do you have 24/7 support or only during business hours? Also, is there an additional cost for premium support?",
      status: "pending",
      replies: [],
    },
    {
      id: 4,
      name: "Meera Joshi",
      email: "meera.joshi@example.com",
      phone: "+91 65432 10987",
      date: "2024-05-12",
      message:
        "I'm interested in seeing a demo of your AI-powered learning platform. Can you arrange a demonstration for our faculty next week? We are particularly interested in the personalized learning features and analytics capabilities.",
      status: "resolved",
      replies: [
        {
          id: 1,
          date: "2024-05-13",
          responder: "Admin User",
          message:
            "We'd be happy to arrange a demo for your faculty. I've scheduled a demonstration for next Tuesday at 2 PM. You'll receive a calendar invite with the meeting details shortly. We'll cover all the personalized learning features and analytics capabilities you're interested in.",
        },
      ],
    },
    {
      id: 5,
      name: "Sanjay Patel",
      email: "sanjay.patel@example.com",
      phone: "+91 54321 09876",
      date: "2024-05-10",
      message:
        "We currently use a legacy system for student records. If we switch to your solution, do you provide data migration services? If so, what is the process and timeline for migrating existing student data?",
      status: "pending",
      replies: [],
    },
  ])

  const resolveQuery = (id) => {
    setQueryItems(queryItems.map((item) => (item.id === id ? { ...item, status: "resolved" } : item)))
  }

  const handleReplySubmit = (e) => {
    e.preventDefault()
    if (!replyText.trim()) return

    const newReply = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      responder: user.name,
      message: replyText,
    }

    setQueryItems(
      queryItems.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              replies: [...item.replies, newReply],
              status: "resolved",
            }
          : item,
      ),
    )

    setReplyText("")
    setSelectedItem(null)
  }

  const filteredQueries = queryItems.filter((item) => {
    // Filter by status
    if (filterStatus !== "all" && item.status !== filterStatus) return false

    // Filter by search query
    if (
      searchQuery &&
      !item.message.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false

    return true
  })

  const getQueryStats = () => {
    const total = queryItems.length
    const pending = queryItems.filter((item) => item.status === "pending").length
    const resolved = queryItems.filter((item) => item.status === "resolved").length

    return { total, pending, resolved }
  }

  const stats = getQueryStats()

  return (
    <div className="feedback-module">
      <div className="module-header">
        <div>
          <h1>Queries</h1>
          <p>Manage and respond to user queries</p>
        </div>

        <div className="query-count">
          {queryItems.filter((item) => item.status === "pending").length > 0 && (
            <div className="pending-badge">{queryItems.filter((item) => item.status === "pending").length} Pending</div>
          )}
        </div>
      </div>

      <div className="query-stats">
        <div className="stat-card total">
          <div className="stat-icon-wrapper">
            <div className="stat-icon">📊</div>
          </div>
          <div className="stat-info">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total Queries</span>
          </div>
          <div className="stat-trend">+12% this month</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon-wrapper">
            <div className="stat-icon">⏳</div>
          </div>
          <div className="stat-info">
            <span className="stat-number">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-trend">Needs attention</div>
        </div>
        <div className="stat-card resolved">
          <div className="stat-icon-wrapper">
            <div className="stat-icon">✅</div>
          </div>
          <div className="stat-info">
            <span className="stat-number">{stats.resolved}</span>
            <span className="stat-label">Resolved</span>
          </div>
          <div className="stat-trend">+8% this week</div>
        </div>
      </div>

      <div className="query-filters">
        <div className="filters-left">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search queries by name, subject, or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        <div className="filters-right">
          <div className="filter-dropdown">
            <label>Status:</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      <div className="query-list">
        {filteredQueries.length > 0 ? (
          filteredQueries.map((item) => (
            <div
              key={item.id}
              className={`query-card ${item.status === "pending" ? "pending" : ""}`}
              onClick={() => setSelectedItem(item)}
            >
              <div className="query-header">
                <div className="query-user">
                  <div className="user-avatar">{item.name.charAt(0).toUpperCase()}</div>
                  <div className="user-info">
                    <h3>{item.name}</h3>
                    <span className="user-contact">
                      {item.email} • {item.phone}
                    </span>
                  </div>
                </div>
                <div className="query-meta">
                  <div className="query-date">{new Date(item.date).toLocaleDateString()}</div>
                  <span className={`status-badge ${item.status}`}>{item.status}</span>
                </div>
              </div>
              <div className="query-message">
                {item.message.length > 150 ? `${item.message.substring(0, 150)}...` : item.message}
              </div>
              <div className="query-footer">
                <div className="replies-count">
                  {item.replies && item.replies.length > 0
                    ? `${item.replies.length} ${item.replies.length === 1 ? "reply" : "replies"}`
                    : "No replies yet"}
                </div>
                <button
                  className="reply-button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedItem(item)
                  }}
                >
                  Reply
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No queries found</h3>
            <p>Try changing your filters or search query</p>
          </div>
        )}
      </div>

      {selectedItem && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Query Details</h2>
              <button className="close-btn" onClick={() => setSelectedItem(null)}>
                ×
              </button>
            </div>
            <div className="query-details">
              <div className="detail-header">
                <div className="detail-user">
                  <div className="user-avatar large">{selectedItem.name.charAt(0).toUpperCase()}</div>
                  <div className="user-info">
                    <h3>{selectedItem.name}</h3>
                    <div className="user-contact-details">
                      <span className="contact-item">📧 {selectedItem.email}</span>
                      <span className="contact-item">📱 {selectedItem.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="detail-meta">
                  <div className="detail-date">
                    <strong>Date:</strong> {new Date(selectedItem.date).toLocaleDateString()}
                  </div>
                  <div className="detail-status">
                    <span className={`status-badge ${selectedItem.status}`}>{selectedItem.status}</span>
                  </div>
                </div>
              </div>

              <div className="detail-message">
                <strong>Message:</strong>
                <p>{selectedItem.message}</p>
              </div>

              {selectedItem.replies.length > 0 && (
                <div className="replies-section">
                  <h4>Replies</h4>
                  <div className="replies-list">
                    {selectedItem.replies.map((reply) => (
                      <div key={reply.id} className="reply-item">
                        <div className="reply-header">
                          <strong>{reply.responder}</strong>
                          <span>{new Date(reply.date).toLocaleDateString()}</span>
                        </div>
                        <p className="reply-text">{reply.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <form className="reply-form" onSubmit={handleReplySubmit}>
                <h4>Reply to this query</h4>
                <textarea
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows="4"
                  required
                ></textarea>
                <div className="form-actions">
                  <button
                    type="button"
                    className="action-btn"
                    onClick={() => {
                      if (selectedItem.status === "pending") {
                        resolveQuery(selectedItem.id)
                      }
                      setSelectedItem(null)
                    }}
                  >
                    {selectedItem.status === "pending" ? "Mark as Resolved" : "Close"}
                  </button>
                  <button type="submit" className="action-btn primary">
                    Send Reply
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QueryModule
