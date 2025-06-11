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
            <div className="stat-icon"><svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="40px" fill="#F3F3F3"><path d="M282.67-278h66.66v-276.67h-66.66V-278Zm164 0h66.66v-404h-66.66v404Zm164 0h66.66v-152h-66.66v152Zm-424 158q-27 0-46.84-19.83Q120-159.67 120-186.67v-586.66q0-27 19.83-46.84Q159.67-840 186.67-840h586.66q27 0 46.84 19.83Q840-800.33 840-773.33v586.66q0 27-19.83 46.84Q800.33-120 773.33-120H186.67Zm0-66.67h586.66v-586.66H186.67v586.66Zm0-586.66v586.66-586.66Z"/></svg></div>
          </div>
          <div className="stat-info">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total Queries</span>
          </div>
          <div className="stat-trend">+12% this month</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon-wrapper">
            <div className="stat-icon"><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="34px" fill="#F3F3F3"><path d="M480-521.33q70 0 119-49t49-119v-124H312v124q0 70 49 119t119 49ZM160-80v-66.67h85.33v-124.66q0-67.67 36.17-124.17t97.17-84.5q-61-28.67-97.17-85.17t-36.17-124.16v-124H160V-880h640v66.67h-85.33v124q0 67.66-36.17 124.16T581.33-480q61 28 97.17 84.5t36.17 124.17v124.66H800V-80H160Z"/></svg></div>
          </div>
          <div className="stat-info">
            <span className="stat-number">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-trend">Needs attention</div>
        </div>
        <div className="stat-card resolved">
          <div className="stat-icon-wrapper">
            <div className="stat-icon"><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e3e3e3"><path d="m435.33-250 228-228L618-523.33l-183 183L338.33-437l-45 45 142 142ZM226.67-80q-27 0-46.84-19.83Q160-119.67 160-146.67v-666.66q0-27 19.83-46.84Q199.67-880 226.67-880H574l226 226v507.33q0 27-19.83 46.84Q760.33-80 733.33-80H226.67Zm314-542.67v-190.66h-314v666.66h506.66v-476H540.67Zm-314-190.66v190.66-190.66 666.66-666.66Z"/></svg></div>
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
            <span className="search-icon"><svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0-1080 960 960" width="24px" fill="#434343"><path d="M792-120.67 532.67-380q-30 25.33-69.64 39.67Q423.39-326 378.67-326q-108.44 0-183.56-75.17Q120-476.33 120-583.33t75.17-182.17q75.16-75.17 182.5-75.17 107.33 0 182.16 75.17 74.84 75.17 74.84 182.27 0 43.23-14 82.9-14 39.66-40.67 73l260 258.66-48 48Zm-414-272q79.17 0 134.58-55.83Q568-504.33 568-583.33q0-79-55.42-134.84Q457.17-774 378-774q-79.72 0-135.53 55.83-55.8 55.84-55.8 134.84t55.8 134.83q55.81 55.83 135.53 55.83Z"/></svg></span>
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
            <div className="empty-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M320-320h480v-120H698q-21 37-58 58.5T560-360q-42 0-79-21.5T422-440H320v120Zm240-120q34 0 57-23.5t23-56.5h160v-280H320v280h160q0 33 23.5 56.5T560-440ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-240h480-480Z"/></svg></div>
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
                      <span className="contact-item"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 650" width="20px" fill="#000000"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg> {selectedItem.email}</span>
                      <span className="contact-item"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 660" width="20px" fill="#000000"><path d="M763-145q-121-9-229.5-59.5T339-341q-86-86-135.5-194T144-764q-2-21 12.29-36.5Q170.57-816 192-816h136q17 0 29.5 10.5T374-779l24 106q2 13-1.5 25T385-628l-97 98q20 38 46 73t57.97 65.98Q422-361 456-335.5q34 25.5 72 45.5l99-96q8-8 20-11.5t25-1.5l107 23q17 5 27 17.5t10 29.5v136q0 21.43-16 35.71Q784-143 763-145ZM255-600l70-70-17.16-74H218q5 38 14 73.5t23 70.5Zm344 344q35.1 14.24 71.55 22.62Q707-225 744-220v-90l-75-16-70 70ZM255-600Zm344 344Z"/></svg> {selectedItem.phone}</span>
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
